import { trustPoints } from "@/data/shop";

export function TrustSection() {
  return (
    <section className="bg-surface-muted py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-center text-2xl font-bold text-navy md:text-3xl">
          ทำไมต้องเลือกเรา
        </h2>
        <p className="mt-2 text-center text-muted">
          บริการด้วยใจ ซื่อสัตย์ โปร่งใส
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((point) => (
            <div
              key={point.title}
              className="rounded-2xl border border-border bg-surface p-6 text-center"
            >
              <span className="flex mx-auto h-12 w-12 items-center justify-center rounded-full bg-navy/10 text-xl font-bold text-navy">
                {point.icon}
              </span>
              <h3 className="mt-4 font-bold">{point.title}</h3>
              <p className="mt-2 text-sm text-muted">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
