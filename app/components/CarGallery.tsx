"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface CarGalleryProps {
  images: string[];
  alt: string;
}

export function CarGallery({ images, alt }: CarGalleryProps) {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const touchStart = useRef<number | null>(null);
  const mounted = useRef(false);

  const go = useCallback(
    (dir: -1 | 1) => {
      const next = (index + dir + images.length) % images.length;
      if (next === index) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        setIndex(next);
        return;
      }

      setFading(true);
      window.setTimeout(() => {
        setIndex(next);
        setFading(false);
      }, 150);
    },
    [index, images.length]
  );

  useEffect(() => {
    mounted.current = true;
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  return (
    <div className="w-full">
      <div
        className="relative aspect-[16/10] w-full overflow-hidden bg-surface md:aspect-[21/9]"
        onTouchStart={(e) => {
          touchStart.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchStart.current === null) return;
          const diff = e.changedTouches[0].clientX - touchStart.current;
          if (Math.abs(diff) > 40) go(diff > 0 ? -1 : 1);
          touchStart.current = null;
        }}
      >
        <img
          src={images[index]}
          alt=""
          className={`h-full w-full object-cover ${
            mounted.current && fading ? "opacity-0" : "opacity-100"
          }`}
          style={{
            transition: mounted.current ? "opacity 150ms ease" : "none",
          }}
        />
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 hidden -translate-y-1/2 border border-white/40 bg-black/30 px-3 py-2 text-white backdrop-blur-sm md:block"
              aria-label="รูปก่อนหน้า"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 hidden -translate-y-1/2 border border-white/40 bg-black/30 px-3 py-2 text-white backdrop-blur-sm md:block"
              aria-label="รูปถัดไป"
            >
              ›
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div
          className="mt-3 flex gap-2 overflow-x-auto px-4 pb-1 md:justify-center md:px-0"
          role="tablist"
          aria-label={`รูป ${alt}`}
        >
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`รูปที่ ${i + 1}`}
              onClick={() => {
                if (i === index) return;
                const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                if (reduced) {
                  setIndex(i);
                  return;
                }
                setFading(true);
                window.setTimeout(() => {
                  setIndex(i);
                  setFading(false);
                }, 150);
              }}
              className={`relative h-14 w-20 shrink-0 overflow-hidden border-2 md:h-16 md:w-24 ${
                i === index ? "border-near-black" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
