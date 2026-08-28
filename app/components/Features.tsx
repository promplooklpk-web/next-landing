import { features } from "@/lib/content";

export function Features() {
  return (
    <section id="features" className="border-b border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            ทำไมต้องเลือกเรา
          </p>
          <h2
            className="mt-3 font-display text-4xl tracking-tight text-ink md:text-5xl"
            style={{ fontFamily: "var(--font-instrument), serif" }}
          >
            เว็บที่ออกแบบมาเพื่อคุณ
          </h2>
          <p className="mt-4 text-lg text-muted">
            Designed for you — not for a template marketplace.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group rounded-3xl border border-border bg-surface p-8 transition hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
            >
              <span className="text-3xl text-accent">{feature.icon}</span>
              <h3 className="mt-6 text-xl font-semibold text-ink">
                {feature.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-sage">
                {feature.titleEn}
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                {feature.description}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted/80">
                {feature.descriptionEn}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
