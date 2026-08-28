import { site } from "@/lib/content";

export function Hero() {
  return (
    <section className="hero-glow relative overflow-hidden border-b border-border">
      <div className="grid-pattern absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="max-w-3xl">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated/80 px-4 py-1.5 text-sm text-muted">
            <span className="h-2 w-2 rounded-full bg-sage" />
            Next.js landing · GitHub Pages ready
          </p>

          <h1
            className="font-display text-5xl leading-[1.1] tracking-tight text-ink md:text-7xl"
            style={{ fontFamily: "var(--font-instrument), serif" }}
          >
            {site.tagline}
          </h1>

          <p className="mt-4 text-lg text-muted md:text-xl">
            {site.taglineEn}
          </p>

          <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            สร้างหน้าเว็บที่ดูเป็นมืออาชีพ โหลดเร็ว และ deploy ได้ทันที
            โดย{" "}
            <span className="font-medium text-ink">{site.owner}</span>{" "}
            — นักพัฒนาที่เชื่อว่าเว็บที่ดีต้องเรียบง่าย ชัดเจน และใช้งานได้จริง
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3.5 text-base font-semibold text-white transition hover:bg-accent-dark"
            >
              เริ่มต้นโปรเจกต์
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface-elevated px-8 py-3.5 text-base font-medium text-ink transition hover:border-ink"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              @{site.ownerHandle}
            </a>
          </div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Static export", detail: "ไม่ต้องมีเซิร์ฟเวอร์" },
            { label: "TypeScript", detail: "โค้ดปลอดภัย ดูแลง่าย" },
            { label: "Tailwind CSS", detail: "ดีไซน์ยืดหยุ่น" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-border bg-surface-elevated/70 px-5 py-4 backdrop-blur-sm"
            >
              <p className="font-semibold text-ink">{item.label}</p>
              <p className="mt-1 text-sm text-muted">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
