export type Transmission = "ออโต้" | "เกียร์ธรรมดา";
export type FuelType = "เบนซิน" | "ดีเซล" | "ไฮบริด";
export type CarStatus = "ว่าง" | "จอง" | "ขายแล้ว";

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
  highlights: string;
  features: string[];
  images: string[];
  status: CarStatus;
  sold: boolean;
  featured: boolean;
}

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80`;

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
    highlights: "ประวัติศูนย์ครบ ไมล์น้อย ประหยัดน้ำมัน",
    features: [
      "กล้องมองหลัง",
      "เซ็นเซอร์รอบคัน",
      "Apple CarPlay",
      "ที่นั่งหนัง",
      "Keyless Entry",
      "ABS / VSC",
    ],
    images: [
      img("1621007947382-bb3c3994e3fb"),
      img("1494976688670-7e7c697a28b2"),
      img("1503376780353-7e6692767b70"),
      img("1580273916550-e896d97eb94d"),
      img("1618843479313-40f8afb4b4d8"),
    ],
    status: "ว่าง",
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
    highlights: "Turbo แรงดี สภาพสวย ไมล์น้อย",
    features: [
      "Honda Sensing",
      "หลังคา Sunroof",
      "Apple CarPlay / Android Auto",
      "ที่นั่งหนัง",
      "กล้องมองหลัง",
      "เครื่องเสียงพรีเมียม",
    ],
    images: [
      img("1606664515524-ed2f786a0bd6"),
      img("1555215695-3004980ad54e"),
      img("1502877338535-766e1452684a"),
      img("1485291571151-792b9749f2b0"),
      img("1619767886558-efdc259cde1a"),
    ],
    status: "ว่าง",
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
    highlights: "7 ที่นั่ง ดีเซลประหยัด สมรรถนะดี",
    features: [
      "7 ที่นั่ง",
      "กล้อง 360 องศา",
      "ที่นั่งหนัง",
      "Apple CarPlay",
      "เซ็นเซอร์รอบคัน",
      "ช่วงล่างสบาย",
    ],
    images: [
      img("1605559424843-9e4c228bf1c2"),
      img("1549317661-bd32c8ce0db2"),
      img("1617531653332-bd46c24f2068"),
      img("1517949115646-21b654bbadc6"),
      img("1583121274602-3e2820c69888"),
    ],
    status: "ว่าง",
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
    highlights: "ไมล์น้อย ประหยัดน้ำมัน ดูแลง่าย",
    features: [
      "กล้องมองหลัง",
      "Bluetooth",
      "เซ็นเซอร์ถอยหลัง",
      "ABS / EBD",
      "แอร์อัตโนมัติ",
      "ประหยัดน้ำมัน",
    ],
    images: [
      img("1552519507-da3b142c6e3d"),
      img("1492144534655-ae79c964c9d7"),
      img("1542362562-01b0888a3c4c"),
      img("1583121274602-3e2820c69888"),
      img("1503376780353-7e6692767b70"),
    ],
    status: "ว่าง",
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
    highlights: "Magic Seat จุของได้มาก คล่องตัว",
    features: [
      "Magic Seat",
      "กล้องมองหลัง",
      "Apple CarPlay",
      "เซ็นเซอร์ถอยหลัง",
      "ที่นั่งผ้า",
      "คล่องตัว",
    ],
    images: [
      img("1609521263047-f8f205293f24"),
      img("1552519507-da3b142c6e3d"),
      img("1492144534655-ae79c964c9d7"),
      img("1502877338535-766e1452684a"),
      img("1485291571151-792b9749f2b0"),
    ],
    status: "ว่าง",
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
    highlights: "ดีเซลทนทาน กระบะใหญ่ แรงดี",
    features: [
      "กล้องมองหลัง",
      "Apple CarPlay",
      "ที่นั่งหนัง",
      "เซ็นเซอร์รอบคัน",
      "กระบะบรรทุกใหญ่",
      "ดีเซลประหยัด",
    ],
    images: [
      img("1533473359331-0135ef1b58bf"),
      img("1549317661-bd32c8ce0db2"),
      img("1583121274602-3e2820c69888"),
      img("1617531653332-bd46c24f2068"),
      img("1517949115646-21b654bbadc6"),
    ],
    status: "ว่าง",
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
    highlights: "กระบะนั่งสบาย ดีเซลแรง",
    features: [
      "กล้องมองหลัง",
      "ที่นั่งหนัง",
      "Bluetooth",
      "เซ็นเซอร์ถอยหลัง",
      "กระบะกว้าง",
      "ช่วงล่างนุ่ม",
    ],
    images: [
      img("1568605117036-5fe5e7bab0b7"),
      img("1549317661-bd32c8ce0db2"),
      img("1533473359331-0135ef1b58bf"),
      img("1583121274602-3e2820c69888"),
      img("1617531653332-bd46c24f2068"),
    ],
    status: "ขายแล้ว",
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
    highlights: "ทนทาน ซ่อมง่าย เหมาะงานหนัก",
    features: [
      "กระบะโลหะ",
      "แอร์",
      "ABS",
      "ดีเซลประหยัด",
      "ซ่อมบำรุงง่าย",
      "ทนทาน",
    ],
    images: [
      img("1549317661-bd32c8ce0db2"),
      img("1583121274602-3e2820c69888"),
      img("1533473359331-0135ef1b58bf"),
      img("1617531653332-bd46c24f2068"),
      img("1517949115646-21b654bbadc6"),
    ],
    status: "ว่าง",
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
