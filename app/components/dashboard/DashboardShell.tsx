import { shop } from "@/data/shop";
import { AppLink } from "../AppLink";

interface DashboardShellProps {
  title: string;
  children: React.ReactNode;
}

export function DashboardShell({ title, children }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs text-muted">โหมด mock — ยังไม่มีล็อกอิน</p>
            <h1 className="text-lg font-medium">{title}</h1>
          </div>
          <div className="flex gap-4 text-sm">
            <AppLink href="/" className="text-muted hover:text-foreground">
              ← กลับเว็บไซต์
            </AppLink>
            <AppLink href="/dashboard/" className="text-muted hover:text-foreground">
              แดชบอร์ด
            </AppLink>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">
        <p className="mb-6 text-xs text-muted">
          {shop.name} · ข้อมูลเก็บใน localStorage ของเบราว์เซอร์
        </p>
        {children}
      </main>
    </div>
  );
}
