export const shop = {
  name: "เต็นรถบ้านต้า",
  tagline: "ขายรถมือสองลำปาง คัดสรรคุณภาพ ราคายุติธรรม",
  serviceArea:
    "บริการขายรถมือสองลำปาง ชุมชนบ้านต้า ตำบลชมพู อำเภอเมือง และพื้นที่ใกล้เคียง",
  location: {
    city: "ลำปาง",
    province: "ลำปาง",
    district: "อำเภอเมือง",
    subdistrict: "ชมพู",
    address:
      "577 หมู่ 10 ตำบลชมพู อำเภอเมือง จังหวัดลำปาง 52100",
    postalCode: "52100",
    lat: 18.2428553,
    lng: 99.4428486,
    mapUrl: "https://maps.app.goo.gl/NJY7NgSUNah8ngiY7?g_st=ic",
    embedUrl:
      "https://maps.google.com/maps?q=18.2428553,99.4428486&hl=th&z=17&output=embed",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=18.2428553,99.4428486",
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
