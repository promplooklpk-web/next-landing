# ลำปางคาร์มือสอง

เว็บไซต์รถมือสองสำหรับร้าน **ลำปางคาร์มือสอง** ในลำปาง ประเทศไทย — สร้างด้วย Next.js (App Router) + TypeScript + Tailwind CSS และ deploy บน GitHub Pages

## Live URL

**https://promplooklpk-web.github.io/next-landing/**

## หน้าเว็บ

| หน้า | คำอธิบาย |
|------|----------|
| `/` | หน้าแรก — hero, รถในร้าน, โปรโมชั่น, ขั้นตอนซื้อ, ติดต่อ |
| `/cars/[slug]/` | รายละเอียดรถแต่ละคัน (SEO URL สะอาด) |
| `/cars/view/?slug=` | fallback สำหรับรถที่เพิ่มหลัง deploy ล่าสุด |
| `/dashboard/` | แดชบอร์ดจัดการรถ (mock admin, Supabase) |
| `/cars/` | redirect ไป `/#cars` บนหน้าแรก |

## แก้ไขข้อมูลร้านและรถ

### ข้อมูลร้าน (`data/shop.ts`)

แก้ชื่อร้าน, ที่อยู่, เวลาเปิด, เบอร์โทร, LINE, ขั้นตอนซื้อ ฯลฯ

### ข้อมูลรถ (Supabase + seed)

- **แหล่งข้อมูลจริง:** ตาราง `public.cars` ใน Supabase (แก้ผ่าน `/dashboard/`)
- **Seed:** `data/cars.ts` ใช้เป็น fallback ตอน build ถ้า Supabase ล้มเหลว
- **รูปภาพ:** อัปโหลดไป bucket `car-images` ผ่านแดชบอร์ด

### SEO และ static pages

ตอน build GitHub Actions จะดึงรถจาก Supabase แล้วสร้าง HTML จริงที่ `/cars/<slug>/` + `sitemap.xml`

- รถที่เพิ่มในแดชบอร์ด **หลัง** deploy ล่าสุด จะยังไม่มีหน้า SEO จนกว่าจะ push/redeploy
- ระหว่างรอ deploy ใช้ `/cars/view/?slug=...` ได้
- หลัง push ไป `main` workflow จะ rebuild อัตโนมัติ

### Environment variables

คัดลอกจาก `.env.example`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://kxbeofqiahloeqkillvy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

ค่าเหล่านี้ถูก bake ใน GitHub Actions workflow สำหรับ Pages deploy (anon key เท่านั้น — ไม่ใช้ service_role)

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
