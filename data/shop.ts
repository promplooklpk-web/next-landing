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
