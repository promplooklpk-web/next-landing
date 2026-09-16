"use client";

import { Car, formatMileage, formatPrice } from "@/data/cars";
import { carDetailPath } from "@/lib/car-routes";
import { AppLink } from "./AppLink";

export function CategoryCarCard({ car }: { car: Car }) {
  const cover = car.images[0];

  return (
    <article className="group overflow-hidden rounded-lg border border-border bg-surface-raised transition hover:border-accent/40">
      <AppLink href={carDetailPath(car.slug)} className="block">
        <div className="aspect-[16/10] overflow-hidden bg-near-black">
          {cover ? (
            <img
              src={cover}
              alt={`${car.brand} ${car.model} ปี ${car.year}`}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-muted">
              ไม่มีรูป
            </div>
          )}
        </div>
        <div className="p-4 md:p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-accent">
            {car.brand}
          </p>
          <h3 className="mt-1 text-lg font-medium tracking-tight text-foreground">
            {car.model}
          </h3>
          <p className="mt-2 text-sm text-muted">
            ฿{formatPrice(car.price)} · ปี {car.year} · {formatMileage(car.mileage)}
          </p>
          {car.highlights ? (
            <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-foreground/80">
              {car.highlights}
            </p>
          ) : null}
          <span className="mt-3 inline-block text-xs font-medium text-accent">
            ดูรายละเอียด →
          </span>
        </div>
      </AppLink>
    </article>
  );
}
