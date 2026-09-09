"use client";

import Link from "next/link";
import { useState } from "react";
import { shop } from "@/data/shop";
import { Logo } from "./Logo";

const navLinks = [
  { href: "/", label: "หน้าแรก" },
  { href: "#cars", label: "รถในร้าน" },
  { href: "#contact", label: "ติดต่อเรา" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo size={40} />
          <div>
            <p className="text-sm font-bold leading-tight text-navy md:text-base">
              {shop.name}
            </p>
            <p className="hidden text-xs text-muted sm:block">ลำปาง · รถมือสอง</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground transition hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={`tel:${shop.phoneTel}`}
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-dark"
          >
            โทร {shop.phone}
          </a>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="เปิดเมนู"
        >
          <span className="text-lg">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-surface px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-surface-muted"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${shop.phoneTel}`}
              className="rounded-lg bg-accent px-3 py-2 text-center text-sm font-semibold text-white"
            >
              โทร {shop.phone}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
