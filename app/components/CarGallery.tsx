"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const FALLBACK =
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80";

interface CarGalleryProps {
  images: string[];
  alt: string;
}

function validImages(images: string[]): string[] {
  const filtered = images.filter((src) => src && src.trim().length > 0);
  return filtered.length > 0 ? filtered : [FALLBACK];
}

export function CarGallery({ images, alt }: CarGalleryProps) {
  const slides = validImages(images);
  const [index, setIndex] = useState(0);
  const touchStart = useRef<number | null>(null);

  const go = useCallback(
    (next: number) => {
      if (slides.length === 0) return;
      const clamped = ((next % slides.length) + slides.length) % slides.length;
      setIndex(clamped);
    },
    [slides.length]
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") go(index - 1);
      if (e.key === "ArrowRight") go(index + 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index]);

  const current = slides[index] ?? FALLBACK;

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
          if (Math.abs(diff) > 40) go(diff > 0 ? index - 1 : index + 1);
          touchStart.current = null;
        }}
      >
        <img
          key={index}
          src={current}
          alt={alt}
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = FALLBACK;
          }}
        />
        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              className="absolute left-3 top-1/2 z-20 -translate-y-1/2 border border-white/50 bg-black/50 px-3 py-2 text-lg text-white"
              aria-label="รูปก่อนหน้า"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              className="absolute right-3 top-1/2 z-20 -translate-y-1/2 border border-white/50 bg-black/50 px-3 py-2 text-lg text-white"
              aria-label="รูปถัดไป"
            >
              ›
            </button>
          </>
        )}
      </div>

      {slides.length > 1 && (
        <div
          className="mt-3 flex gap-2 overflow-x-auto px-4 pb-1 md:justify-center md:px-0"
          role="tablist"
          aria-label={`รูป ${alt}`}
        >
          {slides.map((src, i) => (
            <button
              key={`thumb-${i}`}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`รูปที่ ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`relative z-10 h-14 w-20 shrink-0 overflow-hidden border-2 md:h-16 md:w-24 ${
                i === index
                  ? "border-near-black"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={src}
                alt=""
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK;
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
