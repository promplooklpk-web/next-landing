import Image from "next/image";
import Link from "next/link";
import { Car, formatMileage, formatPrice } from "@/data/cars";

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition hover:shadow-md">
      <Link href={`/cars/${car.slug}/`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-muted">
          <Image
            src={car.image}
            alt={`${car.brand} ${car.model} ${car.year}`}
            fill
            className="object-cover transition group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {car.sold && (
            <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-lg font-bold text-white">
              ขายแล้ว
            </span>
          )}
          {car.featured && !car.sold && (
            <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
              แนะนำ
            </span>
          )}
        </div>
        <div className="p-4">
          <p className="text-xs font-medium text-muted">{car.brand}</p>
          <h3 className="mt-1 font-bold text-foreground">{car.model}</h3>
          <p className="mt-1 text-sm text-muted">
            ปี {car.year} · {formatMileage(car.mileage)}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <p className="text-lg font-bold text-accent">
              ฿{formatPrice(car.price)}
            </p>
            <span className="text-xs text-muted">{car.transmission}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
