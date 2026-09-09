import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { JsonLd } from "../../components/JsonLd";
import { MobileFloatingCTA } from "../../components/MobileFloatingCTA";
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

  return (
    <>
      <JsonLd data={carJsonLd} />
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <Link href="/#cars" className="text-sm text-accent hover:underline">
          ← กลับไปหน้ารถในร้าน
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface-muted">
            <Image
              src={car.image}
              alt={`${car.brand} ${car.model}`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {car.sold && (
              <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-2xl font-bold text-white">
                ขายแล้ว
              </span>
            )}
          </div>

          <div>
            <p className="text-sm font-medium text-muted">{car.brand}</p>
            <h1 className="mt-1 text-2xl font-bold text-navy md:text-3xl">
              {car.model}
            </h1>
            <p className="mt-2 text-muted">ปี {car.year}</p>

            {!car.sold ? (
              <p className="mt-4 text-3xl font-bold text-accent">
                ฿{formatPrice(car.price)}
              </p>
            ) : (
              <p className="mt-4 text-xl font-bold text-muted">ขายแล้ว</p>
            )}

            <div className="mt-6 grid grid-cols-2 gap-4 rounded-xl border border-border bg-surface-muted p-4 text-sm">
              <div>
                <p className="text-muted">เลขไมล์</p>
                <p className="font-semibold">{formatMileage(car.mileage)}</p>
              </div>
              <div>
                <p className="text-muted">เกียร์</p>
                <p className="font-semibold">{car.transmission}</p>
              </div>
              <div>
                <p className="text-muted">เชื้อเพลิง</p>
                <p className="font-semibold">{car.fuel}</p>
              </div>
              <div>
                <p className="text-muted">สี</p>
                <p className="font-semibold">{car.color}</p>
              </div>
              <div>
                <p className="text-muted">เครื่องยนต์</p>
                <p className="font-semibold">{car.engine}</p>
              </div>
            </div>

            {!car.sold && (
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`tel:${shop.phoneTel}`}
                  className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-dark"
                >
                  โทรสอบถาม {shop.phone}
                </a>
                <a
                  href={shop.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[#06C755] px-6 py-3 text-sm font-semibold text-white"
                >
                  แชท LINE {shop.line}
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-lg font-bold text-navy">รายละเอียด</h2>
            <p className="mt-3 leading-relaxed text-muted">{car.description}</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-navy">อุปกรณ์และฟีเจอร์</h2>
            <ul className="mt-3 grid grid-cols-2 gap-2">
              {car.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm text-muted"
                >
                  <span className="text-success">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
      <MobileFloatingCTA />
    </>
  );
}
