"use client";

import { useEffect, useState } from "react";
import { shop } from "@/data/shop";
import { handleHashClick, homeHash } from "@/lib/navigation";
import { SEO_PRIMARY } from "@/lib/site-seo";

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

  const btnBase =
    "relative z-10 inline-flex min-h-[44px] min-w-[200px] items-center justify-center px-8 py-3 text-[13px] font-medium tracking-wide transition-all duration-300";

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-end pb-24 pt-20 text-center text-white md:pb-32 ${
        ready ? "hero-content--visible" : ""
      }`}
    >
      <h1 className="hero-content__item max-w-3xl text-3xl font-medium tracking-tight md:text-5xl">
        {SEO_PRIMARY}
      </h1>
      <p className="hero-content__item mt-3 text-lg font-medium text-white md:text-xl">
        {shop.name}
      </p>
      <p className="hero-content__item mt-3 max-w-lg text-sm font-normal text-white/90 md:text-base">
        {shop.tagline} · {shop.serviceArea}
      </p>
      <div className="hero-content__item pointer-events-auto mt-8 flex w-full max-w-md flex-col gap-3 px-6 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4 sm:px-0">
        <a
          href={homeHash("cars")}
          onClick={(e) => handleHashClick(e, "#cars")}
          className={`${btnBase} bg-white text-near-black shadow-lg shadow-black/25 hover:bg-white/95 active:bg-white/90`}
        >
          ดูรถในร้าน
        </a>
        <a
          href={homeHash("contact")}
          onClick={(e) => handleHashClick(e, "#contact")}
          className={`${btnBase} border-2 border-white bg-black/20 text-white backdrop-blur-sm hover:bg-white/15 active:bg-white/25`}
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
