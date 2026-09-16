"use client";

import { useCarStore } from "@/contexts/CarStoreContext";
import { shop } from "@/data/shop";
import { homeHash } from "@/lib/navigation";
import {
  CategorySlug,
  filterCarsByCategory,
  VEHICLE_CATEGORIES,
} from "@/lib/vehicle-category";
import { PrimaryButton } from "./Buttons";
import { CarCard } from "./CarCard";

interface CategoryInventorySectionProps {
  category: CategorySlug;
}

export function CategoryInventorySection({ category }: CategoryInventorySectionProps) {
  const config = VEHICLE_CATEGORIES[category];
  const { cars, ready, loading, error } = useCarStore();

  const emptyMessage =
    `ขณะนี้ยังไม่มีรถ${config.chipLabel}ว่างในเว็บ — สต็อกเปลี่ยนบ่อย โทร ${shop.phone} ` +
    `เพื่อสอบถามรถที่กำลังจะเข้าหรือนัดดูรถที่โชว์รูมตำบลชมพู`;

  return (
    <section className="border-t border-border bg-background" aria-labelledby="category-inventory">
      <div className="mx-auto max-w-[1400px] px-6 py-14 md:py-16">
        <h2 id="category-inventory" className="text-lg font-medium tracking-tight md:text-xl">
          รถ{config.chipLabel}ที่พร้อมขาย
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
        ) : (() => {
          const available = filterCarsByCategory(cars, category);
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
            <ul className="mt-8 grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {available.map((car) => (
                <li key={car.slug}>
                  <CarCard car={car} />
                </li>
              ))}
            </ul>
          );
        })()}
      </div>
    </section>
  );
}
