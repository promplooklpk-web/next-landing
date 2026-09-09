import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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
      images: [{ url: car.image, alt: title }],
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
    image: car.image,
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

  const specs = [
    { label: "เลขไมล์", value: formatMileage(car.mileage) },
    { label: "เกียร์", value: car.transmission },
    { label: "เชื้อเพลิง", value: car.fuel },
    { label: "สี", value: car.color },
    { label: "เครื่องยนต์", value: car.engine },
    { label: "ปี", value: String(car.year) },
  ];

  return (
    <>
      <JsonLd data={carJsonLd} />
      <Header />
      <main>
        <section className="relative h-[70vh] min-h-[480px] w-full">
          <Image
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {car.sold && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <span className="text-2xl font-medium tracking-wide text-white">
                ขายแล้ว
              </span>
            </div>
          )}
        </section>

        <section className="bg-white py-16 text-center md:py-24">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-light">
            {car.brand}
          </p>
          <h1 className="mt-3 text-3xl font-medium tracking-tight md:text-5xl">
            {car.model}
          </h1>
          {!car.sold ? (
            <p className="mt-4 text-lg text-muted md:text-xl">
              ฿{formatPrice(car.price)}
            </p>
          ) : (
            <p className="mt-4 text-lg text-muted">ขายแล้ว</p>
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

        <section className="border-t border-border bg-surface py-16 md:py-20">
          <div className="mx-auto max-w-[900px] px-6">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
              {specs.map((spec) => (
                <div key={spec.label} className="text-center">
                  <p className="text-xs text-muted-light">{spec.label}</p>
                  <p className="mt-1 text-sm font-medium">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-[680px] px-6">
            <h2 className="text-center text-2xl font-medium tracking-tight md:text-3xl">
              รายละเอียด
            </h2>
            <p className="mt-6 text-center text-sm leading-relaxed text-muted">
              {car.description}
            </p>
          </div>
        </section>

        <section className="border-t border-border bg-white py-16 md:py-20">
          <div className="mx-auto max-w-[680px] px-6">
            <h2 className="text-center text-2xl font-medium tracking-tight md:text-3xl">
              อุปกรณ์และฟีเจอร์
            </h2>
            <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-3">
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
