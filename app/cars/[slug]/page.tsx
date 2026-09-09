import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CarDetailPageClient } from "../../components/CarDetailPageClient";
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
      images: [{ url: car.images[0], alt: title }],
      type: "website",
    },
    alternates: {
      canonical: `/cars/${slug}/`,
    },
  };
}

function buildCarJsonLd(car: NonNullable<ReturnType<typeof getCarBySlug>>) {
  return {
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
}

export default async function CarDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const car = getCarBySlug(slug);
  if (!car) notFound();

  return (
    <>
      <JsonLd data={buildCarJsonLd(car)} />
      <Header />
      <main className="pt-12 md:pt-14">
        <CarDetailPageClient slug={slug} fallback={car} />
      </main>
      <Footer />
      <MobileFloatingCTA />
    </>
  );
}
