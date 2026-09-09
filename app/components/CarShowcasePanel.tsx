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
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/5" />
      <AnimateIn
        stagger
        className="absolute inset-0 flex flex-col items-center justify-end pb-16 pt-20 text-center text-white md:pb-20"
        delay={index * 100}
      >
        <p className="stagger-item text-xs font-medium uppercase tracking-[0.2em] text-white/80">
          {car.brand}
        </p>
        <h2 className="stagger-item mt-2 text-3xl font-medium tracking-tight md:text-5xl">
          {car.model}
        </h2>
        <p className="stagger-item mt-3 text-sm text-white/90">
          ฿{formatPrice(car.price)} · ปี {car.year} · {formatMileage(car.mileage)}
        </p>
        <div className="stagger-item mt-8 flex w-full max-w-md flex-col gap-3 px-6 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4 sm:px-0">
          <PrimaryButton href={`/cars/${car.slug}/`} overlay>
            ดูรายละเอียด
          </PrimaryButton>
          <SecondaryButton href="#contact" overlay>
            ติดต่อ
          </SecondaryButton>
        </div>
      </AnimateIn>
    </section>
  );
}
