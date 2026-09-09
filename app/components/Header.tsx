"use client";

import { useEffect, useState } from "react";
import { shop } from "@/data/shop";
import { appPath, handleHashClick, homeHash, scrollToSection } from "@/lib/navigation";
import { AppLink } from "./AppLink";
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

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      requestAnimationFrame(() => scrollToSection(hash));
    }
  }, []);

  function navClick(hash: string) {
    setOpen(false);
    scrollToSection(hash.replace("#", ""));
  }

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-black/5 bg-white/90 backdrop-blur-md shadow-sm"
          : "border-b border-transparent bg-white/60 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-12 max-w-[1400px] items-center justify-between px-6 md:h-14">
        <AppLink href="/" className="relative z-10 flex items-center gap-2">
          <Logo size={28} />
          <span className="text-[13px] font-medium tracking-tight text-foreground md:text-sm">
            {shop.name}
          </span>
        </AppLink>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={homeHash(link.href.slice(1))}
              className="text-[13px] font-medium text-foreground/80 transition hover:text-foreground"
              onClick={(e) => handleHashClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "ปิดเมนู" : "เปิดเมนู"}
          aria-expanded={open}
        >
          <span className="text-lg text-foreground">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/30 md:hidden"
            aria-label="ปิดเมนู"
            onClick={() => setOpen(false)}
          />
          <nav className="relative z-50 border-t border-border bg-white px-6 py-4 shadow-lg md:hidden">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={homeHash(link.href.slice(1))}
                  className="py-2 text-base font-medium text-foreground"
                  onClick={(e) => {
                    handleHashClick(e, link.href);
                    navClick(link.href);
                  }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={appPath("/dashboard/")}
                className="py-2 text-sm text-muted"
                onClick={() => setOpen(false)}
              >
                Dashboard
              </a>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
