import { Car } from "@/data/cars";
import { shop } from "@/data/shop";
import { fetchCarsAtBuild } from "@/lib/cars-build";
import {
  buildCategoryDealerJsonLd,
  buildCategoryItemListJsonLd,
} from "@/lib/category-seo";
import {
  CategorySlug,
  filterCarsByCategory,
  VEHICLE_CATEGORIES,
} from "@/lib/vehicle-category";
import { CarCard } from "./CarCard";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { JsonLd } from "./JsonLd";
import { MobileFloatingCTA } from "./MobileFloatingCTA";
import { PrimaryButton, SecondaryButton } from "./Buttons";
import { AppLink } from "./AppLink";

interface CategoryInventoryPageProps {
  category: CategorySlug;
}

export async function CategoryInventoryPage({
  category,
}: CategoryInventoryPageProps) {
  const config = VEHICLE_CATEGORIES[category];
  const allCars = await fetchCarsAtBuild();
  const cars = filterCarsByCategory(allCars, category);

  return (
    <>
      <JsonLd data={buildCategoryDealerJsonLd(config)} />
      {cars.length > 0 && (
        <JsonLd data={buildCategoryItemListJsonLd(config, cars)} />
      )}
      <Header />
      <main className="pt-12 md:pt-14">
        <div className="border-b border-border bg-surface">
          <div className="mx-auto max-w-[1400px] px-6 py-14 md:py-20">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              {shop.name}
            </p>
            <h1 className="mt-3 text-3xl font-medium tracking-tight md:text-4xl">
              {config.h1}
            </h1>
            <div className="mt-6 max-w-2xl space-y-4 text-sm leading-relaxed text-muted">
              {config.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <PrimaryButton href={`tel:${shop.phoneTel}`} external>
                โทร {shop.phone}
              </PrimaryButton>
              <SecondaryButton href="/#cars">ดูรถทั้งหมดในร้าน</SecondaryButton>
            </div>
          </div>
        </div>

        <section className="mx-auto max-w-[1400px] px-6 py-14 md:py-16">
          <h2 className="text-lg font-medium tracking-tight md:text-xl">
            รถ{config.chipLabel}ที่พร้อมขาย
          </h2>
          {cars.length === 0 ? (
            <p className="mt-6 text-sm text-muted">
              ขณะนี้ยังไม่มีรถประเภทนี้ในรายการออนไลน์ — โทร{" "}
              <a
                href={`tel:${shop.phoneTel}`}
                className="font-medium text-accent hover:underline"
              >
                {shop.phone}
              </a>{" "}
              เพื่อสอบถามสต็อกล่าสุด หรือ{" "}
              <AppLink href="/#cars" className="text-accent hover:underline">
                ดูรถทั้งหมด
              </AppLink>
            </p>
          ) : (
            <ul className="mt-8 grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cars.map((car: Car) => (
                <li key={car.slug}>
                  <CarCard car={car} />
                </li>
              ))}
            </ul>
          )}
          <p className="mt-10 text-center text-xs text-muted">
            {shop.location.address}
          </p>
        </section>
      </main>
      <Footer />
      <MobileFloatingCTA />
    </>
  );
}
