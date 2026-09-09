"use client";

import { Car } from "@/data/cars";
import { useCarStore } from "@/contexts/CarStoreContext";
import { CarDetailView } from "./CarDetailView";

interface CarDetailPageClientProps {
  slug: string;
  fallback: Car;
}

export function CarDetailPageClient({ slug, fallback }: CarDetailPageClientProps) {
  const { getCar, ready } = useCarStore();
  const car = ready ? (getCar(slug) ?? fallback) : fallback;

  return <CarDetailView car={car} />;
}
