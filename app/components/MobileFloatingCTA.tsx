import { shop } from "@/data/shop";

export function MobileFloatingCTA() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 md:hidden">
      <a
        href={shop.lineUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-10 items-center justify-center rounded-md border border-border-dark bg-surface-raised/95 px-4 text-[11px] font-medium tracking-wide text-foreground shadow-lg shadow-black/40 backdrop-blur-sm"
        aria-label="ติดต่อ LINE"
      >
        LINE
      </a>
      <a
        href={`tel:${shop.phoneTel}`}
        className="flex h-10 items-center justify-center rounded-md bg-accent px-4 text-[11px] font-medium tracking-wide text-accent-foreground shadow-lg shadow-black/40"
        aria-label="โทรหาเรา"
      >
        โทร
      </a>
    </div>
  );
}
