import { shop } from "@/data/shop";

export function PromoSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-navy to-navy-light text-white">
        <div className="grid md:grid-cols-2">
          <div className="p-8 md:p-12">
            <h2 className="text-2xl font-bold md:text-3xl">
              รับซื้อ-แลกเปลี่ยนรถเก่า
            </h2>
            <p className="mt-4 text-white/80">
              นำรถเก่ามาประเมินราคาฟรี แลกเปลี่ยนรถใหม่ได้ทันที
              ช่วยจัดไฟแนนซ์ผ่อนสบาย อนุมัติเร็ว
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={shop.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold transition hover:bg-accent-dark"
              >
                แชท LINE {shop.line}
              </a>
              <a
                href={`tel:${shop.phoneTel}`}
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold transition hover:bg-white/10"
              >
                โทรประเมินราคา
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center bg-white/5 p-8">
            <div className="text-center">
              <p className="text-5xl font-bold text-accent">0%</p>
              <p className="mt-2 text-sm text-white/70">ดาวน์เริ่มต้น*</p>
              <p className="mt-4 text-xs text-white/50">
                *เงื่อนไขตามธนาคารที่ร่วมรายการ
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
