import Link from "next/link";
import { getFeaturedCars } from "@/data/cars";
import { CarCard } from "./CarCard";

export function FeaturedCars() {
  const featured = getFeaturedCars();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-navy md:text-3xl">รถแนะนำ</h2>
          <p className="mt-2 text-muted">คัดสรรรถคุณภาพดี ราคาดี ในลำปาง</p>
        </div>
        <Link
          href="/cars/"
          className="hidden text-sm font-semibold text-accent hover:underline md:block"
        >
          ดูทั้งหมด →
        </Link>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((car) => (
          <CarCard key={car.slug} car={car} />
        ))}
      </div>
      <div className="mt-6 text-center md:hidden">
        <Link
          href="/cars/"
          className="text-sm font-semibold text-accent hover:underline"
        >
          ดูรถทั้งหมด →
        </Link>
      </div>
    </section>
  );
}
