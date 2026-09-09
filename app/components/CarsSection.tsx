import { cars } from "@/data/cars";
import { CarCard } from "./CarCard";

export function CarsSection() {
  const inventory = cars.filter((car) => !car.sold);

  return (
    <section id="cars" className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <h2 className="text-2xl font-bold text-navy md:text-3xl">รถในร้าน</h2>
      <p className="mt-2 text-muted">รถมือสองคุณภาพดี พร้อมขายในลำปาง</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {inventory.map((car) => (
          <CarCard key={car.slug} car={car} />
        ))}
      </div>
    </section>
  );
}
