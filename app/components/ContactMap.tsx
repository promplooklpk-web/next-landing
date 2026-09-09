import { shop } from "@/data/shop";

export function ContactMap() {
  return (
    <section id="contact" className="bg-surface-muted py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-center text-2xl font-bold text-navy md:text-3xl">
          ติดต่อเรา
        </h2>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h3 className="font-bold text-lg">{shop.name}</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li className="flex gap-2">
                <span>📍</span>
                <span>{shop.location.address}</span>
              </li>
              <li className="flex gap-2">
                <span>🕐</span>
                <span>{shop.hours}</span>
              </li>
              <li className="flex gap-2">
                <span>📞</span>
                <a href={`tel:${shop.phoneTel}`} className="text-accent hover:underline">
                  {shop.phone}
                </a>
              </li>
              <li className="flex gap-2">
                <span>💬</span>
                <a href={shop.lineUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  LINE {shop.line}
                </a>
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`tel:${shop.phoneTel}`}
                className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-dark"
              >
                โทรเลย
              </a>
              <a
                href={shop.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#06C755] px-5 py-2.5 text-sm font-semibold text-white"
              >
                แชท LINE
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border">
            <iframe
              title="แผนที่ลำปางคาร์มือสอง"
              src={`https://maps.google.com/maps?q=${shop.location.lat},${shop.location.lng}&z=14&output=embed`}
              className="h-64 w-full border-0 lg:h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
