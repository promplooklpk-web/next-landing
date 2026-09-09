import { HeroContent } from "./HeroContent";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80";

export function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
      <img
        src={HERO_IMAGE}
        alt=""
        className="hero-ken-burns absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10" />
      <HeroContent />
    </section>
  );
}
