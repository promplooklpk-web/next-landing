"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { CarCard } from "../components/CarCard";
import { CarFilters, FilterState } from "../components/CarFilters";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { MobileFloatingCTA } from "../components/MobileFloatingCTA";
import { cars } from "@/data/cars";

function CarsListing() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterState>({
    brand: searchParams.get("brand") ?? "",
    maxPrice: searchParams.get("maxPrice") ?? "",
    transmission: searchParams.get("transmission") ?? "",
    minYear: searchParams.get("minYear") ?? "",
  });

  const filtered = useMemo(() => {
    return cars.filter((car) => {
      if (filters.brand && car.brand !== filters.brand) return false;
      if (filters.maxPrice && car.price > Number(filters.maxPrice)) return false;
      if (filters.transmission && car.transmission !== filters.transmission) return false;
      if (filters.minYear && car.year < Number(filters.minYear)) return false;
      return true;
    });
  }, [filters]);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <h1 className="text-2xl font-bold text-navy md:text-3xl">รถทั้งหมด</h1>
        <p className="mt-2 text-muted">เลือกรถมือสองคุณภาพดีในลำปาง</p>
        <div className="mt-8">
          <CarFilters
            filters={filters}
            onChange={setFilters}
            resultCount={filtered.length}
          />
        </div>
        {filtered.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((car) => (
              <CarCard key={car.slug} car={car} />
            ))}
          </div>
        ) : (
          <div className="mt-12 text-center text-muted">
            <p className="text-lg">ไม่พบรถที่ตรงกับเงื่อนไข</p>
            <p className="mt-2 text-sm">ลองปรับตัวกรองหรือติดต่อเราเพื่อสอบถาม</p>
          </div>
        )}
      </main>
      <Footer />
      <MobileFloatingCTA />
    </>
  );
}

export default function CarsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">กำลังโหลด...</div>}>
      <CarsListing />
    </Suspense>
  );
}
