import { shop } from "@/data/shop";
import { PrimaryButton } from "./Buttons";

export function PromoSection() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-surface-raised py-24 text-white md:py-32">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent"
        aria-hidden
      />
      <div className="relative mx-auto max-w-[680px] px-6 text-center">
        <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
          รับซื้อ-แลกเปลี่ยน
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-white/70 md:text-base">
          นำรถเก่ามาประเมินราคาฟรี แลกเปลี่ยนรถใหม่ได้ทันที
          ช่วยจัดไฟแนนซ์ผ่อนสบาย
        </p>
        <div className="mt-10 flex justify-center">
          <PrimaryButton href={`tel:${shop.phoneTel}`} external>
            โทรประเมินราคา
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}
