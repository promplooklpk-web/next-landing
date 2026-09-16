import type { Metadata } from "next";
import { Car } from "@/data/cars";
import { shop } from "@/data/shop";
import { buildCarJsonLd } from "@/lib/car-seo";
import { absoluteUrl, FULL_SITE_URL } from "@/lib/site";
import {
  CategorySlug,
  VEHICLE_CATEGORIES,
  VehicleCategoryConfig,
} from "@/lib/vehicle-category";

export function categoryPageMetadata(category: CategorySlug): Metadata {
  const config = VEHICLE_CATEGORIES[category];
  const title = `${config.title} | ${shop.name}`;
  const canonical = config.path;

  return {
    title: { absolute: title },
    description: config.description,
    keywords: [
      config.title,
      "ขายรถมือสองลำปาง",
      "รถมือสองลำปาง",
      shop.name,
      "ลำปาง",
    ],
    openGraph: {
      title,
      description: config.description,
      url: absoluteUrl(canonical),
      locale: "th_TH",
      type: "website",
    },
    alternates: {
      canonical,
    },
  };
}

export function buildCategoryBreadcrumbJsonLd(config: VehicleCategoryConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "หน้าแรก",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: config.h1,
        item: absoluteUrl(config.path),
      },
    ],
  };
}

export function buildCategoryFaqJsonLd(config: VehicleCategoryConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildCategoryItemListJsonLd(
  config: VehicleCategoryConfig,
  cars: Car[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: config.h1,
    description: config.description,
    url: absoluteUrl(config.path),
    numberOfItems: cars.length,
    itemListElement: cars.map((car, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: buildCarJsonLd(car),
    })),
  };
}

export function buildCategoryDealerJsonLd(config: VehicleCategoryConfig) {
  return {
    "@context": "https://schema.org",
    "@type": ["AutoDealer", "LocalBusiness"],
    name: shop.name,
    description: config.description,
    url: absoluteUrl(config.path),
    telephone: shop.phoneTel,
    address: {
      "@type": "PostalAddress",
      streetAddress: shop.location.address,
      addressLocality: shop.location.city,
      addressRegion: shop.location.province,
      postalCode: shop.location.postalCode,
      addressCountry: "TH",
    },
    parentOrganization: {
      "@type": "AutoDealer",
      name: shop.name,
      url: FULL_SITE_URL,
    },
  };
}

export type { CategorySlug };
