import type { Metadata } from "next";
import { shop } from "@/data/shop";

export const metadata: Metadata = {
  title: "รถทั้งหมด",
  description: `ดูรายการรถมือสองทั้งหมดจาก ${shop.name} ในลำปาง กรองตามยี่ห้อ ราคา เกียร์ และปี`,
  alternates: {
    canonical: "/cars/",
  },
};

export default function CarsLayout({ children }: LayoutProps<"/cars">) {
  return children;
}
