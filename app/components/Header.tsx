"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { shop } from "@/data/shop";
import { Logo } from "./Logo";

const navLinks = [
  { href: "#cars", label: "รถในร้าน" },
  { href: "#contact", label: "ติดต่อ" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-black/5 bg-white/90 backdrop-blur-md shadow-sm"
          : "border-b border-transparent bg-white/60 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-12 max-w-[1400px] items-center justify-between px-6 md:h-14">
        <Link href="/" className="flex items-center gap-2">
          <Logo size={28} />
          <span className="text-[13px] font-medium tracking-tight text-foreground md:text-sm">
            {shop.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium text-foreground/80 transition hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="เปิดเมนู"
        >
          <span className="text-sm text-foreground">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
