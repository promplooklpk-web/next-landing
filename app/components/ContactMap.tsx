import { shop } from "@/data/shop";
import { PrimaryButton, SecondaryButton } from "./Buttons";

export function ContactMap() {
  return (
    <section id="contact" className="bg-white">
      <div className="mx-auto max-w-[680px] px-6 py-24 text-center md:py-32">
        <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
          ติดต่อเรา
        </h2>
        <p className="mt-4 text-sm text-muted">{shop.location.address}</p>
        <p className="mt-2 text-sm text-muted">{shop.hours}</p>
        <p className="mt-2 text-sm text-muted">
          {shop.phone} · LINE {shop.line}
        </p>
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <PrimaryButton href={`tel:${shop.phoneTel}`} external>
            โทร {shop.phone}
          </PrimaryButton>
          <SecondaryButton href={shop.lineUrl} external>
            แชท LINE
          </SecondaryButton>
        </div>
        <a
          href={shop.location.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block text-xs text-muted underline-offset-4 transition hover:text-foreground hover:underline"
        >
          เปิดใน Google Maps →
        </a>
      </div>
    </section>
  );
}
