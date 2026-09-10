import type { Metadata } from "next";
import { CarsSection } from "./components/CarsSection";
import { ContactMap } from "./components/ContactMap";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { HowToBuy } from "./components/HowToBuy";
import { JsonLd } from "./components/JsonLd";
import { MobileFloatingCTA } from "./components/MobileFloatingCTA";
import { PromoSection } from "./components/PromoSection";
import { SeoIntroSection } from "./components/SeoIntroSection";
import { shop } from "@/data/shop";
import { FULL_SITE_URL } from "@/lib/site";
import {
  SEO_DEFAULT_DESCRIPTION,
  SEO_DEFAULT_TITLE,
  SEO_KEYWORDS,
} from "@/lib/site-seo";

export const metadata: Metadata = {
  title: SEO_DEFAULT_TITLE,
  description: SEO_DEFAULT_DESCRIPTION,
  keywords: [...SEO_KEYWORDS],
  openGraph: {
    title: SEO_DEFAULT_TITLE,
    description: SEO_DEFAULT_DESCRIPTION,
    url: FULL_SITE_URL,
    locale: "th_TH",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
};

const dealerJsonLd = {
  "@context": "https://schema.org",
  "@type": ["AutoDealer", "LocalBusiness"],
  name: shop.name,
  description: shop.tagline,
  url: FULL_SITE_URL,
  telephone: shop.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: shop.location.address,
    addressLocality: shop.location.city,
    addressRegion: shop.location.province,
    postalCode: "52000",
    addressCountry: "TH",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: shop.location.lat,
    longitude: shop.location.lng,
  },
  areaServed: [
    { "@type": "City", name: "ลำปาง" },
    { "@type": "AdministrativeArea", name: "อำเภอเมืองลำปาง" },
    { "@type": "Place", name: "บ้านฟ้อน" },
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "09:00",
    closes: "18:00",
  },
  priceRange: "฿฿",
};

export default function Home() {
  return (
    <>
      <JsonLd data={dealerJsonLd} />
      <Header />
      <main>
        <Hero />
        <CarsSection />
        <PromoSection />
        <HowToBuy />
        <SeoIntroSection />
        <ContactMap />
      </main>
      <Footer />
      <MobileFloatingCTA />
    </>
  );
}
