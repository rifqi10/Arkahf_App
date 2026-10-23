
import HeroSlider from "../components/HeroSlider";

type Props = {
  lang: "id" | "en";
  t: any;
};

export default function Hero({ lang, t }: Props) {
  const shopeeUrl = "https://shopee.co.id/arkahfcraft";

  return (
    <section className="relative isolate overflow-hidden bg-[#F7F5EF] pb-16 pt-28 sm:pb-20 sm:pt-32 lg:flex lg:min-h-[90vh] lg:items-center lg:pb-24">
      {/* Background dekoratif */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-white via-[#F7F5EF] to-[#EAF0E9]" />

      <div className="pointer-events-none absolute -right-32 top-12 -z-10 h-72 w-72 rounded-full bg-[#C58B55]/10 blur-3xl sm:h-96 sm:w-96" />

      <div className="pointer-events-none absolute -bottom-32 -left-24 -z-10 h-72 w-72 rounded-full bg-[#315747]/10 blur-3xl sm:h-96 sm:w-96" />

      {/* Konten Hero */}
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-14 xl:gap-20">
        {/* Kolom teks */}
        <div className="min-w-0 text-center lg:text-left">
          {/* Badge pre-order */}
          <div className="mb-6 inline-flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-[#DCE5D9] bg-white/80 px-4 py-2.5 text-[#315747] shadow-sm shadow-[#294737]/5 lg:justify-start">
            <span
              className="h-2 w-2 shrink-0 rounded-full bg-[#C58B55] ring-4 ring-[#C58B55]/10"
              aria-hidden="true"
            />

            <span className="text-xs font-bold sm:text-sm">
              {lang === "id" ? "Sistem Pre-Order" : "Pre-Order System"}
            </span>

            <span className="hidden text-[#B9BDB2] sm:inline" aria-hidden="true">
              —
            </span>

            <span className="text-xs text-[#6B7068] sm:text-sm">
              {lang === "id"
                ? "Dibuat setelah pesanan masuk"
                : "Made after order is placed"}
            </span>
          </div>

          {/* Judul utama */}
          <h1 className="mx-auto mb-6 max-w-2xl break-words font-serif text-4xl font-extrabold leading-[1.12] tracking-tight text-[#294737] sm:text-5xl lg:mx-0 lg:text-6xl xl:text-7xl">
            {t.hero.title}
          </h1>

          {/* Deskripsi */}
          <p className="mx-auto mb-8 max-w-xl text-base leading-7 text-[#62675F] sm:text-lg sm:leading-8 lg:mx-0">
            {t.hero.desc}
          </p>

          {/* Tombol aksi */}
          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 lg:justify-start">
            {/* Tombol kontak */}
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#315747] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#315747]/20 transition duration-200 hover:-translate-y-0.5 hover:bg-[#254536] hover:shadow-xl hover:shadow-[#315747]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315747] focus-visible:ring-offset-2 sm:px-7 sm:text-base"
            >
              {t.hero.ctaPrimary}
              <span className="ml-2" aria-hidden="true">
                →
              </span>
            </a>

            {/* Tombol katalog */}
            <a
              href="#products"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#D7D8CE] bg-white/80 px-6 py-3.5 text-sm font-bold text-[#315747] transition duration-200 hover:-translate-y-0.5 hover:border-[#315747] hover:bg-[#EAF0E9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315747] focus-visible:ring-offset-2 sm:px-7 sm:text-base"
            >
              {t.hero.ctaSecondary}
            </a>

            {/* Tombol Shopee */}
            <a
              href={shopeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex min-h-14 items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-[#EE4D2D] to-[#D93D22] px-5 py-3.5 text-white shadow-lg shadow-[#EE4D2D]/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#EE4D2D]/25 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EE4D2D] focus-visible:ring-offset-2 sm:px-6"
            >
              {/* Efek kilau */}
              <span
                className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-[20deg] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-[450%]"
                aria-hidden="true"
              />

              <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/15 ring-1 ring-white/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              </span>

              <span className="relative flex min-w-0 flex-col text-left leading-tight">
                <span className="text-xs font-medium text-white/80">
                  {lang === "id" ? "Belanja melalui" : "Shop through"}
                </span>

                <span className="mt-1 text-sm font-bold sm:text-base">
                  Shopee Store
                </span>
              </span>

              <span className="relative ml-1 text-lg" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>

          {/* Catatan pre-order */}
          <p className="mx-auto mt-5 max-w-xl text-xs leading-6 text-[#777A71] sm:text-sm lg:mx-0">
            {lang === "id"
              ? "Catatan: Produk dibuat dengan sistem pre-order. Estimasi pengerjaan mengikuti jenis finishing dan jumlah pesanan."
              : "Note: Products are made via pre-order. Production time depends on finishing type and order volume."}
          </p>

          {/* Informasi tambahan */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-xs font-medium text-[#62675F] sm:gap-x-7 sm:text-sm lg:justify-start">
            <span className="inline-flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full bg-[#315747]"
                aria-hidden="true"
              />
              {lang === "id" ? "Material pilihan" : "Selected materials"}
            </span>

            <span className="inline-flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full bg-[#C58B55]"
                aria-hidden="true"
              />
              {lang === "id" ? "Detail pengerjaan rapi" : "Careful craftsmanship"}
            </span>
          </div>
        </div>

        {/* Kolom gambar slider */}
        <div className="relative mx-auto w-full min-w-0 max-w-xl lg:max-w-none">
          <div className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-[#C58B55]/15 via-transparent to-[#315747]/10 blur-xl sm:-inset-5" />

          <div className="relative overflow-hidden rounded-2xl border border-white/80 bg-white p-2 shadow-xl shadow-[#294737]/10 sm:rounded-3xl sm:p-3">
            <div className="overflow-hidden rounded-xl sm:rounded-2xl">
              <HeroSlider />
            </div>
          </div>

          {/* Aksen dekoratif */}
          <div
            className="pointer-events-none absolute -bottom-3 -right-2 h-12 w-12 rounded-2xl border border-[#C58B55]/30 bg-[#F0D7B6]/60 sm:-bottom-4 sm:-right-4 sm:h-16 sm:w-16"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
