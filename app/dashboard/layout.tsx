import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "แดชบอร์ดจัดการรถ",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
