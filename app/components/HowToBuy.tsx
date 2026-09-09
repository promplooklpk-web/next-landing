import { howToBuySteps } from "@/data/shop";

export function HowToBuy() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <h2 className="text-center text-2xl font-bold text-navy md:text-3xl">
        ขั้นตอนการซื้อรถ
      </h2>
      <p className="mt-2 text-center text-muted">ง่าย รวดเร็ว ไม่ยุ่งยาก</p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {howToBuySteps.map((step) => (
          <div key={step.step} className="relative rounded-2xl border border-border bg-surface p-6">
            <span className="text-3xl font-bold text-accent/30">{step.step}</span>
            <h3 className="mt-2 font-bold">{step.title}</h3>
            <p className="mt-2 text-sm text-muted">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
