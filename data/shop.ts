export const shop = {
  name: "เต็นรถบ้านต้า",
  tagline: "ขายรถมือสองลำปาง คัดสรรคุณภาพ ราคายุติธรรม",
  serviceArea:
    "บริการขายรถมือสองลำปาง รวมโซนบ้านฟ้อน อำเภอเมือง และพื้นที่ใกล้เคียง",
  location: {
    city: "ลำปาง",
    province: "ลำปาง",
    district: "อำเภอเมืองลำปาง",
    subdistrict: "บ้านฟ้อน",
    address: "ถนนบุญวัฒนา ตำบลสวนดอก อำเภอเมืองลำปาง จังหวัดลำปาง 52000",
    lat: 18.2888,
    lng: 99.4928,
    mapUrl: "https://www.google.com/maps?q=18.2888,99.4928",
    embedUrl:
      "https://maps.google.com/maps?q=18.2888,99.4928&hl=th&z=15&output=embed",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=18.2888,99.4928",
  },
  hours: "ทุกวัน 09:00–18:00",
  phone: "087-173-0471",
  phoneTel: "0871730471",
  line: "0871730471",
  lineUrl: "https://line.me/ti/p/~0871730471",
  email: "contact@tenrodbaan.local",
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
