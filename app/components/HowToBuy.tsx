import { howToBuySteps } from "@/data/shop";

export function HowToBuy() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-[900px] px-6">
        <h2 className="text-center text-3xl font-medium tracking-tight md:text-4xl">
          ขั้นตอนการซื้อรถ
        </h2>
        <div className="mt-16 grid gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
          {howToBuySteps.map((step) => (
            <div key={step.step} className="text-center">
              <p className="text-xs text-muted-light">{step.step}</p>
              <h3 className="mt-2 text-sm font-medium">{step.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
