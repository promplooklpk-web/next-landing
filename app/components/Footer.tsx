"use client";

import { shop } from "@/data/shop";
import { CATEGORY_PAGES, categoryPath } from "@/lib/category-pages";
import { AppLink } from "./AppLink";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-near-black py-12 text-white md:py-16">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-8 px-6 md:flex-row md:justify-between">
        <div className="flex items-center gap-2.5">
          <Logo size={26} className="text-accent" />
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} {shop.name}
          </p>
        </div>
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          <AppLink
            href="#cars"
            className="text-xs text-white/60 transition hover:text-accent"
          >
            รถในร้าน
          </AppLink>
          {CATEGORY_PAGES.map((category) => (
            <AppLink
              key={category.id}
              href={categoryPath(category)}
              className="text-xs text-white/60 transition hover:text-accent"
            >
              {category.h1}
            </AppLink>
          ))}
          <AppLink
            href="#contact"
            className="text-xs text-white/60 transition hover:text-accent"
          >
            ติดต่อ
          </AppLink>
          <a
            href={`tel:${shop.phoneTel}`}
            className="text-xs text-white/60 transition hover:text-accent"
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
