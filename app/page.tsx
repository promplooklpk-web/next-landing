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
import { shop } from "@/data/shop";
import { FULL_SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: `${shop.name} | รถมือสองลำปาง ราคาดี คุณภาพเยี่ยม`,
  description: `${shop.tagline} รถมือสองลำปาง คัดสรรคุณภาพ เปิดทุกวัน ${shop.hours} โทร ${shop.phone} LINE ${shop.line}`,
  keywords: [
    "รถมือสองลำปาง",
    "รถมือสอง",
    "ลำปาง",
    "รถมือสองราคาดี",
    "เต็นท์รถมือสองลำปาง",
    shop.name,
  ],
  openGraph: {
    title: `${shop.name} | รถมือสองลำปาง`,
    description: shop.tagline,
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
        <ContactMap />
      </main>
      <Footer />
      <MobileFloatingCTA />
    </>
  );
}
