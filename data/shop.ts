export const shop = {
  name: "ลำปางคาร์มือสอง",
  tagline: "ขายรถมือสองลำปาง คัดสรรคุณภาพ ราคายุติธรรม",
  serviceArea:
    "บริการขายรถมือสองลำปาง รวมโซนบ้านฟ้อน อำเภอเมือง และพื้นที่ใกล้เคียง",
  location: {
    city: "ลำปาง",
    province: "ลำปาง",
    district: "อำเภอเมืองลำปาง",
    subdistrict: "บ้านฟ้อน",
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
    title: "รับรถ",
    description: "โอนกรรมสิทธิ์ รับรถ พร้อมเอกสารครบถ้วน",
  },
] as const;
