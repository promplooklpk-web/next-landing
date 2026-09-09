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
    const t = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(t);
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
      <p className="hero-content__item mt-4 max-w-lg text-sm font-normal text-white/85 md:text-base">
        {shop.tagline}
      </p>
      <div className="hero-content__item mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
        <Link
          href="#cars"
          className="inline-flex min-w-[200px] items-center justify-center bg-white px-8 py-2.5 text-[13px] font-medium tracking-wide text-near-black transition hover:bg-white/90"
        >
          ดูรถในร้าน
        </Link>
        <a
          href="#contact"
          className="inline-flex min-w-[200px] items-center justify-center border border-white/70 bg-transparent px-8 py-2.5 text-[13px] font-medium tracking-wide text-white transition hover:bg-white/10"
        >
          ติดต่อเรา
        </a>
      </div>
      <p className="hero-content__item mt-6 text-xs text-white/60">
        {shop.location.city} · {shop.hours}
      </p>
    </div>
  );
}
