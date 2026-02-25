import HeroSlider from "../components/HeroSlider";

type Props = {
  lang: "id" | "en";
  t: any;
};

export default function Hero({ lang, t }: Props) {
  const shopeeUrl = "https://id.shp.ee/tY9FnvX";

  return (
    <section className="relative flex items-center min-h-screen overflow-hidden pt-28">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0B0B0B] to-[#171513]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(122,74,42,0.35),_transparent_60%)]" />

      <div className="relative grid items-center gap-12 px-6 mx-auto max-w-7xl md:grid-cols-2">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 border rounded-full border-white/15 bg-white/5 text-white/80">
            <span className="h-2 w-2 rounded-full bg-[#D6B98C]" />
            <span className="text-sm font-semibold">
              {lang === "id" ? "Sistem Pre-Order" : "Pre-Order System"}
            </span>
            <span className="text-sm text-white/60">
              {lang === "id"
                ? "— dibuat setelah pesanan masuk"
                : "— made after order is placed"}
            </span>
          </div>

          <h1 className="mb-6 font-serif text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
            {t.hero.title}
          </h1>

          <p className="max-w-xl mb-8 text-lg text-white/70">{t.hero.desc}</p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="px-8 py-4 font-semibold transition rounded-xl
              bg-[#7A4A2A] hover:bg-[#5E361F]
              shadow-[0_12px_30px_rgba(122,74,42,0.35)]"
            >
              {t.hero.ctaPrimary}
            </a>

            <a
              href="#products"
              className="px-8 py-4 font-semibold transition border rounded-xl border-white/20 hover:bg-white/5"
            >
              {t.hero.ctaSecondary}
            </a>

            <a
              href={shopeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group relative inline-flex items-center justify-center gap-3
                px-8 py-4 rounded-2xl font-semibold
                text-[#F3E9D2]
                bg-gradient-to-r from-[#5E361F] via-[#7A4A2A] to-[#2E1A10]
                shadow-[0_16px_40px_rgba(122,74,42,0.35)]
                ring-1 ring-white/10
                transition-all duration-300
                hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(122,74,42,0.45)]
                active:translate-y-0 active:shadow-[0_12px_30px_rgba(122,74,42,0.30)]
              "
            >
              <span
                className="
                  pointer-events-none absolute -inset-1 rounded-2xl blur-xl opacity-25
                  bg-[radial-gradient(ellipse_at_top,_rgba(214,185,140,0.35),_transparent_60%)]
                  transition-opacity duration-300
                  group-hover:opacity-40
                "
              />

              <span className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
                <span
                  className="
                    absolute -left-1/2 top-0 h-full w-1/2
                    bg-gradient-to-r from-transparent via-white/20 to-transparent
                    skew-x-[-20deg]
                    translate-x-[-120%]
                    transition-transform duration-700
                    group-hover:translate-x-[260%]
                  "
                />
              </span>

              <span className="relative inline-flex items-center gap-3">
                <span className="grid w-10 h-10 place-items-center rounded-xl bg-black/20 ring-1 ring-white/15">
                  🛒
                </span>

                <span className="flex flex-col leading-tight text-left">
                  <span className="text-sm text-white/75">Checkout via</span>
                  <span className="text-base">Shopee Store</span>
                </span>
              </span>
            </a>
          </div>

          <p className="max-w-xl mt-4 text-sm text-white/60">
            {lang === "id"
              ? "Catatan: Produk dibuat dengan sistem pre-order. Estimasi pengerjaan mengikuti jenis finishing & jumlah pesanan."
              : "Note: Products are made via pre-order. Production time depends on finishing type & order volume."}
          </p>
        </div>

        <div className="block md:block">
          <HeroSlider />
        </div>
      </div>
    </section>
  );
}
