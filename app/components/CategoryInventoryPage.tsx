import { shop } from "@/data/shop";
import { fetchCarsAtBuild } from "@/lib/cars-build";
import {
  buildCategoryBreadcrumbJsonLd,
  buildCategoryDealerJsonLd,
  buildCategoryFaqJsonLd,
  buildCategoryItemListJsonLd,
} from "@/lib/category-seo";
import {
  CategorySlug,
  filterCarsByCategory,
  relatedCategories,
  VEHICLE_CATEGORIES,
} from "@/lib/vehicle-category";
import { ContactMap } from "./ContactMap";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { JsonLd } from "./JsonLd";
import { MobileFloatingCTA } from "./MobileFloatingCTA";
import { PrimaryButton, SecondaryButton } from "./Buttons";
import { AppLink } from "./AppLink";
import { CategoryInventorySection } from "./CategoryInventorySection";

interface CategoryInventoryPageProps {
  category: CategorySlug;
}

export async function CategoryInventoryPage({
  category,
}: CategoryInventoryPageProps) {
  const config = VEHICLE_CATEGORIES[category];
  const allCars = await fetchCarsAtBuild();
  const buildCars = filterCarsByCategory(allCars, category);
  const related = relatedCategories(category);

  return (
    <>
      <JsonLd data={buildCategoryBreadcrumbJsonLd(config)} />
      <JsonLd data={buildCategoryFaqJsonLd(config)} />
      <JsonLd data={buildCategoryDealerJsonLd(config)} />
      {buildCars.length > 0 && (
        <JsonLd data={buildCategoryItemListJsonLd(config, buildCars)} />
      )}
      <Header />
      <main className="pt-12 md:pt-14">
        <div className="border-b border-border bg-near-black text-white">
          <div className="mx-auto max-w-[800px] px-6 py-14 text-center md:py-20">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/70">
              {shop.name} · รถมือสองลำปาง
            </p>
            <h1 className="mt-4 text-3xl font-medium tracking-tight md:text-5xl">
              {config.h1}
            </h1>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/85 md:text-base">
              {config.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <PrimaryButton href={`tel:${shop.phoneTel}`} external overlay>
                โทร {shop.phone}
              </PrimaryButton>
              <SecondaryButton href="/#cars" overlay>
                ดูรถทั้งหมด
              </SecondaryButton>
            </div>
          </div>
        </div>

        <section className="border-b border-border bg-surface">
          <div className="mx-auto max-w-[720px] px-6 py-14 md:py-16">
            <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
              {config.adviceHeading}
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted">
              {config.adviceParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
            <h3 className="mt-10 text-lg font-medium text-foreground">
              {config.useCasesHeading}
            </h3>
            <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-muted">
              {config.useCases.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <CategoryInventorySection category={category} />

        <section className="border-t border-border bg-surface">
          <div className="mx-auto max-w-[720px] px-6 py-14 md:py-16">
            <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
              คำถามที่พบบ่อย
            </h2>
            <dl className="mt-8 space-y-8">
              {config.faqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="text-base font-medium text-foreground">{faq.question}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="border-t border-border bg-background">
          <div className="mx-auto max-w-[720px] px-6 py-12 text-center md:py-14">
            <h2 className="text-lg font-medium tracking-tight">หมวดรถมือสองอื่นในลำปาง</h2>
            <nav className="mt-6 flex flex-wrap justify-center gap-4" aria-label="หมวดรถ">
              {related.map((slug) => (
                <AppLink
                  key={slug}
                  href={VEHICLE_CATEGORIES[slug].path}
                  className="text-sm text-accent underline-offset-4 hover:underline"
                >
                  {VEHICLE_CATEGORIES[slug].h1}
                </AppLink>
              ))}
              <AppLink
                href="/"
                className="text-sm text-muted underline-offset-4 hover:text-accent hover:underline"
              >
                หน้าแรก — ขายรถมือสองลำปาง
              </AppLink>
            </nav>
          </div>
        </section>

        <ContactMap />
      </main>
      <Footer />
      <MobileFloatingCTA />
    </>
  );
}
