import { shop } from "@/data/shop";

export function MobileFloatingCTA() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex gap-2 md:hidden">
      <a
        href={shop.lineUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#06C755] text-white shadow-lg"
        aria-label="ติดต่อ LINE"
      >
        <span className="text-xs font-bold">LINE</span>
      </a>
      <a
        href={`tel:${shop.phoneTel}`}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-lg"
        aria-label="โทรหาเรา"
      >
        <span className="text-lg">📞</span>
      </a>
    </div>
  );
}
