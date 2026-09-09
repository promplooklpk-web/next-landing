"use client";

import { Car, formatMileage, formatPrice } from "@/data/cars";
import { AnimateIn } from "./AnimateIn";
import { PrimaryButton, SecondaryButton } from "./Buttons";

interface CarShowcasePanelProps {
  car: Car;
  index: number;
}

export function CarShowcasePanel({ car, index }: CarShowcasePanelProps) {
  const cover = car.images[0];

  return (
    <section className="relative h-[85vh] min-h-[520px] w-full overflow-hidden">
      <img
        src={cover}
        alt=""
        className="panel-ken-burns absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
      <AnimateIn className="absolute inset-0 flex flex-col items-center justify-end pb-16 pt-20 text-center text-white md:pb-20" delay={index * 80}>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/70">
          {car.brand}
        </p>
        <h2 className="mt-2 text-3xl font-medium tracking-tight md:text-5xl">
          {car.model}
        </h2>
        <p className="mt-3 text-sm text-white/80">
          ฿{formatPrice(car.price)} · ปี {car.year} · {formatMileage(car.mileage)}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <PrimaryButton href={`/cars/${car.slug}/`}>ดูรายละเอียด</PrimaryButton>
          <SecondaryButton href="#contact" dark>ติดต่อ</SecondaryButton>
        </div>
      </AnimateIn>
    </section>
  );
}
