import { site } from "@/lib/content";

export function SocialProof() {
  return (
    <section className="border-b border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-3xl border border-border bg-surface p-8 md:p-12">
          <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-accent">
                ผลงานและความเชี่ยวชาญ
              </p>
              <h2
                className="mt-3 font-display text-3xl tracking-tight text-ink md:text-4xl"
                style={{ fontFamily: "var(--font-instrument), serif" }}
              >
                สร้างด้วยเทคโนโลยีที่ทันสมัย
              </h2>
            </div>

            <blockquote className="border-l-4 border-accent pl-6">
              <p className="text-lg leading-relaxed text-ink md:text-xl">
                &ldquo;เว็บไซต์นี้สร้างด้วย Next.js 16, TypeScript และ Tailwind CSS
                — deploy อัตโนมัติบน GitHub Pages ทุกครั้งที่ push ไปที่ main&rdquo;
              </p>
              <footer className="mt-4 text-sm text-muted">
                — {site.owner},{" "}
                <a
                  href={site.github}
                  className="font-medium text-accent hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @{site.ownerHandle}
                </a>
              </footer>
            </blockquote>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {[
              "Next.js",
              "React 19",
              "TypeScript",
              "Tailwind CSS",
              "GitHub Actions",
              "GitHub Pages",
            ].map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border bg-background px-4 py-1.5 text-sm font-medium text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
