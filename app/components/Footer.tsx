import Link from "next/link";
import { shop } from "@/data/shop";

export function Footer() {
  return (
    <footer className="bg-near-black py-12 text-white md:py-16">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-8 px-6 md:flex-row md:justify-between">
        <p className="text-xs text-white/50">
          © {new Date().getFullYear()} {shop.name}
        </p>
        <nav className="flex gap-8">
          <Link href="/#cars" className="text-xs text-white/60 transition hover:text-white">
            รถในร้าน
          </Link>
          <Link href="/#contact" className="text-xs text-white/60 transition hover:text-white">
            ติดต่อ
          </Link>
          <a
            href={`tel:${shop.phoneTel}`}
            className="text-xs text-white/60 transition hover:text-white"
          >
            {shop.phone}
          </a>
        </nav>
      </div>
    </footer>
  );
}
