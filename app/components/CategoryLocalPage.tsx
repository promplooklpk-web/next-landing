import { ContactMap } from "./ContactMap";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { JsonLd } from "./JsonLd";
import { MobileFloatingCTA } from "./MobileFloatingCTA";
import { CategoryInventorySection } from "./CategoryInventorySection";
import { AppLink } from "./AppLink";
import { PrimaryButton } from "./Buttons";
import { categoryPath, getCategoryById, type CategoryPageId } from "@/lib/category-pages";
import {
  buildCategoryBreadcrumbJsonLd,
  buildCategoryFaqJsonLd,
} from "@/lib/category-seo";
import { shop } from "@/data/shop";
import { homeHash } from "@/lib/navigation";

interface CategoryLocalPageProps {
  categoryId: CategoryPageId;
}

export function CategoryLocalPage({ categoryId }: CategoryLocalPageProps) {
  const config = getCategoryById(categoryId);
  const related = config.relatedCategoryIds.map((id) => getCategoryById(id));

  const emptyMessage =
    `ขณะนี้ยังไม่มี${config.h1.replace("ลำปาง", "").trim()}ว่างในเว็บ — ` +
    `สต็อกเปลี่ยนบ่อย โทร ${shop.phone} เพื่อสอบถามรถที่กำลังจะเข้าหรือนัดดูรถที่โชว์รูมตำบลชมพู`;

  return (
    <>
      <JsonLd data={buildCategoryBreadcrumbJsonLd(config)} />
      <JsonLd data={buildCategoryFaqJsonLd(config)} />
      <Header />
      <main>
        <section className="border-b border-border bg-near-black pt-14 text-white md:pt-16">
          <div className="mx-auto max-w-[800px] px-6 py-20 text-center md:py-28">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/70">
              {shop.name} · รถมือสองลำปาง
            </p>
            <h1 className="mt-4 text-3xl font-medium tracking-tight md:text-5xl">
              {config.h1}
            </h1>
            <p className="mt-6 text-sm leading-relaxed text-white/85 md:text-base">
              {config.intro}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <PrimaryButton href={`tel:${shop.phoneTel}`} external overlay>
                โทร {shop.phone}
              </PrimaryButton>
              <PrimaryButton href={homeHash("cars")} overlay>
                ดูรถทั้งหมด
              </PrimaryButton>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-surface">
          <div className="mx-auto max-w-[720px] px-6 py-16 md:py-20">
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

        <CategoryInventorySection
          bodyType={config.bodyType}
          inventoryHeading={`รถว่างในหมวด${config.h1}`}
          emptyMessage={emptyMessage}
        />

        <section className="border-t border-border bg-surface">
          <div className="mx-auto max-w-[720px] px-6 py-16 md:py-20">
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
          <div className="mx-auto max-w-[720px] px-6 py-12 text-center md:py-16">
            <h2 className="text-lg font-medium tracking-tight">หมวดรถมือสองอื่นในลำปาง</h2>
            <nav className="mt-6 flex flex-wrap justify-center gap-4" aria-label="หมวดรถ">
              {related.map((cat) => (
                <AppLink
                  key={cat.id}
                  href={categoryPath(cat)}
                  className="text-sm text-accent underline-offset-4 hover:underline"
                >
                  {cat.h1}
                </AppLink>
              ))}
              <AppLink
                href="/"
                className="text-sm text-white/70 underline-offset-4 hover:text-accent hover:underline"
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
