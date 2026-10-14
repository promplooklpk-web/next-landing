import { assetPath } from "@/lib/site";
import { HeroContent } from "./HeroContent";
import { HeroMedia } from "./HeroMedia";

const HERO_IMAGE = assetPath("/images/hero-shopfront.jpg");
const HERO_ALT = "หน้าร้านเต็นรถบ้านต้า ลำปาง";

export function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
      <HeroMedia src={HERO_IMAGE} alt={HERO_ALT} />
      <div
        className="absolute inset-0 z-[2] bg-gradient-to-t from-black/75 via-black/50 to-black/35"
        aria-hidden
      />
      <HeroContent />
    </section>
  );
}
