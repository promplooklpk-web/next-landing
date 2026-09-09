import { shop } from "@/data/shop";
import { AppLink } from "../AppLink";

interface DashboardShellProps {
  title: string;
  children: React.ReactNode;
  /** Sticky top-bar action (e.g. + เพิ่มรถ) */
  action?: React.ReactNode;
}

export function DashboardShell({ title, children, action }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-surface">
      <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 md:px-6 md:py-4">
          <div className="min-w-0 flex-1">
            <p className="hidden text-xs text-muted sm:block">
              โหมด mock — ยังไม่มีล็อกอิน
            </p>
            <h1 className="truncate text-base font-medium md:text-lg">{title}</h1>
          </div>
          {action}
          <div className="hidden shrink-0 gap-4 text-sm sm:flex">
            <AppLink href="/" className="text-muted hover:text-foreground">
              ← กลับเว็บไซต์
            </AppLink>
            <AppLink href="/dashboard/" className="text-muted hover:text-foreground">
              แดชบอร์ด
            </AppLink>
          </div>
        </div>
        <div className="flex gap-4 border-t border-border px-4 py-2 text-xs sm:hidden">
          <AppLink href="/" className="text-muted hover:text-foreground">
            ← กลับเว็บไซต์
          </AppLink>
          <AppLink href="/dashboard/" className="text-muted hover:text-foreground">
            แดชบอร์ด
          </AppLink>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6 md:px-6 md:py-8">
        <p className="mb-4 text-xs text-muted md:mb-6">
          {shop.name} · ข้อมูลจาก Supabase
        </p>
        {children}
      </main>
    </div>
  );
}
