import { Car, formatMileage, formatPrice } from "@/data/cars";
import { shop } from "@/data/shop";
import { homeHash } from "@/lib/navigation";
import { AppLink } from "./AppLink";
import { CarGallery } from "./CarGallery";
import { PrimaryButton, SecondaryButton } from "./Buttons";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80";

interface CarDetailViewProps {
  car: Car;
}

export function CarDetailView({ car }: CarDetailViewProps) {
  const specs: { label: string; value: string }[] = [
    { label: "ยี่ห้อ", value: car.brand },
    { label: "รุ่น", value: car.model },
    { label: "ปี", value: String(car.year) },
    { label: "ราคา", value: car.sold ? "ขายแล้ว" : `฿${formatPrice(car.price)}` },
    { label: "เลขไมล์", value: formatMileage(car.mileage) },
    { label: "เกียร์", value: car.transmission },
    { label: "เชื้อเพลิง", value: car.fuel },
    { label: "สี", value: car.color },
    { label: "เครื่องยนต์", value: car.engine },
    { label: "สถานะ", value: car.status },
    { label: "สาขา", value: `ลำปาง · ${shop.name}` },
  ];

  const images = car.images.length > 0 ? car.images : [FALLBACK_IMAGE];

  return (
    <>
      <CarGallery images={images} alt={`${car.brand} ${car.model}`} />

      <section className="mx-auto max-w-[720px] px-6 py-12 text-center md:py-16">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-light">
          {car.brand}
        </p>
        <h1 className="mt-3 text-3xl font-medium tracking-tight md:text-4xl">
          {car.model}
        </h1>
        {!car.sold && (
          <p className="mt-4 text-xl text-muted md:text-2xl">
            ฿{formatPrice(car.price)}
          </p>
        )}

        {!car.sold && (
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <PrimaryButton href={`tel:${shop.phoneTel}`} external>
              โทรสอบถาม
            </PrimaryButton>
            <SecondaryButton href={shop.lineUrl} external>
              แชท LINE
            </SecondaryButton>
          </div>
        )}

        <AppLink
          href={homeHash("cars")}
          className="relative z-10 mt-8 inline-block text-xs text-muted transition hover:text-foreground"
        >
          ← กลับไปหน้ารถในร้าน
        </AppLink>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-[720px] px-6 py-12 md:py-16">
          <h2 className="text-center text-xl font-medium tracking-tight md:text-2xl">
            ข้อมูลรถ
          </h2>
          <dl className="mt-10 divide-y divide-border">
            {specs.map((spec) => (
              <div
                key={spec.label}
                className="grid grid-cols-2 gap-4 py-4 text-sm"
              >
                <dt className="text-muted">{spec.label}</dt>
                <dd className="text-right font-medium">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-[720px] px-6 py-12 md:py-16">
          <h2 className="text-center text-xl font-medium tracking-tight md:text-2xl">
            จุดเด่น
          </h2>
          <p className="mt-4 text-center text-sm text-muted">{car.highlights}</p>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-[720px] px-6 py-12 md:py-16">
          <h2 className="text-center text-xl font-medium tracking-tight md:text-2xl">
            รายละเอียด
          </h2>
          <p className="mt-6 text-center text-sm leading-relaxed text-muted">
            {car.description}
          </p>
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-[720px] px-6 py-12 md:py-16">
          <h2 className="text-center text-xl font-medium tracking-tight md:text-2xl">
            อุปกรณ์และฟีเจอร์
          </h2>
          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-3">
            {car.features.map((feature) => (
              <li key={feature} className="text-center text-xs text-muted">
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
