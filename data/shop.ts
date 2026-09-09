export const shop = {
  name: "ลำปางคาร์มือสอง",
  tagline: "รถมือสองคุณภาพดี ราคายุติธรรม ในลำปาง",
  location: {
    city: "ลำปาง",
    province: "ลำปาง",
    address: "ถนนบุญวัฒนา ตำบลสวนดอก อำเภอเมืองลำปาง จังหวัดลำปาง 52000",
    mapUrl: "https://maps.google.com/?q=Lampang+Thailand",
    lat: 18.2888,
    lng: 99.4928,
  },
  hours: "ทุกวัน 09:00–18:00",
  phone: "080-000-0000",
  phoneTel: "0800000000",
  line: "@lampangcars",
  lineUrl: "https://line.me/R/ti/p/@lampangcars",
  email: "info@lampangcars.local",
} as const;

export const trustPoints = [
  {
    title: "ตรวจสภาพครบ",
    description: "ทุกคันผ่านการตรวจเช็คสภาพก่อนขาย แจ้งประวัติตรงไปตรงมา",
    icon: "✓",
  },
  {
    title: "ราคาโปร่งใส",
    description: "ไม่มีค่าใช้จ่ายแอบแฝง แจ้งราคาชัดเจนก่อนตัดสินใจ",
    icon: "฿",
  },
  {
    title: "ช่วยจัดไฟแนนซ์",
    description: "ประสานงานสินเชื่อรถยนต์หลายธนาคาร อนุมัติเร็ว",
    icon: "◈",
  },
  {
    title: "รับซื้อ-แลกเปลี่ยน",
    description: "รับซื้อรถเก่า แลกเปลี่ยนรถใหม่ ประเมินราคายุติธรรม",
    icon: "⇄",
  },
] as const;

export const reviews = [
  {
    name: "คุณสมชาย",
    rating: 5,
    text: "ซื้อ Camry ไป บริการดีมาก อธิบายรายละเอียดครบ รถตรงตามที่บอก",
    date: "มกราคม 2026",
  },
  {
    name: "คุณนิดา",
    rating: 5,
    text: "ช่วยจัดไฟแนนซ์ได้เร็ว ได้รถภายใน 3 วัน แนะนำเลยค่ะ",
    date: "ธันวาคม 2025",
  },
  {
    name: "คุณวิชัย",
    rating: 4,
    text: "ราคาเป็นธรรม รถสภาพดี มีบริการหลังขายดี",
    date: "พฤศจิกายน 2025",
  },
] as const;

export const howToBuySteps = [
  {
    step: "01",
    title: "เลือกรถ",
    description: "ดูรายการรถบนเว็บหรือมาดูที่โชว์รูม ทดลองขับได้",
  },
  {
    step: "02",
    title: "ตรวจสอบและเจรจา",
    description: "ตรวจสภาพรถ ดูประวัติ และตกลงราคา",
  },
  {
    step: "03",
    title: "จัดไฟแนนซ์/ชำระเงิน",
    description: "ชำระเงินสดหรือจัดสินเชื่อผ่านธนาคารที่ร่วมรายการ",
  },
  {
    step: "04",
    title: "รับรถ",
    description: "โอนกรรมสิทธิ์ รับรถ พร้อมเอกสารครบถ้วน",
  },
] as const;
