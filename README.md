# ลำปางคาร์มือสอง

เว็บไซต์รถมือสองสำหรับร้าน **ลำปางคาร์มือสอง** ในลำปาง ประเทศไทย — สร้างด้วย Next.js (App Router) + TypeScript + Tailwind CSS และ deploy บน GitHub Pages

## Live URL

**https://promplooklpk-web.github.io/next-landing/**

## หน้าเว็บ

| หน้า | คำอธิบาย |
|------|----------|
| `/` | หน้าแรก — hero, ค้นหาเร็ว, รถแนะนำ, ความน่าเชื่อถือ, โปรโมชั่น, รีวิว, ขั้นตอนซื้อ, ติดต่อ |
| `/cars/` | รายการรถทั้งหมด พร้อมตัวกรองยี่ห้อ/ราคา/เกียร์/ปี |
| `/cars/[slug]/` | รายละเอียดรถแต่ละคัน |

## แก้ไขข้อมูลร้านและรถ

### ข้อมูลร้าน (`data/shop.ts`)

แก้ชื่อร้าน, ที่อยู่, เวลาเปิด, เบอร์โทร, LINE, รีวิว, ขั้นตอนซื้อ ฯลฯ

### ข้อมูลรถ (`data/cars.ts`)

เพิ่ม/แก้/ลบรถในอาร์เรย์ `cars` — แต่ละคันต้องมี `slug` ที่ไม่ซ้ำกัน ตั้ง `featured: true` สำหรับรถแนะนำ และ `sold: true` สำหรับรถที่ขายแล้ว

## พัฒนาในเครื่อง

```bash
npm install
npm run dev
```

เปิด http://localhost:3000 (ไม่มี basePath ในโหมด dev)

## Build สำหรับ GitHub Pages

```bash
GITHUB_PAGES=true NODE_ENV=production npm run build
```

ผลลัพธ์อยู่ในโฟลเดอร์ `out/`

## Deploy

Push ไปที่ branch `main` จะ trigger workflow `.github/workflows/deploy-github-pages.yml` อัตโนมัติ

### เปิดใช้ GitHub Pages (ครั้งแรก)

1. ไปที่ **Settings → Pages**
2. ตั้ง **Source** เป็น **GitHub Actions**
3. รอ workflow สำเร็จ — เว็บจะอยู่ที่ URL ด้านบน

## Tech Stack

- Next.js 16 (App Router, static export)
- TypeScript
- Tailwind CSS v4
- `next/image` (unoptimized)
- basePath `/next-landing` สำหรับ GitHub Pages
