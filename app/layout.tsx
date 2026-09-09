import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import { shop } from "@/data/shop";
import { FULL_SITE_URL } from "@/lib/site";
import "./globals.css";

const notoThai = Noto_Sans_Thai({
  variable: "--font-noto-thai",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(FULL_SITE_URL),
  title: {
    default: `${shop.name} | รถมือสองลำปาง`,
    template: `%s | ${shop.name}`,
  },
  description: shop.tagline,
  openGraph: {
    title: shop.name,
    description: shop.tagline,
    type: "website",
    locale: "th_TH",
    url: FULL_SITE_URL,
    siteName: shop.name,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th" className={`${notoThai.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
