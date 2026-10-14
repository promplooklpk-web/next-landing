"use client";

import { useMemo } from "react";
import { useCarStore } from "@/contexts/CarStoreContext";
import { buildInventoryStats, InventoryStat } from "@/lib/inventory-stats";
import { AnimateIn } from "./AnimateIn";
import { CountUp } from "./CountUp";

interface StatsSectionProps {
  /** Build-time inventory stats (static export); live store overrides when ready. */
  initialStats: InventoryStat[];
}

export function StatsSection({ initialStats }: StatsSectionProps) {
  const { cars, ready, error } = useCarStore();

  const stats = useMemo((): InventoryStat[] => {
    if (ready && !error && cars.length > 0) {
      const live = buildInventoryStats(cars);
      if (live.length > 0) return live;
    }
    return initialStats;
  }, [cars, ready, error, initialStats]);

  if (stats.length === 0) {
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
