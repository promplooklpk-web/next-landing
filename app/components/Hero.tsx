import Image from "next/image";
import Link from "next/link";
import { shop } from "@/data/shop";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80";

export function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] w-full">
      <Image
        src={HERO_IMAGE}
        alt=""
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 pt-20 text-center text-white md:pb-32">
        <h1 className="max-w-3xl text-4xl font-medium tracking-tight md:text-6xl">
          {shop.name}
        </h1>
        <p className="mt-4 max-w-lg text-sm font-normal text-white/85 md:text-base">
          {shop.tagline}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Link
            href="#cars"
            className="inline-flex min-w-[200px] items-center justify-center bg-white px-8 py-2.5 text-[13px] font-medium tracking-wide text-near-black transition hover:bg-white/90"
          >
            ดูรถในร้าน
          </Link>
          <a
            href="#contact"
            className="inline-flex min-w-[200px] items-center justify-center border border-white/70 bg-transparent px-8 py-2.5 text-[13px] font-medium tracking-wide text-white transition hover:bg-white/10"
          >
            ติดต่อเรา
          </a>
        </div>
        <p className="mt-6 text-xs text-white/60">{shop.location.city} · {shop.hours}</p>
      </div>
    </section>
  );
}
