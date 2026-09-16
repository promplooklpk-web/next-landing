import { Car, formatMileage, formatPrice } from "@/data/cars";
import { carDetailPath } from "@/lib/car-routes";
import { AppLink } from "./AppLink";

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  const cover = car.images[0];
  const title = `${car.brand} ${car.model}`;

  return (
    <article
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-surface-raised transition hover:border-accent/40"
    >
      <AppLink
        href={carDetailPath(car.slug)}
        className="relative aspect-[4/3] overflow-hidden bg-near-black"
      >
        {cover ? (
          <img
            src={cover}
            alt={title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-muted">
            ไม่มีรูป
          </div>
        )}
        {car.status !== "ว่าง" && (
          <span className="absolute left-3 top-3 rounded-md bg-black/70 px-2 py-1 text-[11px] font-medium text-white">
            {car.status}
          </span>
        )}
      </AppLink>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h2 className="text-base font-medium tracking-tight">
          <AppLink href={carDetailPath(car.slug)} className="hover:text-accent">
            {title}
          </AppLink>
        </h2>
        <p className="text-sm text-muted">
          ปี {car.year} · {formatMileage(car.mileage)}
        </p>
        <p className="text-lg font-medium text-accent">
          ฿{formatPrice(car.price)}
        </p>
        <AppLink
          href={carDetailPath(car.slug)}
          className="mt-auto text-xs font-medium text-foreground/80 transition hover:text-accent"
        >
          ดูรายละเอียด →
        </AppLink>
      </div>
    </article>
  );
}
