import type { Metadata } from "next";
import { shop } from "@/data/shop";
import { absoluteUrl } from "@/lib/site";
import type { CategoryPageConfig } from "@/lib/category-pages";
import { categoryPath } from "@/lib/category-pages";

export function categoryPageMetadata(config: CategoryPageConfig): Metadata {
  const canonical = categoryPath(config);
  return {
    title: { absolute: config.metaTitle },
    description: config.metaDescription,
    keywords: [
      config.h1,
      "รถมือสองลำปาง",
      "ขายรถมือสองลำปาง",
      shop.name,
      "ลำปาง",
    ],
    openGraph: {
      title: config.metaTitle,
      description: config.metaDescription,
      url: absoluteUrl(canonical),
      locale: "th_TH",
      type: "website",
    },
    alternates: {
      canonical,
    },
  };
}

export function buildCategoryBreadcrumbJsonLd(config: CategoryPageConfig) {
  const pageUrl = absoluteUrl(categoryPath(config));
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
        item: pageUrl,
      },
    ],
  };
}

export function buildCategoryFaqJsonLd(config: CategoryPageConfig) {
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
