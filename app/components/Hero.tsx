import { assetPath } from "@/lib/site";
import { HeroContent } from "./HeroContent";

const HERO_IMAGE = assetPath("/images/hero-shopfront.jpg");
const HERO_ALT = "หน้าร้านเต็นรถบ้านต้า ลำปาง";

export function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
      <img
        src={HERO_IMAGE}
        alt={HERO_ALT}
        className="hero-ken-burns absolute inset-0 h-full w-full object-cover object-center"
        fetchPriority="high"
        decoding="async"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/50 to-black/35"
        aria-hidden
      />
      <HeroContent />
    </section>
  );
}
