"use client";

import { useCarStore } from "@/contexts/CarStoreContext";
import type { CarBodyType } from "@/lib/car-body-type";
import { filterCarsByBodyType } from "@/lib/car-body-type";
import { shop } from "@/data/shop";
import { homeHash } from "@/lib/navigation";
import { PrimaryButton } from "./Buttons";
import { CategoryCarCard } from "./CategoryCarCard";

interface CategoryInventorySectionProps {
  bodyType: CarBodyType;
  inventoryHeading: string;
  emptyMessage: string;
}

export function CategoryInventorySection({
  bodyType,
  inventoryHeading,
  emptyMessage,
}: CategoryInventorySectionProps) {
  const { cars, ready, loading, error } = useCarStore();

  return (
    <section className="border-t border-border bg-background" aria-labelledby="category-inventory">
      <div className="mx-auto max-w-[1200px] px-6 py-16 md:py-20">
        <h2 id="category-inventory" className="text-2xl font-medium tracking-tight md:text-3xl">
          {inventoryHeading}
        </h2>

        {!ready || loading ? (
          <p className="mt-8 text-sm text-muted">กำลังโหลดรถในหมวดนี้...</p>
        ) : error ? (
          <p className="mt-8 text-sm text-muted">
            โหลดรายการรถไม่สำเร็จ — โทร{" "}
            <a href={`tel:${shop.phoneTel}`} className="text-accent hover:underline">
              {shop.phone}
            </a>{" "}
            เพื่อสอบถามสต็อกล่าสุด
          </p>
        ) : (
          (() => {
            const available = filterCarsByBodyType(cars, bodyType).filter((c) => !c.sold);
            if (available.length === 0) {
              return (
                <div className="mt-8 rounded-lg border border-border bg-surface px-6 py-10 text-center">
                  <p className="text-sm leading-relaxed text-muted">{emptyMessage}</p>
                  <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <PrimaryButton href={`tel:${shop.phoneTel}`} external>
                      โทร {shop.phone}
                    </PrimaryButton>
                    <PrimaryButton href={homeHash("cars")}>ดูรถทั้งหมดในหน้าแรก</PrimaryButton>
                  </div>
                </div>
              );
            }

            return (
              <ul className="mt-10 grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {available.map((car) => (
                  <li key={car.slug}>
                    <CategoryCarCard car={car} />
                  </li>
                ))}
              </ul>
            );
          })()
        )}
      </div>
    </section>
  );
}
