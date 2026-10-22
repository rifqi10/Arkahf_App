
import { useMemo, useState } from "react";
import { HERO_SLIDES } from "../assets/productImages";

export default function HeroSlider() {
  const heroSlides = useMemo(() => HERO_SLIDES, []);
  const [heroIndex, setHeroIndex] = useState(0);

  const goPrev = () => {
    if (heroSlides.length === 0) return;

    setHeroIndex((i) => (i - 1 + heroSlides.length) % heroSlides.length);
  };

  const goNext = () => {
    if (heroSlides.length === 0) return;

    setHeroIndex((i) => (i + 1) % heroSlides.length);
  };

  if (heroSlides.length === 0) {
    return (
      <div className="flex aspect-[4/3] w-full items-center justify-center rounded-2xl border border-[#E3E2D9] bg-white p-6 text-center sm:rounded-3xl">
        <p className="text-sm text-[#777A71]">
          Gambar produk akan ditampilkan di sini.
        </p>
      </div>
    );
  }

  return (
    <div
      className="group relative isolate aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#EAE9E0] sm:rounded-2xl lg:aspect-[5/4]"
      aria-roledescription="carousel"
      aria-label="Arkahf Craft product gallery"
    >
      {/* Gambar Slider */}
      {heroSlides.map((slide, idx) => {
        const active = idx === heroIndex;

        return (
          <div
            key={`${slide.src}-${idx}`}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              active
                ? "z-[1] opacity-100"
                : "pointer-events-none z-0 opacity-0"
            }`}
            aria-hidden={!active}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className={`h-full w-full object-cover transition-transform duration-[5000ms] ease-out ${
                active ? "scale-100" : "scale-105"
              }`}
              loading={idx === 0 ? "eager" : "lazy"}
              fetchPriority={idx === 0 ? "high" : "auto"}
              decoding="async"
              draggable={false}
            />
          </div>
        );
      })}

      {/* Lapisan lembut untuk kontras kontrol */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-24 bg-gradient-to-t from-[#202820]/35 to-transparent"
        aria-hidden="true"
      />

      {/* Tombol Sebelumnya */}
      {heroSlides.length > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl border border-white/60 bg-white/85 text-[#315747] shadow-md backdrop-blur-md transition duration-200 hover:scale-105 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315747] focus-visible:ring-offset-2 sm:left-4 sm:h-11 sm:w-11 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          {/* Tombol Berikutnya */}
          <button
            type="button"
            onClick={goNext}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl border border-white/60 bg-white/85 text-[#315747] shadow-md backdrop-blur-md transition duration-200 hover:scale-105 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315747] focus-visible:ring-offset-2 sm:right-4 sm:h-11 sm:w-11 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </>
      )}

      {/* Indikator Slide */}
      {heroSlides.length > 1 && (
        <div className="absolute bottom-3 left-1/2 z-10 flex max-w-[85%] -translate-x-1/2 items-center justify-center gap-2 rounded-full border border-white/20 bg-[#202820]/35 px-3 py-2 backdrop-blur-md sm:bottom-4">
          {heroSlides.map((slide, i) => (
            <button
              key={`${slide.src}-indicator-${i}`}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === heroIndex ? "true" : undefined}
              onClick={() => setHeroIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#315747] ${
                i === heroIndex
                  ? "w-7 bg-white"
                  : "w-2 bg-white/60 hover:bg-white/90"
              }`}
            />
          ))}
        </div>
      )}

      {/* Nomor Slide */}
      {heroSlides.length > 1 && (
        <div className="absolute right-3 top-3 z-10 rounded-lg border border-white/30 bg-[#202820]/35 px-3 py-1.5 text-xs font-semibold tabular-nums text-white backdrop-blur-md sm:right-4 sm:top-4">
          {String(heroIndex + 1).padStart(2, "0")}
          <span className="mx-1.5 text-white/60">/</span>
          {String(heroSlides.length).padStart(2, "0")}
        </div>
      )}
    </div>
  );
}
