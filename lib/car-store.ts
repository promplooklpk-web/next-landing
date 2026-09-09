import { Car } from "@/data/cars";

export function generateSlug(brand: string, model: string, year: number): string {
  const base = `${brand}-${model}-${year}`
    .toLowerCase()
    .replace(/\./g, "")
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
