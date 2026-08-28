import { highlights, process } from "@/lib/content";

export function Highlights() {
  return (
    <>
      <section className="border-b border-border bg-ink py-16 text-surface md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {highlights.map((item) => (
              <div key={item.value} className="text-center md:text-left">
                <p
                  className="font-display text-3xl text-surface md:text-4xl"
                  style={{ fontFamily: "var(--font-instrument), serif" }}
                >
                  {item.value}
                </p>
                <p className="mt-2 font-medium">{item.label}</p>
                <p className="text-sm text-surface/60">{item.labelEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="border-b border-border py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-sage">
              กระบวนการทำงาน
            </p>
            <h2
              className="mt-3 font-display text-4xl tracking-tight text-ink md:text-5xl"
              style={{ fontFamily: "var(--font-instrument), serif" }}
            >
              จากไอเดียสู่เว็บไซต์จริง
            </h2>
            <p className="mt-4 text-lg text-muted">
              From idea to live site — in three clear steps.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {process.map((step) => (
              <div key={step.step} className="relative">
                <span className="text-6xl font-bold text-border">
                  {step.step}
                </span>
                <h3 className="mt-2 text-xl font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="text-sm font-medium text-sage">{step.titleEn}</p>
                <p className="mt-4 leading-relaxed text-muted">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
