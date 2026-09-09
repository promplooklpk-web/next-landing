"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { shop } from "@/data/shop";

export function HeroContent() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setReady(true);
      return;
    }
    const t = window.setTimeout(() => setReady(true), 120);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-end pb-24 pt-20 text-center text-white md:pb-32 ${
        ready ? "hero-content--visible" : ""
      }`}
    >
      <h1 className="hero-content__item max-w-3xl text-4xl font-medium tracking-tight md:text-6xl">
        {shop.name}
      </h1>
      <p className="hero-content__item mt-4 max-w-lg text-sm font-normal text-white/90 md:text-base">
        {shop.tagline}
      </p>
      <div className="hero-content__item mt-8 flex w-full max-w-md flex-col gap-3 px-6 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4 sm:px-0">
        <Link
          href="#cars"
          className="inline-flex min-h-[44px] min-w-[200px] items-center justify-center bg-white px-8 py-3 text-[13px] font-medium tracking-wide text-near-black shadow-lg shadow-black/25 transition-all duration-300 hover:bg-white/95 active:bg-white/90"
        >
          ดูรถในร้าน
        </Link>
        <a
          href="#contact"
          className="inline-flex min-h-[44px] min-w-[200px] items-center justify-center border-2 border-white bg-black/20 px-8 py-3 text-[13px] font-medium tracking-wide text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/15 active:bg-white/25"
        >
          ติดต่อเรา
        </a>
      </div>
      <p className="hero-content__item mt-6 text-xs text-white/70">
        {shop.location.city} · {shop.hours}
      </p>
    </div>
  );
}
