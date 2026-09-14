import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import { shop } from "@/data/shop";
import { absoluteUrl, FULL_SITE_URL } from "@/lib/site";
import {
  SEO_DEFAULT_DESCRIPTION,
  SEO_DEFAULT_TITLE,
  SEO_KEYWORDS,
} from "@/lib/site-seo";
import { Providers } from "./providers";
import "./globals.css";

const notoThai = Noto_Sans_Thai({
  variable: "--font-noto-thai",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(FULL_SITE_URL),
  title: {
    default: SEO_DEFAULT_TITLE,
    template: `%s | ${shop.name}`,
  },
  description: SEO_DEFAULT_DESCRIPTION,
  keywords: [...SEO_KEYWORDS],
  openGraph: {
    title: SEO_DEFAULT_TITLE,
    description: SEO_DEFAULT_DESCRIPTION,
    type: "website",
    locale: "th_TH",
    url: FULL_SITE_URL,
    siteName: shop.name,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: absoluteUrl("/logo.svg"),
    apple: absoluteUrl("/logo.svg"),
    shortcut: absoluteUrl("/logo.svg"),
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th" className={`${notoThai.variable} h-full bg-background antialiased`}>
      <body className="min-h-full bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
