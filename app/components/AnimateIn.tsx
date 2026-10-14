"use client";

import { useEffect, useRef, useState } from "react";

interface AnimateInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
}

/** If IntersectionObserver never fires, reveal content so it cannot stay opacity:0. */
const FAILSAFE_MS = 2500;

export function AnimateIn({
  children,
  className = "",
  delay = 0,
  stagger = false,
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(true);
      return;
    }

    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      setVisible(true);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "80px 0px" }
    );

    observer.observe(el);

    // Already in view on mount (common for above-the-fold / tall panels)
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < vh && rect.bottom > 0) {
      reveal();
      observer.disconnect();
    }

    const failsafe = window.setTimeout(reveal, FAILSAFE_MS);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  const visibleClass = stagger
    ? visible
      ? "stagger-container--visible"
      : ""
    : visible
      ? "animate-in--visible"
      : "";

  const baseClass = stagger ? "stagger-container" : "animate-in";

  return (
    <div
      ref={ref}
      className={`${baseClass} ${visibleClass} pointer-events-none ${className}`}
      style={{ transitionDelay: stagger ? undefined : `${delay}ms` }}
    >
      <div className="pointer-events-auto">{children}</div>
    </div>
  );
}
