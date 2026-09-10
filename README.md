# ลำปางคาร์มือสอง

เว็บไซต์รถมือสองสำหรับร้าน **ลำปางคาร์มือสอง** ในลำปาง ประเทศไทย — สร้างด้วย Next.js (App Router) + TypeScript + Tailwind CSS รองรับ deploy บน **GitHub Pages** (subpath) และ **Cloudflare Pages** (root URL)

## Live URLs

| Host | URL |
|------|-----|
| GitHub Pages | https://promplooklpk-web.github.io/next-landing/ |
| Cloudflare Pages | ตั้ง `NEXT_PUBLIC_SITE_URL` เป็น `https://<project>.pages.dev` |

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

| Variable | GitHub Pages | Cloudflare Pages |
|----------|--------------|------------------|
| `GITHUB_PAGES` | `true` | **ไม่ตั้ง** |
| `NEXT_PUBLIC_SITE_URL` | `https://promplooklpk-web.github.io` | `https://<project>.pages.dev` |
| `NEXT_PUBLIC_SUPABASE_URL` | ✓ | ✓ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✓ (anon only) | ✓ (anon only) |

`NEXT_PUBLIC_BASE_PATH` ถูกตั้งอัตโนมัติเป็น `/next-landing` เมื่อ `GITHUB_PAGES=true` เท่านั้น

## พัฒนาในเครื่อง

```bash
npm install
npm run dev
```

เปิด http://localhost:3000 (ไม่มี basePath ในโหมด dev)

## Build

```bash
# GitHub Pages (subpath /next-landing)
npm run build:pages

# Cloudflare Pages (root URL)
NODE_ENV=production \
  NEXT_PUBLIC_SITE_URL=https://lampang-cars.pages.dev \
  NEXT_PUBLIC_SUPABASE_URL=https://kxbeofqiahloeqkillvy.supabase.co \
  NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key> \
  npm run build
```

ผลลัพธ์อยู่ในโฟลเดอร์ `out/`

## Deploy — GitHub Pages

Push ไปที่ branch `main` จะ trigger workflow `.github/workflows/deploy-github-pages.yml` อัตโนมัติ

### เปิดใช้ GitHub Pages (ครั้งแรก)

1. ไปที่ **Settings → Pages**
2. ตั้ง **Source** เป็น **GitHub Actions**
3. รอ workflow สำเร็จ — เว็บจะอยู่ที่ URL ด้านบน

## Deploy — Cloudflare Pages

1. **Workers & Pages → Create → Connect to Git** → เลือก repo นี้
2. **Framework preset:** None (หรือ Next.js static)
3. **Build settings:**
   - **Build command:** `npm ci && npm run build`
   - **Build output directory:** `out`
   - **Node.js version:** `22`
4. **Environment variables (Production):**
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://kxbeofqiahloeqkillvy.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<same anon key as GitHub Actions>
   NEXT_PUBLIC_SITE_URL=https://<your-project>.pages.dev
   ```
   **ไม่ตั้ง** `GITHUB_PAGES`
5. Deploy — หลังได้ URL จริง อัปเดต `NEXT_PUBLIC_SITE_URL` แล้ว redeploy (สำหรับ sitemap/canonical/OG ที่ถูกต้อง)

ดู `wrangler.toml` สำหรับค่า output directory และหมายเหตุ CLI deploy (`npx wrangler pages deploy out`)

## Tech Stack

- Next.js 16 (App Router, static export)
- TypeScript
- Tailwind CSS v4
- `next/image` (unoptimized)
- basePath `/next-landing` เฉพาะเมื่อ `GITHUB_PAGES=true` (GitHub Pages)
- root deploy บน Cloudflare Pages (`basePath` ว่าง)
