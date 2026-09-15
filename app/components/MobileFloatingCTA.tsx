import { shop } from "@/data/shop";

export function MobileFloatingCTA() {
  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
      <a
        href={`tel:${shop.phoneTel}`}
        className="flex h-10 min-w-[4.5rem] items-center justify-center rounded-md bg-accent px-4 text-[11px] font-medium tracking-wide text-accent-foreground shadow-lg shadow-black/40"
        aria-label={`โทรหาเรา ${shop.phone}`}
      >
        โทร
      </a>
    </div>
  );
}
