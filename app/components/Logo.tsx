"use client";

import { assetPath } from "@/lib/site";

interface LogoProps {
  size?: number;
  className?: string;
}

export function Logo({ size = 28, className = "" }: LogoProps) {
  const src = assetPath("/logo.png");

  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      className={`shrink-0 object-contain ${className}`}
      decoding="async"
    />
  );
}
