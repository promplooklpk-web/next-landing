import { trustPoints } from "@/data/shop";

export function TrustSection() {
  return (
    <section id="about" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-[680px] px-6 text-center">
        <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
          ทำไมต้องเลือกเรา
        </h2>
        <p className="mt-4 text-sm text-muted md:text-base">
          บริการด้วยใจ ซื่อสัตย์ โปร่งใส
        </p>
        <div className="mt-16 space-y-12 text-left md:space-y-14">
          {trustPoints.map((point) => (
            <div key={point.title} className="border-t border-border pt-8">
              <h3 className="text-lg font-medium">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
