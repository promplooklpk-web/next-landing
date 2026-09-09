import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CarDetailPageClient } from "../../components/CarDetailPageClient";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { JsonLd } from "../../components/JsonLd";
import { MobileFloatingCTA } from "../../components/MobileFloatingCTA";
import { getBuildCarSlugs, resolveCarAtBuild } from "@/lib/cars-build";
import { buildCarJsonLd, carPageMetadata } from "@/lib/car-seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getBuildCarSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const car = await resolveCarAtBuild(slug);
  if (!car) return { title: "ไม่พบรถ" };
  return carPageMetadata(car, slug);
}

export default async function CarDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const car = await resolveCarAtBuild(slug);
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
