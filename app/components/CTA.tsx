import { site } from "@/lib/content";

export function CTA() {
  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl bg-accent px-8 py-16 text-center text-white md:px-16 md:py-20">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-white/10" />

          <div className="relative">
            <h2
              className="font-display text-4xl tracking-tight md:text-5xl"
              style={{ fontFamily: "var(--font-instrument), serif" }}
            >
              พร้อมสร้างเว็บของคุณแล้วหรือยัง?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">
              Ready to build your next landing page?
            </p>
            <p className="mx-auto mt-2 max-w-lg text-sm text-white/70">
              ติดต่อผ่าน GitHub เพื่อพูดคุยเกี่ยวกับโปรเจกต์ของคุณ
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-base font-semibold text-accent transition hover:bg-white/90"
              >
                ติดต่อบน GitHub
              </a>
              <a
                href={site.url}
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-8 py-3.5 text-base font-medium text-white transition hover:bg-white/10"
              >
                ดูเว็บไซต์นี้สด
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
