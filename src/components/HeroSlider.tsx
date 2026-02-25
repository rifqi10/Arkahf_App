import { useMemo, useState } from "react";
import { HERO_SLIDES } from "../assets/productImages";

export default function HeroSlider() {
  const heroSlides = useMemo(() => HERO_SLIDES, []);
  const [heroIndex, setHeroIndex] = useState(0);

  const goPrev = () =>
    setHeroIndex((i) => (i - 1 + heroSlides.length) % heroSlides.length);
  const goNext = () => setHeroIndex((i) => (i + 1) % heroSlides.length);

  return (
    <div className="relative h-[260px] md:h-[420px] rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
      {heroSlides.map((s, idx) => {
        const active = idx === heroIndex;
        return (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-700 ${
              active ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <img
              src={s.src}
              alt={s.alt}
              className="absolute inset-0 object-cover w-full h-full"
              loading="lazy"
            />
          </div>
        );
      })}

      <button
        type="button"
        onClick={goPrev}
        aria-label="Previous slide"
        className="absolute z-10 w-10 h-10 -translate-y-1/2 border left-3 top-1/2 rounded-2xl border-white/10 bg-black/40 text-white/80 hover:bg-black/60"
      >
        ‹
      </button>

      <button
        type="button"
        onClick={goNext}
        aria-label="Next slide"
        className="absolute z-10 w-10 h-10 -translate-y-1/2 border right-3 top-1/2 rounded-2xl border-white/10 bg-black/40 text-white/80 hover:bg-black/60"
      >
        ›
      </button>

      <div className="absolute z-10 flex gap-2 -translate-x-1/2 bottom-3 left-1/2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setHeroIndex(i)}
            className={`h-2.5 w-2.5 rounded-full border border-white/20 transition ${
              i === heroIndex ? "bg-white/70" : "bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
