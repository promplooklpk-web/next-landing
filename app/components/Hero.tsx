import Link from "next/link";
import { shop } from "@/data/shop";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(232,93,4,0.15),_transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-white/70">📍 {shop.location.city}, ประเทศไทย</p>
          <h1 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
            {shop.name}
          </h1>
          <p className="mt-4 text-lg text-white/80 md:text-xl">{shop.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#cars"
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-dark"
            >
              ดูรถในร้าน
            </Link>
            <a
              href={`tel:${shop.phoneTel}`}
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold transition hover:bg-white/10"
            >
              โทร {shop.phone}
            </a>
          </div>
          <p className="mt-6 text-sm text-white/60">เปิดทำการ {shop.hours}</p>
        </div>
      </div>
    </section>
  );
}
