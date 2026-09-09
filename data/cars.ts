export type Transmission = "ออโต้" | "เกียร์ธรรมดา";
export type FuelType = "เบนซิน" | "ดีเซล" | "ไฮบริด";

export interface Car {
  slug: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  transmission: Transmission;
  fuel: FuelType;
  color: string;
  engine: string;
  description: string;
  features: string[];
  image: string;
  sold: boolean;
  featured: boolean;
}

export const cars: Car[] = [
  {
    slug: "toyota-camry-2019-hybrid",
    brand: "Toyota",
    model: "Camry 2.5 Hybrid",
    year: 2019,
    price: 789000,
    mileage: 68000,
    transmission: "ออโต้",
    fuel: "ไฮบริด",
    color: "ขาวมุก",
    engine: "2.5L Hybrid",
    description:
      "Toyota Camry Hybrid ปี 2019 สภาพสวยมาก ประวัติศูนย์ครบ ภายในสะอาด นั่งสบาย เหมาะสำหรับครอบครัวและใช้งานประจำ ประหยัดน้ำมันดีเยี่ยม",
    features: [
      "กล้องมองหลัง",
      "เซ็นเซอร์รอบคัน",
      "Apple CarPlay",
      "ที่นั่งหนัง",
      "Keyless Entry",
      "ABS / VSC",
    ],
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80",
    sold: false,
    featured: true,
  },
  {
    slug: "honda-civic-2020-turbo",
    brand: "Honda",
    model: "Civic 1.5 Turbo",
    year: 2020,
    price: 649000,
    mileage: 52000,
    transmission: "ออโต้",
    fuel: "เบนซิน",
    color: "เทาเมทัลลิก",
    engine: "1.5L Turbo",
    description:
      "Honda Civic Turbo สปอร์ตซีดาน ขับสนุก แรงดี สภาพภายใน-ภายนอกสวย ไมล์น้อย ดูแลรักษาดี",
    features: [
      "Honda Sensing",
      "หลังคา Sunroof",
      "Apple CarPlay / Android Auto",
      "ที่นั่งหนัง",
      "กล้องมองหลัง",
      "เครื่องเสียงพรีเมียม",
    ],
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
    sold: false,
    featured: true,
  },
  {
    slug: "toyota-fortuner-2018-diesel",
    brand: "Toyota",
    model: "Fortuner 2.4 V",
    year: 2018,
    price: 899000,
    mileage: 95000,
    transmission: "ออโต้",
    fuel: "ดีเซล",
    color: "ดำ",
    engine: "2.4L Diesel",
    description:
      "Toyota Fortuner 7 ที่นั่ง ดีเซลประหยัด ขับดี สมรรถนะเยี่ยม เหมาะครอบครัวใหญ่และเดินทางไกล",
    features: [
      "7 ที่นั่ง",
      "กล้อง 360 องศา",
      "ที่นั่งหนัง",
      "Apple CarPlay",
      "เซ็นเซอร์รอบคัน",
      "ช่วงล่างสบาย",
    ],
    image: "https://images.unsplash.com/photo-1519641471654-76ce1117a167?w=800&q=80",
    sold: false,
    featured: true,
  },
  {
    slug: "toyota-vios-2021",
    brand: "Toyota",
    model: "Vios 1.5 Entry",
    year: 2021,
    price: 389000,
    mileage: 38000,
    transmission: "ออโต้",
    fuel: "เบนซิน",
    color: "ขาว",
    engine: "1.5L",
    description:
      "Toyota Vios ปี 2021 ไมล์น้อย ประหยัดน้ำมัน ดูแลง่าย เหมาะมือใหม่และใช้งานในเมือง",
    features: [
      "กล้องมองหลัง",
      "Bluetooth",
      "เซ็นเซอร์ถอยหลัง",
      "ABS / EBD",
      "แอร์อัตโนมัติ",
      "ประหยัดน้ำมัน",
    ],
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
    sold: false,
    featured: true,
  },
  {
    slug: "honda-jazz-2019",
    brand: "Honda",
    model: "Jazz 1.5 i-VTEC",
    year: 2019,
    price: 359000,
    mileage: 72000,
    transmission: "ออโต้",
    fuel: "เบนซิน",
    color: "แดง",
    engine: "1.5L i-VTEC",
    description:
      "Honda Jazz กระบะท้าย Magic Seat จุของได้มาก คล่องตัวในเมือง ประหยัดน้ำมัน",
    features: [
      "Magic Seat",
      "กล้องมองหลัง",
      "Apple CarPlay",
      "เซ็นเซอร์ถอยหลัง",
      "ที่นั่งผ้า",
      "คล่องตัว",
    ],
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80",
    sold: false,
    featured: false,
  },
  {
    slug: "isuzu-dmax-2020-z",
    brand: "Isuzu",
    model: "D-Max 1.9 Z",
    year: 2020,
    price: 749000,
    mileage: 88000,
    transmission: "ออโต้",
    fuel: "ดีเซล",
    color: "เงิน",
    engine: "1.9L Diesel",
    description:
      "Isuzu D-Max รุ่น Z ดีเซลแรงทนทาน กระบะใหญ่ เหมาะงานหนักและเดินทางทุกสภาพถนน",
    features: [
      "กล้องมองหลัง",
      "Apple CarPlay",
      "ที่นั่งหนัง",
      "เซ็นเซอร์รอบคัน",
      "กระบะบรรทุกใหญ่",
      "ดีเซลประหยัด",
    ],
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80",
    sold: false,
    featured: false,
  },
  {
    slug: "nissan-navara-2019-calibre",
    brand: "Nissan",
    model: "Navara 2.3 Calibre",
    year: 2019,
    price: 699000,
    mileage: 102000,
    transmission: "ออโต้",
    fuel: "ดีเซล",
    color: "น้ำเงิน",
    engine: "2.3L Diesel",
    description:
      "Nissan Navara Calibre กระบะนั่งสบาย ดีเซลแรง สมรรถนะดี เหมาะทั้งใช้งานและครอบครัว",
    features: [
      "กล้องมองหลัง",
      "ที่นั่งหนัง",
      "Bluetooth",
      "เซ็นเซอร์ถอยหลัง",
      "กระบะกว้าง",
      "ช่วงล่างนุ่ม",
    ],
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80",
    sold: true,
    featured: false,
  },
  {
    slug: "toyota-hilux-2018-revo",
    brand: "Toyota",
    model: "Hilux Revo 2.4 E",
    year: 2018,
    price: 629000,
    mileage: 115000,
    transmission: "เกียร์ธรรมดา",
    fuel: "ดีเซล",
    color: "ขาว",
    engine: "2.4L Diesel",
    description:
      "Toyota Hilux Revo เกียร์ธรรมดา ดีเซลทนทาน ซ่อมบำรุงง่าย เหมาะงานหนักและใช้งานจริง",
    features: [
      "กระบะโลหะ",
      "แอร์",
      "ABS",
      "ดีเซลประหยัด",
      "ซ่อมบำรุงง่าย",
      "ทนทาน",
    ],
    image: "https://images.unsplash.com/photo-1559419181-3d5444c36a79?w=800&q=80",
    sold: false,
    featured: false,
  },
];

export const brands = [...new Set(cars.map((c) => c.brand))].sort();

export function getCarBySlug(slug: string): Car | undefined {
  return cars.find((c) => c.slug === slug);
}

export function getFeaturedCars(): Car[] {
  return cars.filter((c) => c.featured && !c.sold);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("th-TH").format(price);
}

export function formatMileage(km: number): string {
  return `${new Intl.NumberFormat("th-TH").format(km)} กม.`;
}
