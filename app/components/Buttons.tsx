import Link from "next/link";

const base =
  "inline-flex min-w-[200px] items-center justify-center px-8 py-2.5 text-[13px] font-medium tracking-wide transition-colors duration-200";

export function PrimaryButton({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const className = `${base} bg-near-black text-white hover:bg-near-black-hover`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function SecondaryButton({
  href,
  children,
  external,
  dark,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  dark?: boolean;
}) {
  const className = dark
    ? `${base} border border-white/60 bg-transparent text-white hover:bg-white/10`
    : `${base} border border-border-dark bg-transparent text-foreground hover:bg-surface`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
