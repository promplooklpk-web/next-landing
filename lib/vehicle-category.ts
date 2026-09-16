import { Car, VehicleBodyType } from "@/data/cars";

export type { VehicleBodyType };

export type CategorySlug = VehicleBodyType;

export interface VehicleCategoryConfig {
  slug: CategorySlug;
  path: `/${CategorySlug}/`;
  h1: string;
  title: string;
  description: string;
  intro: string[];
  chipLabel: string;
}

export const VEHICLE_CATEGORIES: Record<CategorySlug, VehicleCategoryConfig> = {
  pickup: {
    slug: "pickup",
    path: "/pickup/",
    h1: "รถกระบะมือสองลำปาง",
    title: "รถกระบะมือสองลำปาง",
    description:
      "รถกระบะมือสองลำปาง คัดสภาพ ราคายุติธรรม ที่เต็นรถบ้านต้า ตำบลชมพู อำเภอเมือง นัดดูรถและทดลองขับได้ โทร 087-173-0471",
    intro: [
      "กำลังมองหารถกระบะมือสองในลำปางสำหรับงานหนัก ขนของ หรือใช้ในครอบครัว? เต็นรถบ้านต้าคัดรถกระบะที่ตรวจสภาพแล้ว อธิบายประวัติและราคาตรงไปตรงมา ไม่โอ้อวดจำนวนรถในสต็อก",
      "ร้านตั้งอยู่ 577 หมู่ 10 ตำบลชมพู อำเภอเมือง จังหวัดลำปาง ลูกค้าในเมืองลำปางและพื้นที่ใกล้เคียงสามารถโทรนัดดูรถหรือดูรายการรถทั้งหมดบนหน้าแรกของเว็บไซต์ได้ตลอด",
    ],
    chipLabel: "กระบะ",
  },
  sedan: {
    slug: "sedan",
    path: "/sedan/",
    h1: "รถเก๋งมือสองลำปาง",
    title: "รถเก๋งมือสองลำปาง",
    description:
      "รถเก๋งมือสองลำปาง เก๋งและแฮทช์แบ็กคุณภาพ ที่เต็นรถบ้านต้า โซนชมพูเมืองลำปาง ดูรถจริง ทดลองขับ โทร 087-173-0471",
    intro: [
      "รถเก๋งมือสองเหมาะกับการเดินทางในเมืองลำปางและใช้งานประจำวัน เต็นรถบ้านต้ารวบรวมเก๋งและแฮทช์แบ็กหลายรุ่น เน้นสภาพจริง ไมล์ และประวัติที่ตรวจสอบได้ก่อนส่งมอบ",
      "หากยังไม่แน่ใจรุ่นไหนเหมาะกับคุณ โทรปรึกษาหรือเลื่อนดูรถทั้งหมดในหน้าแรก เราช่วยแนะนำตามงบและการใช้งานโดยไม่กดดันให้ตัดสินใจ",
    ],
    chipLabel: "เก๋ง",
  },
  suv: {
    slug: "suv",
    path: "/suv/",
    h1: "รถ SUV มือสองลำปาง",
    title: "รถ SUV มือสองลำปาง",
    description:
      "รถ SUV มือสองลำปาง 7 ที่นั่งและครอสโอเวอร์ ที่เต็นรถบ้านต้า ลำปาง ตรวจสภาพก่อนขาย โทรนัดดูรถ 087-173-0471",
    intro: [
      "รถ SUV มือสองช่วยให้ครอบครัวในลำปางเดินทางสบายขึ้น ทั้งในเมืองและทางไกล เต็นรถบ้านต้าเลือก SUV ที่สภาพพร้อมใช้งาน แจ้งรายละเอียดราคาและเลขไมล์ชัดเจนในแต่ละคัน",
      "สนใจ SUV รุ่นใดเป็นพิเศษ โทรสอบถามได้ หรือกลับไปดูรถทุกประเภทในหน้าแรกของเว็บไซต์เพื่อเปรียบเทียบก่อนนัดมาที่โชว์รูม",
    ],
    chipLabel: "SUV",
  },
};

const PICKUP_MODEL =
  /\b(d-?max|hilux|navara|ranger|colorado|triton|carry)\b/i;
const SUV_MODEL =
  /\b(fortuner|everest|cr-?v|hr-?v|cx-?[35]|pajero|x-?trail|tucson|creta|santa\s*fe|yaris\s*cross|corolla\s*cross|mu-?x|trailblazer)\b/i;

/** Resolve body type from stored field or model heuristics (Supabase rows without body_type). */
export function getCarBodyType(car: Car): VehicleBodyType {
  if (car.bodyType) return car.bodyType;
  const haystack = `${car.brand} ${car.model} ${car.engine}`;
  if (PICKUP_MODEL.test(haystack)) return "pickup";
  if (SUV_MODEL.test(haystack)) return "suv";
  return "sedan";
}

export function filterCarsByCategory(
  cars: Car[],
  category: CategorySlug,
  availableOnly = true
): Car[] {
  return cars.filter((car) => {
    if (availableOnly && car.sold) return false;
    return getCarBodyType(car) === category;
  });
}

export const CATEGORY_SLUGS: CategorySlug[] = ["pickup", "sedan", "suv"];
