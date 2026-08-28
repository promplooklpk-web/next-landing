import type { Metadata } from "next";
import { Instrument_Serif, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

const notoThai = Noto_Sans_Thai({
  variable: "--font-noto-thai",
  subsets: ["latin", "thai"],
  weight: ["400", "500", "600", "700"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Promplook Studio — สตูดิโอพัฒนาเว็บ",
  description:
    "สตูดิโอพัฒนาเว็บของ Yanyong Promplook สร้างหน้าเว็บที่สวยงาม เร็ว และพร้อม deploy บน GitHub Pages ด้วย Next.js",
  openGraph: {
    title: "Promplook Studio",
    description: "สตูดิโอพัฒนาเว็บ — Thai-first landing pages with Next.js",
    type: "website",
    url: "https://promplooklpk-web.github.io/next-landing/",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="th"
      className={`${notoThai.variable} ${instrument.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
