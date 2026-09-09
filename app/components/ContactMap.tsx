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
      </div>
      <div className="relative h-[50vh] min-h-[320px] w-full bg-surface">
        <iframe
          title="แผนที่ลำปางคาร์มือสอง"
          src={`https://maps.google.com/maps?q=${shop.location.lat},${shop.location.lng}&z=14&output=embed`}
          className="absolute inset-0 h-full w-full border-0 grayscale-[30%]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
