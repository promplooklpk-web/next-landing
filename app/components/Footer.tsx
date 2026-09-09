import Link from "next/link";
import { shop } from "@/data/shop";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-navy text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo size={36} />
              <p className="text-lg font-bold">{shop.name}</p>
            </div>
            <p className="mt-2 text-sm text-white/70">{shop.tagline}</p>
          </div>
          <div>
            <p className="font-semibold">ติดต่อ</p>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li>{shop.location.address}</li>
              <li>เวลาเปิด: {shop.hours}</li>
              <li>
                <a href={`tel:${shop.phoneTel}`} className="hover:text-white">
                  โทร: {shop.phone}
                </a>
              </li>
              <li>
                <a href={shop.lineUrl} className="hover:text-white">
                  LINE: {shop.line}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold">เมนู</p>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li>
                <Link href="/" className="hover:text-white">หน้าแรก</Link>
              </li>
              <li>
                <Link href="/#cars" className="hover:text-white">รถในร้าน</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/50">
          © {new Date().getFullYear()} {shop.name} · ลำปาง ประเทศไทย
        </div>
      </div>
    </footer>
  );
}
