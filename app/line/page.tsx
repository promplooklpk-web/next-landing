import type { Metadata } from "next";
import { shop } from "@/data/shop";
import { absoluteUrl } from "@/lib/site";
import { LineHelper } from "./LineHelper";

export const metadata: Metadata = {
  title: "เพิ่มเพื่อน Line ด้วยเบอร์",
  description: `เพิ่มเพื่อน ${shop.name} ใน Line ด้วยเบอร์ ${shop.phone}`,
  alternates: {
    canonical: "/line/",
  },
  openGraph: {
    title: `เพิ่มเพื่อน Line ด้วยเบอร์ | ${shop.name}`,
    description: `คัดลอกเบอร์ ${shop.phone} แล้วค้นหาใน Line`,
    url: absoluteUrl("/line/"),
    locale: "th_TH",
    type: "website",
  },
};

export default function LinePage() {
  return <LineHelper />;
}
