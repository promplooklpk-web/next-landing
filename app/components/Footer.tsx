"use client";

import { shop } from "@/data/shop";
import { AppLink } from "./AppLink";

export function Footer() {
  return (
    <footer className="bg-near-black py-12 text-white md:py-16">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-8 px-6 md:flex-row md:justify-between">
        <p className="text-xs text-white/50">
          © {new Date().getFullYear()} {shop.name}
        </p>
        <nav className="flex flex-wrap justify-center gap-8">
          <AppLink
            href="#cars"
            className="text-xs text-white/60 transition hover:text-white"
          >
            รถในร้าน
          </AppLink>
          <AppLink
            href="#contact"
            className="text-xs text-white/60 transition hover:text-white"
          >
            ติดต่อ
          </AppLink>
          <a
            href={`tel:${shop.phoneTel}`}
            className="text-xs text-white/60 transition hover:text-white"
          >
            {shop.phone}
          </a>
          <AppLink
            href="/dashboard/"
            className="text-xs text-white/40 transition hover:text-white/70"
          >
            Dashboard
          </AppLink>
        </nav>
      </div>
    </footer>
  );
}
