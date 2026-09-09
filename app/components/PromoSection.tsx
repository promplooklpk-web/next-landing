import { shop } from "@/data/shop";
import { PrimaryButton, SecondaryButton } from "./Buttons";

export function PromoSection() {
  return (
    <section className="bg-near-black py-24 text-white md:py-32">
      <div className="mx-auto max-w-[680px] px-6 text-center">
        <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
          รับซื้อ-แลกเปลี่ยน
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-white/70 md:text-base">
          นำรถเก่ามาประเมินราคาฟรี แลกเปลี่ยนรถใหม่ได้ทันที
          ช่วยจัดไฟแนนซ์ผ่อนสบาย
        </p>
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <a
            href={shop.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-w-[200px] items-center justify-center bg-white px-8 py-2.5 text-[13px] font-medium tracking-wide text-near-black transition hover:bg-white/90"
          >
            แชท LINE
          </a>
          <SecondaryButton href={`tel:${shop.phoneTel}`} external dark>
            โทรประเมินราคา
          </SecondaryButton>
        </div>
      </div>
    </section>
  );
}
