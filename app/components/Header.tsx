"use client";

import { useEffect, useState } from "react";
import { shop } from "@/data/shop";
import { handleHashClick, homeHash, scrollToSection } from "@/lib/navigation";
import { AppLink } from "./AppLink";
import { Logo } from "./Logo";

const navLinks = [
  { href: "#cars", label: "รถในร้าน" },
  { href: "#contact", label: "ติดต่อ" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      requestAnimationFrame(() => scrollToSection(hash));
    }
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border/80 bg-background/92 backdrop-blur-md shadow-sm shadow-black/50"
          : "border-b border-transparent bg-background/75 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-12 max-w-[1400px] items-center justify-between gap-3 px-4 sm:px-6 md:h-14">
        <AppLink
          href="/"
          className="relative z-10 flex min-w-0 flex-1 items-center gap-2 sm:gap-2.5"
        >
          <Logo size={30} className="shrink-0 text-accent" />
          <span className="truncate text-[12px] font-medium tracking-tight text-foreground sm:text-[13px] md:text-sm">
            {shop.name}
          </span>
        </AppLink>

        <nav
          className="flex shrink-0 items-center gap-4 sm:gap-6 md:gap-8"
          aria-label="เมนูหลัก"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={homeHash(link.href.slice(1))}
              className="whitespace-nowrap text-[12px] font-medium text-foreground/75 transition hover:text-accent sm:text-[13px]"
              onClick={(e) => handleHashClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
