import { CATEGORY_SLUGS, VEHICLE_CATEGORIES } from "@/lib/vehicle-category";
import { AppLink } from "./AppLink";

export function VehicleTypeSection() {
  return (
    <section
      className="border-b border-border bg-background py-10 md:py-12"
      aria-labelledby="vehicle-types-heading"
    >
      <div className="mx-auto max-w-[1400px] px-6">
        <h2
          id="vehicle-types-heading"
          className="text-center text-lg font-medium tracking-tight md:text-xl"
        >
          เลือกประเภทรถ
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-sm text-muted">
          ดูรถมือสองแยกตามประเภทในลำปาง — กระบะ เก๋ง และ SUV
        </p>
        <nav
          className="mt-6 flex flex-wrap items-center justify-center gap-3"
          aria-label="ประเภทรถมือสอง"
        >
          {CATEGORY_SLUGS.map((slug) => {
            const config = VEHICLE_CATEGORIES[slug];
            return (
              <AppLink
                key={slug}
                href={config.path}
                className="inline-flex min-h-[40px] items-center justify-center rounded-full border border-border-dark bg-surface px-5 py-2 text-[13px] font-medium text-foreground/90 transition hover:border-accent/50 hover:bg-surface-raised hover:text-accent"
              >
                {config.chipLabel}
              </AppLink>
            );
          })}
          <AppLink
            href="/#cars"
            className="inline-flex min-h-[40px] items-center justify-center rounded-full border border-dashed border-border-dark px-5 py-2 text-[13px] font-medium text-muted transition hover:border-accent/40 hover:text-foreground"
          >
            ทั้งหมด
          </AppLink>
        </nav>
      </div>
    </section>
  );
}
