"use client";

import { useEffect, useRef, useState } from "react";

interface AnimateInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
}

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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
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
