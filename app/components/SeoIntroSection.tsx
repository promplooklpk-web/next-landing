import { shop } from "@/data/shop";
import { CATEGORY_SLUGS, VEHICLE_CATEGORIES } from "@/lib/vehicle-category";
import { AppLink } from "./AppLink";

export function SeoIntroSection() {
  return (
    <section className="border-t border-border bg-surface">
      <div className="mx-auto max-w-[720px] px-6 py-20 md:py-24">
        <h2 className="text-center text-2xl font-medium tracking-tight md:text-3xl">
          ขายรถมือสองในลำปาง — ใกล้โซนบ้านฟ้อน
        </h2>
        <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted">
          <p>
            {shop.name} เป็นจุดซื้อ-ขายรถมือสองในลำปางที่คัดสรรรถคุณภาพ
            ตรวจสภาพก่อนส่งมอบ ราคาโปร่งใส เหมาะสำหรับผู้ที่มองหา
            <strong className="font-medium text-foreground"> ขายรถมือสองลำปาง </strong>
            ที่ไว้ใจได้
          </p>
          <p>
            {shop.serviceArea} ลูกค้าจากบ้านฟ้อนและพื้นที่เมืองลำปางสามารถมาดูรถ
            ทดลองขับ และปรึกษาเรื่องการโอนกรรมสิทธิ์ได้ที่โชว์รูมของเรา
          </p>
          <ul className="list-inside list-disc space-y-2 pl-1">
            <li>
              รถมือสองหลายยี่ห้อ — ดูตามหมวด{" "}
              {CATEGORY_SLUGS.map((slug, index) => (
                <span key={slug}>
                  {index > 0 ? " · " : null}
                  <AppLink
                    href={VEHICLE_CATEGORIES[slug].path}
                    className="text-foreground underline-offset-4 hover:text-accent hover:underline"
                  >
                    {VEHICLE_CATEGORIES[slug].h1}
                  </AppLink>
                </span>
              ))}
            </li>
            <li>บริการขายรถมือสองบ้านฟ้อนและใกล้เคียง — นัดดูรถล่วงหน้าได้</li>
            <li>
              รับซื้อ-แลกเปลี่ยน ประเมินราคาฟรี ติดต่อผ่านโทร {shop.phone}
            </li>
          </ul>
          <p>
            ไม่ว่าคุณจะอยู่ในลำปางเมือง บ้านฟ้อน หรือจังหวัดใกล้เคียง
            เราพร้อมช่วยหารถมือสองที่ตรงงบและความต้องการของคุณ
          </p>
        </div>
      </div>
    </section>
  );
}
