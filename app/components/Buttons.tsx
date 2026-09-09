import { AppLink } from "./AppLink";

const base =
  "relative z-10 inline-flex min-h-[44px] min-w-[200px] items-center justify-center px-8 py-3 text-[13px] font-medium tracking-wide transition-all duration-300";

export function PrimaryButton({
  href,
  children,
  external,
  overlay,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  overlay?: boolean;
}) {
  const className = overlay
    ? `${base} bg-white text-near-black shadow-lg shadow-black/25 hover:bg-white/95 active:bg-white/90`
    : `${base} bg-near-black text-white hover:bg-near-black-hover active:bg-near-black`;

  return (
    <AppLink href={href} className={className} external={external}>
      {children}
    </AppLink>
  );
}

export function SecondaryButton({
  href,
  children,
  external,
  dark,
  overlay,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  dark?: boolean;
  overlay?: boolean;
}) {
  const className = overlay
    ? `${base} border-2 border-white bg-black/20 text-white backdrop-blur-sm hover:bg-white/15 active:bg-white/25`
    : dark
      ? `${base} border-2 border-white/80 bg-transparent text-white hover:bg-white/10 active:bg-white/20`
      : `${base} border border-border-dark bg-transparent text-foreground hover:bg-surface active:bg-surface`;

  return (
    <AppLink href={href} className={className} external={external}>
      {children}
    </AppLink>
  );
}
