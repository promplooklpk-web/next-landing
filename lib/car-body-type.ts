import type { Car } from "@/data/cars";

export type CarBodyType = "pickup" | "sedan" | "suv";

const PICKUP_MODEL =
  /\b(hilux|d-?max|navara|revo|ranger|colorado|triton|bt-?50|carry|tiger)\b/i;
const SUV_MODEL =
  /\b(fortuner|cr-?v|hr-?v|x-?trail|tucson|rav4|mu-?x|everest|cx-?5|pajero|sportage|santa\s*fe|yaris\s*cross|corolla\s*cross|captiva|outlander|seltos|sorento|carnival)\b/i;

function carSearchText(car: Car): string {
  return [car.brand, car.model, car.description, car.highlights, ...car.features]
    .join(" ")
    .toLowerCase();
}

/** Classify inventory for category landing pages (heuristic; no fabricated body-type field). */
export function inferCarBodyType(car: Car): CarBodyType {
  const text = carSearchText(car);

  if (/กระบะท้าย|magic seat/i.test(text)) {
    return "sedan";
  }

  if (PICKUP_MODEL.test(text) || /กระบะ(?!ท้าย)/.test(carSearchText(car))) {
    return "pickup";
  }

  if (SUV_MODEL.test(text) || /\b7\s*ที่นั่ง\b/.test(text) || /\bsuv\b/i.test(text)) {
    return "suv";
  }

  return "sedan";
}

export function filterCarsByBodyType(cars: Car[], bodyType: CarBodyType): Car[] {
  return cars.filter((car) => inferCarBodyType(car) === bodyType);
}
