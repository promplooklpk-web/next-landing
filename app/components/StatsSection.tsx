"use client";

import { useMemo } from "react";
import { useCarStore } from "@/contexts/CarStoreContext";
import { getCarBodyType } from "@/lib/vehicle-category";
import { AnimateIn } from "./AnimateIn";
import { CountUp } from "./CountUp";

interface StatItem {
  label: string;
  value: number;
  suffix?: string;
}

export function StatsSection() {
  const { cars, ready, loading, error } = useCarStore();

  const stats = useMemo((): StatItem[] => {
    const available = cars.filter((car) => !car.sold);
    if (available.length === 0) return [];

    const brands = new Set(available.map((car) => car.brand));
    const bodyTypes = new Set(available.map((car) => getCarBodyType(car)));
    const items: StatItem[] = [
      { label: "รถพร้อมขาย", value: available.length, suffix: "คัน" },
      { label: "ยี่ห้อในสต็อก", value: brands.size, suffix: "ยี่ห้อ" },
    ];

    if (bodyTypes.size > 1) {
      items.push({
        label: "ประเภทที่มีในร้าน",
        value: bodyTypes.size,
        suffix: "ประเภท",
      });
    }

    return items;
  }, [cars]);

  if (!ready || loading || error || stats.length === 0) {
    return null;
  }

  return (
    <section
      className="border-b border-border bg-surface py-14 md:py-16"
      aria-label="สถิติสตอกรถในร้าน"
    >
      <AnimateIn className="mx-auto max-w-[900px] px-6" stagger>
        <ul
          className={`grid list-none gap-4 md:gap-6 ${
            stats.length >= 3 ? "sm:grid-cols-2 md:grid-cols-3" : "sm:grid-cols-2"
          }`}
        >
          {stats.map((stat) => (
            <li
              key={stat.label}
              className="stagger-item rounded-lg border border-border bg-surface-raised p-6 text-center"
            >
              <p className="text-3xl font-medium tracking-tight text-accent md:text-4xl">
                <CountUp value={stat.value} />
                {stat.suffix ? (
                  <span className="ml-1 text-base font-medium text-accent/80 md:text-lg">
                    {stat.suffix}
                  </span>
                ) : null}
              </p>
              <p className="mt-2 text-xs font-medium text-muted md:text-sm">
                {stat.label}
              </p>
            </li>
          ))}
        </ul>
      </AnimateIn>
    </section>
  );
}
