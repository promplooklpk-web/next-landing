export const site = {
  name: "Promplook Studio",
  tagline: "สตูดิโอพัฒนาเว็บที่ออกแบบมาเพื่อความเรียบง่าย",
  taglineEn: "A web studio built for clarity and craft",
  url: "https://promplooklpk-web.github.io/next-landing/",
  github: "https://github.com/promplooklpk-web",
  owner: "Yanyong Promplook",
  ownerHandle: "promplooklpk-web",
} as const;

export const features = [
  {
    title: "ออกแบบเฉพาะตัว",
    titleEn: "Tailored design",
    description:
      "ไม่ใช่เทมเพลตสำเร็จรูป ทุกหน้าเว็บถูกออกแบบให้สะท้อนตัวตนและเป้าหมายของคุณ",
    descriptionEn:
      "No cookie-cutter templates — every page reflects your identity and goals.",
    icon: "◈",
  },
  {
    title: "เร็วและเบา",
    titleEn: "Fast & lightweight",
    description:
      "ใช้ Next.js แบบ static export โหลดเร็ว ทำงานได้ดีบนทุกอุปกรณ์ แม้บน GitHub Pages",
    descriptionEn:
      "Static Next.js exports that load fast and work everywhere, including GitHub Pages.",
    icon: "◎",
  },
  {
    title: "พร้อมขยาย",
    titleEn: "Built to scale",
    description:
      "โครงสร้างโค้ดที่อ่านง่าย พร้อมต่อยอดเป็นแอป ระบบ หรือร้านค้าออนไลน์ในอนาคต",
    descriptionEn:
      "Clean architecture ready to grow into apps, dashboards, or e-commerce.",
    icon: "◇",
  },
] as const;

export const highlights = [
  { value: "Next.js 16", label: "เฟรมเวิร์กล่าสุด", labelEn: "Latest framework" },
  { value: "100%", label: "Static export", labelEn: "Zero server cost" },
  { value: "TH/EN", label: "รองรับสองภาษา", labelEn: "Bilingual ready" },
  { value: "GitHub", label: "Deploy อัตโนมัติ", labelEn: "CI/CD built-in" },
] as const;

export const process = [
  {
    step: "01",
    title: "คุยและวางแผน",
    titleEn: "Discover",
    text: "เข้าใจเป้าหมาย กลุ่มเป้าหมาย และสิ่งที่ต้องการสื่อผ่านเว็บ",
  },
  {
    step: "02",
    title: "ออกแบบและพัฒนา",
    titleEn: "Design & build",
    text: "สร้างหน้าเว็บที่สวยงาม ใช้งานง่าย และทำงานได้จริงบนทุกอุปกรณ์",
  },
  {
    step: "03",
    title: "ปล่อยและดูแล",
    titleEn: "Launch & support",
    text: "Deploy อัตโนมัติผ่าน GitHub Actions พร้อมอัปเดตเมื่อต้องการ",
  },
] as const;
