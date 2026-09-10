import { shop } from "@/data/shop";

/** Primary and secondary Thai SEO keywords — use naturally, never stuffed */
export const SEO_KEYWORDS = [
  "ขายรถมือสองลำปาง",
  "ขายรถมือสอง",
  "ขายรถมือสองบ้านฟ้อน",
  "รถมือสองลำปาง",
  "ลำปางคาร์มือสอง",
  shop.name,
] as const;

export const SEO_PRIMARY = "ขายรถมือสองลำปาง";

export const SEO_DEFAULT_TITLE = `${SEO_PRIMARY} | ${shop.name}`;

export const SEO_DEFAULT_DESCRIPTION =
  `${SEO_PRIMARY} คัดสรรคุณภาพ ราคายุติธรรม บริการโซนเมืองลำปางและบ้านฟ้อน ` +
  `เปิดทุกวัน ${shop.hours} โทร ${shop.phone} LINE ${shop.line}`;
