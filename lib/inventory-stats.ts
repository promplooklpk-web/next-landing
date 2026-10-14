import { Car } from "@/data/cars";
import { getCarBodyType } from "@/lib/vehicle-category";

export interface InventoryStat {
  label: string;
  value: number;
  suffix?: string;
}

/** Honest inventory-derived stats only — omit when nothing is available. */
export function buildInventoryStats(cars: Car[]): InventoryStat[] {
  const available = cars.filter((car) => !car.sold);
  if (available.length === 0) return [];

  const brands = new Set(available.map((car) => car.brand));
  const bodyTypes = new Set(available.map((car) => getCarBodyType(car)));

  const items: InventoryStat[] = [
    { label: "รถพร้อมขาย", value: available.length, suffix: "คัน" },
    { label: "ยี่ห้อในสต็อก", value: brands.size, suffix: "ยี่ห้อ" },
  ];

  if (bodyTypes.size > 1) {
    items.push({
      label: "ประเภทที่มีในร้าน",
      value: bodyTypes.size,
      suffix: "ประเภท",
    });
  }

  return items;
}
