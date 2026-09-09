import { Car, cars as seedCars } from "@/data/cars";

export const STORAGE_KEY = "lampangcars-inventory-v1";

export function loadCars(): Car[] {
  if (typeof window === "undefined") return seedCars;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seedCars));
      return seedCars;
    }
    const parsed = JSON.parse(raw) as Car[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : seedCars;
  } catch {
    return seedCars;
  }
}

export function saveCars(cars: Car[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
}

export function resetCars(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seedCars));
}

export function generateSlug(brand: string, model: string, year: number): string {
  const base = `${brand}-${model}-${year}`
    .toLowerCase()
    .replace(/[^a-z0-9ก-๙]+/gi, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return base || `car-${Date.now()}`;
}

export function statusToSold(status: Car["status"]): boolean {
  return status === "ขายแล้ว";
}

export function emptyCar(): Omit<Car, "slug"> & { slug?: string } {
  return {
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    price: 0,
    mileage: 0,
    transmission: "ออโต้",
    fuel: "เบนซิน",
    color: "",
    engine: "",
    description: "",
    highlights: "",
    features: [],
    images: [],
    status: "ว่าง",
    sold: false,
    featured: false,
  };
}
