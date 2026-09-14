import { AppLink } from "./AppLink";

const base =
  "relative z-10 inline-flex min-h-[44px] min-w-[200px] items-center justify-center rounded-md px-8 py-3 text-[13px] font-medium tracking-wide transition-all duration-300";

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
    ? `${base} bg-accent text-accent-foreground shadow-lg shadow-black/40 hover:bg-accent-hover active:brightness-95`
    : `${base} bg-accent text-accent-foreground hover:bg-accent-hover active:brightness-95`;

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
    ? `${base} border-2 border-white/90 bg-black/25 text-white backdrop-blur-sm hover:bg-white/10 active:bg-white/20`
    : dark
      ? `${base} border-2 border-white/80 bg-transparent text-white hover:bg-white/10 active:bg-white/20`
      : `${base} border border-border-dark bg-transparent text-foreground hover:border-accent/50 hover:bg-surface active:bg-surface-raised`;

  return (
    <AppLink href={href} className={className} external={external}>
      {children}
    </AppLink>
  );
}
