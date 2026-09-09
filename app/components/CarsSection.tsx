"use client";

import { useCarStore } from "@/contexts/CarStoreContext";
import { CarShowcasePanel } from "./CarShowcasePanel";

export function CarsSection() {
  const { cars } = useCarStore();

  const inventory = cars.filter((car) => !car.sold);

  if (inventory.length === 0) {
    return (
      <div id="cars" className="py-24 text-center text-sm text-muted">
        ยังไม่มีรถในร้าน
      </div>
    );
  }

  return (
    <div id="cars">
      {inventory.map((car, index) => (
        <CarShowcasePanel key={car.slug} car={car} index={index} />
      ))}
    </div>
  );
}
