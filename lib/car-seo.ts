import type { Metadata } from "next";
import { Car, formatMileage, formatPrice } from "@/data/cars";
import { shop } from "@/data/shop";
import { SEO_PRIMARY } from "@/lib/site-seo";
import { absoluteUrl, carDetailUrl } from "@/lib/site";

export function carPageTitle(car: Car): string {
  return `${car.brand} ${car.model} ปี ${car.year} ${SEO_PRIMARY} | ${shop.name}`;
}

export function carPageDescription(car: Car): string {
  return (
    `ขายรถมือสอง ${car.brand} ${car.model} ปี ${car.year} ราคา ฿${formatPrice(car.price)} ` +
    `เลขไมล์ ${formatMileage(car.mileage)} ${car.transmission} ${car.fuel} — ` +
    `${shop.name} ลำปาง บริการโซนบ้านฟ้อนและเมืองลำปาง`
  );
}

export function carPageMetadata(car: Car, slug: string): Metadata {
  const title = carPageTitle(car);
  const description = carPageDescription(car);
  const ogImage = car.images[0];

  return {
    title: { absolute: title },
    description,
    keywords: [
      SEO_PRIMARY,
      "ขายรถมือสอง",
      "ขายรถมือสองบ้านฟ้อน",
      `${car.brand} ${car.model}`,
      "ลำปาง",
    ],
    openGraph: {
      title,
      description,
      url: carDetailUrl(slug),
      images: ogImage ? [{ url: ogImage, alt: title }] : undefined,
      type: "website",
      locale: "th_TH",
    },
    alternates: {
      canonical: `/cars/${slug}/`,
    },
  };
}

export function buildCarJsonLd(car: Car) {
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
        areaServed: [
          { "@type": "City", name: "ลำปาง" },
          { "@type": "Place", name: "บ้านฟ้อน" },
        ],
      },
    },
  };
}
