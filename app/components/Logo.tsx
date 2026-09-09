import { assetPath } from "@/lib/site";

interface LogoProps {
  size?: number;
  className?: string;
}

export function Logo({ size = 36, className = "" }: LogoProps) {
  return (
    <img
      src={assetPath("/logo.png")}
      alt=""
      width={size}
      height={size}
      className={`shrink-0 object-contain ${className}`}
    />
  );
}
