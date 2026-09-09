import type { Metadata } from "next";
import { ContactMap } from "./components/ContactMap";
import { FeaturedCars } from "./components/FeaturedCars";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { HowToBuy } from "./components/HowToBuy";
import { JsonLd } from "./components/JsonLd";
import { MobileFloatingCTA } from "./components/MobileFloatingCTA";
import { PromoSection } from "./components/PromoSection";
import { QuickSearch } from "./components/QuickSearch";
import { ReviewsSection } from "./components/ReviewsSection";
import { TrustSection } from "./components/TrustSection";
import { shop } from "@/data/shop";
import { FULL_SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: `${shop.name} | รถมือสองลำปาง ราคาดี คุณภาพเยี่ยม`,
  description: `${shop.tagline} เปิดทุกวัน ${shop.hours} โทร ${shop.phone} LINE ${shop.line}`,
  openGraph: {
    title: `${shop.name} | รถมือสองลำปาง`,
    description: shop.tagline,
    url: FULL_SITE_URL,
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
        <QuickSearch />
        <FeaturedCars />
        <TrustSection />
        <PromoSection />
        <ReviewsSection />
        <HowToBuy />
        <ContactMap />
      </main>
      <Footer />
      <MobileFloatingCTA />
    </>
  );
}
