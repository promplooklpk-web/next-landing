"use client";

import { useMemo } from "react";
import { Car } from "@/data/cars";
import { useCarStore } from "@/contexts/CarStoreContext";
import { CarShowcasePanel } from "./CarShowcasePanel";

interface CarsSectionProps {
  /** Build-time inventory for static export when live Supabase is unavailable. */
  initialCars?: Car[];
}

export function CarsSection({ initialCars = [] }: CarsSectionProps) {
  const { cars, ready, loading, error } = useCarStore();

  const inventory = useMemo(() => {
    if (ready && !error) {
      return cars.filter((car) => !car.sold);
    }
    if (cars.length > 0) {
      return cars.filter((car) => !car.sold);
    }
    return initialCars.filter((car) => !car.sold);
  }, [cars, ready, error, initialCars]);

  if ((!ready || loading) && inventory.length === 0) {
    return (
      <div id="cars" className="py-24 text-center text-sm text-muted">
        กำลังโหลดรถในร้าน...
      </div>
    );
  }

  if (ready && error && inventory.length === 0) {
    return (
      <div id="cars" className="py-24 text-center text-sm text-muted">
        โหลดรถไม่สำเร็จ — กรุณาลองใหม่ภายหลัง
      </div>
    );
  }

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
