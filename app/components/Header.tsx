import Link from "next/link";
import { site } from "@/lib/content";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-sm font-semibold text-surface">
            P
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-semibold tracking-tight text-ink">
              {site.name}
            </span>
            <span className="text-xs text-muted">by {site.owner}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
          <a href="#features" className="transition-colors hover:text-ink">
            บริการ
          </a>
          <a href="#process" className="transition-colors hover:text-ink">
            กระบวนการ
          </a>
          <a href="#contact" className="transition-colors hover:text-ink">
            ติดต่อ
          </a>
        </nav>

        <a
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-border bg-surface-elevated px-4 py-2 text-sm font-medium text-ink transition hover:border-accent hover:text-accent"
        >
          GitHub
        </a>
      </div>
    </header>
  );
}
