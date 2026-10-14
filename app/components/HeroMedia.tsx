"use client";

import { useEffect, useRef, useState } from "react";

const CHARSET = " .:-=+*#%@";
const SCRAMBLE_MS = 1600;
const FADE_MS = 800;
const TOTAL_MS = SCRAMBLE_MS + FADE_MS;
/** Skip dense ASCII work on narrow viewports for mobile performance. */
const MOBILE_MAX_WIDTH = 768;

interface HeroMediaProps {
  src: string;
  alt: string;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isNarrowViewport(): boolean {
  return window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH - 1}px)`).matches;
}

function sampleAscii(img: HTMLImageElement, cols: number, rows: number): string[] {
  const canvas = document.createElement("canvas");
  canvas.width = cols;
  canvas.height = rows;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return [];

  ctx.drawImage(img, 0, 0, cols, rows);
  const { data } = ctx.getImageData(0, 0, cols, rows);
  const lines: string[] = [];

  for (let y = 0; y < rows; y++) {
    let line = "";
    for (let x = 0; x < cols; x++) {
      const i = (y * cols + x) * 4;
      const brightness = (data[i]! + data[i + 1]! + data[i + 2]!) / 3;
      const idx = Math.min(
        CHARSET.length - 1,
        Math.floor((brightness / 255) * (CHARSET.length - 1))
      );
      line += CHARSET[idx];
    }
    lines.push(line);
  }
  return lines;
}

function scrambleFrame(target: string[], progress: number): string[] {
  const lockRatio = Math.min(1, Math.max(0, progress));
  return target.map((line) =>
    line
      .split("")
      .map((ch, i) => {
        if (ch === " ") return " ";
        const cellProgress =
          lockRatio * 1.15 - (i / Math.max(line.length, 1)) * 0.15;
        if (cellProgress >= 1) return ch;
        if (Math.random() > cellProgress) {
          return CHARSET[1 + Math.floor(Math.random() * (CHARSET.length - 1))]!;
        }
        return ch;
      })
      .join("")
  );
}

function paintAscii(
  canvas: HTMLCanvasElement,
  lines: string[],
  accent: string,
  background: string
) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  if (w === 0 || h === 0 || lines.length === 0) return;

  canvas.width = Math.floor(w * dpr);
  canvas.height = Math.floor(h * dpr);
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, w, h);

  const rows = lines.length;
  const cols = lines[0]!.length;
  const cellW = w / cols;
  const cellH = h / rows;
  const fontSize = Math.max(4, Math.min(cellW * 1.65, cellH * 0.95));

  ctx.fillStyle = accent;
  ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (let y = 0; y < rows; y++) {
    const line = lines[y]!;
    for (let x = 0; x < cols; x++) {
      const ch = line[x]!;
      if (ch === " ") continue;
      ctx.fillText(ch, (x + 0.5) * cellW, (y + 0.5) * cellH);
    }
  }
}

export function HeroMedia({ src, alt }: HeroMediaProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetRef = useRef<string[]>([]);
  const rafRef = useRef(0);
  const [phase, setPhase] = useState<"pending" | "ascii" | "photo">("pending");
  const [asciiOpacity, setAsciiOpacity] = useState(1);

  useEffect(() => {
    if (prefersReducedMotion() || isNarrowViewport()) {
      setPhase("photo");
      return;
    }

    let cancelled = false;
    const img = new Image();
    img.decoding = "async";

    const failSafe = window.setTimeout(() => {
      if (!cancelled) setPhase("photo");
    }, 3500);

    img.onload = () => {
      if (cancelled) return;
      window.clearTimeout(failSafe);

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      // ~7–9px cells — dense enough to read as the shopfront, light on CPU
      const cols = Math.max(64, Math.min(140, Math.floor(vw / 8)));
      const rows = Math.max(36, Math.min(80, Math.floor(vh / 10)));
      const target = sampleAscii(img, cols, rows);
      if (target.length === 0) {
        setPhase("photo");
        return;
      }
      targetRef.current = target;
      setAsciiOpacity(1);
      setPhase("ascii");
    };

    img.onerror = () => {
      window.clearTimeout(failSafe);
      if (!cancelled) setPhase("photo");
    };

    img.src = src;

    return () => {
      cancelled = true;
      window.clearTimeout(failSafe);
    };
  }, [src]);

  useEffect(() => {
    if (phase !== "ascii") return;

    const target = targetRef.current;
    const canvas = canvasRef.current;
    if (target.length === 0 || !canvas) {
      setPhase("photo");
      return;
    }

    let cancelled = false;
    const start = performance.now();
    const styles = getComputedStyle(document.documentElement);
    const accent = styles.getPropertyValue("--accent").trim() || "#2dd4bf";
    const background =
      styles.getPropertyValue("--background").trim() || "#0b0d10";

    paintAscii(canvas, scrambleFrame(target, 0), accent, background);

    const tick = (now: number) => {
      if (cancelled) return;
      const elapsed = now - start;
      const scrambleProgress = Math.min(1, elapsed / SCRAMBLE_MS);

      paintAscii(
        canvas,
        scrambleFrame(target, scrambleProgress),
        accent,
        background
      );

      if (elapsed < TOTAL_MS) {
        if (elapsed >= SCRAMBLE_MS) {
          setAsciiOpacity(1 - (elapsed - SCRAMBLE_MS) / FADE_MS);
        }
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setAsciiOpacity(0);
        window.setTimeout(() => {
          if (!cancelled) setPhase("photo");
        }, 40);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
    };
  }, [phase]);

  const showAscii = phase === "ascii";

  return (
    <div className="absolute inset-0">
      {/* Real photo stays in HTML for SEO / LCP; overlay covers it during intro */}
      <img
        src={src}
        alt={alt}
        className="hero-ken-burns absolute inset-0 h-full w-full object-cover object-center"
        fetchPriority="high"
        decoding="async"
      />
      {showAscii ? (
        <canvas
          ref={canvasRef}
          className="hero-ascii absolute inset-0 z-[1] h-full w-full"
          style={{ opacity: asciiOpacity }}
          aria-hidden
        />
      ) : null}
      {phase === "pending" ? (
        <div className="absolute inset-0 z-[1] bg-background" aria-hidden />
      ) : null}
    </div>
  );
}
