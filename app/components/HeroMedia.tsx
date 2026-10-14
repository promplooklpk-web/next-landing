"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CHARSET = " .:-=+*#%@";
const SCRAMBLE_MS = 1400;
const FADE_MS = 700;
const TOTAL_MS = SCRAMBLE_MS + FADE_MS;
/** Skip dense ASCII work on narrow viewports for mobile performance. */
const MOBILE_MAX_WIDTH = 768;
const DESKTOP_COLS = 120;
const TABLET_COLS = 80;

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

function sampleAscii(img: HTMLImageElement, cols: number): string[] {
  const aspect = img.naturalHeight / img.naturalWidth;
  const rows = Math.max(12, Math.floor(cols * aspect * 0.52));
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

export function HeroMedia({ src, alt }: HeroMediaProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const [phase, setPhase] = useState<"pending" | "ascii" | "photo">("pending");
  const [asciiOpacity, setAsciiOpacity] = useState(1);
  const rafRef = useRef(0);

  const finishToPhoto = useCallback(() => {
    setAsciiOpacity(0);
    window.setTimeout(() => setPhase("photo"), FADE_MS);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion() || isNarrowViewport()) {
      setPhase("photo");
      return;
    }

    let cancelled = false;
    const img = new Image();
    img.decoding = "async";
    let start = 0;

    const failSafe = window.setTimeout(() => {
      if (!cancelled) setPhase("photo");
    }, 3500);

    img.onload = () => {
      if (cancelled) return;
      window.clearTimeout(failSafe);
      const cols =
        window.innerWidth < 1024
          ? Math.min(TABLET_COLS, Math.floor(window.innerWidth / 8))
          : Math.min(DESKTOP_COLS, Math.floor(window.innerWidth / 9));
      const target = sampleAscii(img, Math.max(48, cols));
      if (target.length === 0) {
        setPhase("photo");
        return;
      }
      setPhase("ascii");
      start = performance.now();

      const tick = (now: number) => {
        if (cancelled) return;
        const elapsed = now - start;
        const scrambleProgress = Math.min(1, elapsed / SCRAMBLE_MS);

        if (preRef.current) {
          preRef.current.textContent = scrambleFrame(
            target,
            scrambleProgress
          ).join("\n");
        }

        if (elapsed < TOTAL_MS) {
          if (elapsed >= SCRAMBLE_MS) {
            setAsciiOpacity(1 - (elapsed - SCRAMBLE_MS) / FADE_MS);
          }
          rafRef.current = requestAnimationFrame(tick);
        } else {
          finishToPhoto();
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    };

    img.onerror = () => {
      window.clearTimeout(failSafe);
      if (!cancelled) setPhase("photo");
    };

    img.src = src;

    return () => {
      cancelled = true;
      window.clearTimeout(failSafe);
      cancelAnimationFrame(rafRef.current);
    };
  }, [src, finishToPhoto]);

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
        <div
          className="hero-ascii absolute inset-0 z-[1] overflow-hidden bg-background"
          style={{ opacity: asciiOpacity }}
          aria-hidden
        >
          <pre
            ref={preRef}
            className="hero-ascii__pre absolute inset-0 m-0 overflow-hidden whitespace-pre p-0 font-mono leading-[1.05] tracking-tight text-accent"
          />
        </div>
      ) : null}
      {phase === "pending" ? (
        <div className="absolute inset-0 z-[1] bg-background" aria-hidden />
      ) : null}
    </div>
  );
}
