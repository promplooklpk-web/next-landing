import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CarGallery } from "../../components/CarGallery";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { JsonLd } from "../../components/JsonLd";
import { MobileFloatingCTA } from "../../components/MobileFloatingCTA";
import { PrimaryButton, SecondaryButton } from "../../components/Buttons";
import {
  cars,
  formatMileage,
  formatPrice,
  getCarBySlug,
} from "@/data/cars";
import { shop } from "@/data/shop";
import { absoluteUrl, carDetailUrl } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return cars.map((car) => ({ slug: car.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const car = getCarBySlug(slug);
  if (!car) return { title: "ไม่พบรถ" };

  const title = `${car.brand} ${car.model} ${car.year}`;
  const description = `${car.brand} ${car.model} ปี ${car.year} ราคา ฿${formatPrice(car.price)} ${formatMileage(car.mileage)} ${car.transmission} — ${shop.name}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: carDetailUrl(slug),
      images: [{ url: car.images[0], alt: title }],
      type: "website",
    },
    alternates: {
      canonical: `/cars/${slug}/`,
    },
  };
}

export default async function CarDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const car = getCarBySlug(slug);
  if (!car) notFound();

  const carJsonLd = {
    "@context": "https://schema.org",
    "@type": "Car",
    name: `${car.brand} ${car.model}`,
    brand: { "@type": "Brand", name: car.brand },
    model: car.model,
    vehicleModelDate: String(car.year),
    color: car.color,
    fuelType: car.fuel,
    vehicleTransmission: car.transmission,
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: car.mileage,
      unitCode: "KMT",
    },
    image: car.images,
    description: car.description,
    offers: {
      "@type": "Offer",
      price: car.price,
      priceCurrency: "THB",
      availability: car.sold
        ? "https://schema.org/SoldOut"
        : "https://schema.org/InStock",
      seller: {
        "@type": "AutoDealer",
        name: shop.name,
        url: absoluteUrl(),
      },
    },
  };

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

  return (
    <>
      <JsonLd data={carJsonLd} />
      <Header />
      <main className="pt-12 md:pt-14">
        <CarGallery images={car.images} alt={`${car.brand} ${car.model}`} />

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

          <Link
            href="/#cars"
            className="mt-8 inline-block text-xs text-muted transition hover:text-foreground"
          >
            ← กลับไปหน้ารถในร้าน
          </Link>
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
      </main>
      <Footer />
      <MobileFloatingCTA />
    </>
  );
}
