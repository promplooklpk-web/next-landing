import { shop } from "@/data/shop";
import { AppLink } from "../AppLink";
import { Logo } from "../Logo";

interface DashboardShellProps {
  title: string;
  children: React.ReactNode;
  /** Sticky top-bar action (e.g. + เพิ่มรถ) */
  action?: React.ReactNode;
}

export function DashboardShell({ title, children, action }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 md:px-6 md:py-4">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <AppLink href="/" className="shrink-0" aria-label={shop.name}>
              <Logo size={28} className="text-accent" />
            </AppLink>
            <div className="min-w-0">
              <p className="hidden text-xs text-muted sm:block">
                โหมด mock — ยังไม่มีล็อกอิน
              </p>
              <h1 className="truncate text-base font-medium md:text-lg">{title}</h1>
            </div>
          </div>
          {action}
          <div className="hidden shrink-0 gap-4 text-sm sm:flex">
            <AppLink href="/" className="text-muted hover:text-accent">
              ← กลับเว็บไซต์
            </AppLink>
            <AppLink href="/dashboard/" className="text-muted hover:text-accent">
              แดชบอร์ด
            </AppLink>
          </div>
        </div>
        <div className="flex gap-4 border-t border-border px-4 py-2 text-xs sm:hidden">
          <AppLink href="/" className="text-muted hover:text-accent">
            ← กลับเว็บไซต์
          </AppLink>
          <AppLink href="/dashboard/" className="text-muted hover:text-accent">
            แดชบอร์ด
          </AppLink>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6 md:px-6 md:py-8">
        <p className="mb-4 text-xs text-muted md:mb-6">
          {shop.name} · ข้อมูลจาก Supabase · รถใหม่จะแสดงหน้า SEO หลัง deploy
          GitHub Pages อีกครั้ง
        </p>
        {children}
      </main>
    </div>
  );
}
