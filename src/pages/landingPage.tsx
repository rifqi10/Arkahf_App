import { useEffect, useMemo, useState } from "react";
import logoArkahf from "../assets/arkhafLogo2.png";
import gagangFinishing2 from "../assets/gagangFinishing2.jpeg";
import gagangSabitFinishing2 from "../assets/gagangSabitFinishing2.jpeg";
import gagangSabitFinishingText from "../assets/gagangSabitFinishingText.png";
import gagangSabitFinishingNaturalText from "../assets/gagangSabitFinishingNaturalText.png";
import gagangSabitNoFinishing2 from "../assets/gagangSabitNoFinishing2.jpeg";
import gagangSabitNoFinishingText from "../assets/gagangSabitNoFinishingText.png";
import gagangSabitFinishingNatural from "../assets/gagangSabitFinishingNatural.jpeg";

import LanguageToggle from "../components/languageToggle";
import { useLang } from "../hooks/useLang";

export default function LandingPage() {
  const { lang, setLang, t } = useLang();

  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [previewAlt, setPreviewAlt] = useState<string>("");

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Modal "Semua Produk"
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [openAllIndex, setOpenAllIndex] = useState<number | null>(null);

  // Produk: teks ikut bahasa, image tetap
  const products = useMemo(() => {
    const images = [
      gagangSabitNoFinishingText,
      gagangSabitFinishingText,
      gagangSabitFinishingNaturalText,
      gagangSabitNoFinishing2,
      gagangSabitFinishing2,
      gagangSabitFinishingNatural
    ];

    return t.productsData.map((p, idx) => ({
      ...p,
      image: images[idx],
    }));
  }, [t.productsData]);

  // Hanya tampil 4 dulu di section
  const MAX_VISIBLE = 4;
  const hasMore = products.length > MAX_VISIBLE;

  const visibleCount = hasMore ? MAX_VISIBLE - 1 : MAX_VISIBLE;
  const visibleProducts = products.slice(0, visibleCount);

  const closeImagePreview = () => {
    setPreviewSrc(null);
    setPreviewAlt("");
  };

  const closeAllProducts = () => {
    setShowAllProducts(false);
    setOpenAllIndex(null);
  };

  // ESC untuk tutup modal (image preview & semua produk)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeImagePreview();
        closeAllProducts();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Kunci scroll body saat salah satu modal terbuka
  useEffect(() => {
    const anyModalOpen = !!previewSrc || showAllProducts;
    document.body.style.overflow = anyModalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [previewSrc, showAllProducts]);

  return (
    <div className="min-h-screen font-sans text-[#F3E9D2] bg-[#070707]">
      {/* NAVBAR */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur">
        <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
          <a href="#" className="flex items-center gap-3">
            <img src={logoArkahf} alt="Arkahf" className="w-auto h-12" />
          </a>

          <div className="flex items-center gap-3">
            <div className="hidden gap-8 text-sm font-medium md:flex text-white/70">
              <a href="#about" className="transition hover:text-[#D6B98C]">
                {t.nav.about}
              </a>
              <a href="#products" className="transition hover:text-[#D6B98C]">
                {t.nav.products}
              </a>
              <a href="#why" className="transition hover:text-[#D6B98C]">
                {t.nav.why}
              </a>
              <a href="#contact" className="transition hover:text-[#D6B98C]">
                {t.nav.contact}
              </a>
            </div>

            <LanguageToggle lang={lang} onChange={setLang} />
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative flex items-center min-h-screen overflow-hidden pt-28">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0B0B0B] to-[#171513]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(122,74,42,0.35),_transparent_60%)]" />

        <div className="relative grid items-center gap-12 px-6 mx-auto max-w-7xl md:grid-cols-2">
          <div>
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
            </div>
          </div>

          <div className="hidden md:block">
            <div className="relative h-[420px] rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
              <img
                src={gagangFinishing2}
                alt="gagangFinishing2"
                className="absolute inset-0 object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 bg-[#0E0D0C]">
        <div className="max-w-5xl px-6 mx-auto text-center">
          <h2 className="mb-6 font-serif text-4xl font-bold">
            {t.about.title}
          </h2>
          <p className="text-lg leading-relaxed text-white/70">
            {t.about.desc}
          </p>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="py-28 bg-[#070707]">
        <div className="px-6 mx-auto max-w-7xl">
          <h2 className="mb-16 font-serif text-4xl font-bold text-center">
            {t.products.title}
          </h2>

          {/* GRID UTAMA: tampil max 4 + card "Lainnya" */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {visibleProducts.map((product, i) => {
              const isOpen = openIndex === i;

              return (
                <div
                  key={i}
                  className="p-8 transition rounded-3xl
                  bg-[#11100F] border border-white/10
                  hover:border-[#7A4A2A]/60"
                >
                  <button
                    type="button"
                    className="relative w-full h-56 mb-6 overflow-hidden rounded-2xl"
                    onClick={() => {
                      setPreviewSrc(product.image);
                      setPreviewAlt(product.title);
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                    />
                  </button>

                  <h3 className="mb-2 font-serif text-xl font-semibold">
                    {product.title}
                  </h3>

                  <p className="mb-4 text-sm text-white/60">{product.short}</p>

                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="font-medium text-[#D6B98C] hover:underline"
                  >
                    {isOpen ? t.products.detailClose : t.products.detailOpen}
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out
                    ${isOpen ? "max-h-[520px] opacity-100 mt-4" : "max-h-0 opacity-0"}`}
                  >
                    <div className="space-y-4 text-sm leading-relaxed text-white/70">
                      {/* Deskripsi */}
                      <div>
                        <p className="mb-1 font-semibold text-white/80">
                          {lang === "id" ? "Deskripsi" : "Description"}
                        </p>
                        {product.detail.description.map((d, idx) => (
                          <p key={idx} className="text-white/70">
                            {d}
                          </p>
                        ))}
                        {product.detail.note && (
                          <p className="mt-2 italic text-white/60">
                            {product.detail.note}
                          </p>
                        )}
                      </div>

                      {/* Spesifikasi */}
                      <div>
                        <p className="mb-1 font-semibold text-white/80">
                          {lang === "id"
                            ? "Spesifikasi Produk"
                            : "Specifications"}
                        </p>
                        <ul className="space-y-1 text-white/70">
                          {product.detail.specs.map((s, idx) => (
                            <li key={idx} className="flex gap-2">
                              <span className="text-white/60 w-28 shrink-0">
                                {s.label}:
                              </span>
                              <span>{s.value}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Kelebihan */}
                      <div>
                        <p className="mb-1 font-semibold text-white/80">
                          {lang === "id" ? "Kelebihan Produk" : "Benefits"}
                        </p>
                        <ul className="pl-5 space-y-1 list-disc text-white/70">
                          {product.detail.benefits.map((b, idx) => (
                            <li key={idx}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {hasMore && (
              <button
                type="button"
                onClick={() => setShowAllProducts(true)}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#11100F]
                hover:border-[#7A4A2A]/60 transition text-left"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition
                  bg-[radial-gradient(ellipse_at_top,_rgba(122,74,42,0.28),_transparent_60%)]"
                />

                <div className="relative p-8">
                  <div className="relative h-56 overflow-hidden border rounded-2xl border-white/10 bg-black/20">
                    <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_45%)]" />
                    <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_80%_30%,rgba(122,74,42,0.18),transparent_55%)]" />

                    <span className="absolute px-3 py-1 text-xs border rounded-full right-4 top-4 border-white/10 bg-white/5 text-white/70">
                      +{products.length - visibleCount}
                    </span>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5
                        group-hover:border-[#7A4A2A]/40 group-hover:bg-[#7A4A2A]/10 transition"
                      >
                        <span className="text-2xl">↗</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="mt-6 font-serif text-xl font-semibold">
                    {t.products.moreTitle}
                  </h3>

                  <p className="mt-2 text-sm text-white/60">
                    {t.products.moreDescPrefix} {products.length - visibleCount}{" "}
                    {t.products.moreDescSuffix}
                  </p>

                  <p className="mt-4 font-medium text-[#D6B98C] group-hover:underline">
                    {t.products.openAll}
                  </p>
                </div>
              </button>
            )}
          </div>

          {/* MODAL PREVIEW IMAGE (FULL) */}
          {previewSrc && (
            <div
              className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 p-4"
              onClick={closeImagePreview}
              role="dialog"
              aria-modal="true"
            >
              <div
                className="relative max-h-[90vh] max-w-[90vw]"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeImagePreview}
                  className="absolute px-3 py-2 text-white rounded-full -right-3 -top-3 bg-black/70 hover:bg-black"
                  aria-label={t.products.close}
                >
                  ✕
                </button>

                <img
                  src={previewSrc}
                  alt={previewAlt}
                  className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain"
                />
              </div>
            </div>
          )}

          {/* MODAL SEMUA PRODUK */}
          {showAllProducts && (
            <div
              className="fixed inset-0 z-[999] bg-black/80 p-4"
              onClick={closeAllProducts}
              role="dialog"
              aria-modal="true"
            >
              <div
                className="mx-auto flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0B0B0B]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                  <h3 className="font-serif text-2xl font-bold">
                    {t.products.allTitle}
                  </h3>
                  <button
                    onClick={closeAllProducts}
                    className="px-3 py-2 rounded-full bg-white/10 hover:bg-white/20"
                    aria-label={t.products.close}
                  >
                    ✕
                  </button>
                </div>

                <div className="px-6 py-6 overflow-y-auto">
                  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {products.map((product, i) => {
                      const isOpen = openAllIndex === i;

                      return (
                        <div
                          key={`all-${i}`}
                          className="p-6 transition rounded-3xl
                          bg-[#11100F] border border-white/10
                          hover:border-[#7A4A2A]/60"
                        >
                          <button
                            type="button"
                            className="relative w-full h-48 mb-5 overflow-hidden rounded-2xl"
                            onClick={() => {
                              setPreviewSrc(product.image);
                              setPreviewAlt(product.title);
                            }}
                          >
                            <img
                              src={product.image}
                              alt={product.title}
                              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                            />
                          </button>

                          <h3 className="mb-2 font-serif text-lg font-semibold">
                            {product.title}
                          </h3>

                          <p className="mb-4 text-sm text-white/60">
                            {product.short}
                          </p>

                          <button
                            onClick={() => setOpenAllIndex(isOpen ? null : i)}
                            className="font-medium text-[#D6B98C] hover:underline"
                          >
                            {isOpen
                              ? t.products.detailClose
                              : t.products.detailOpen}
                          </button>

                          <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out
                            ${isOpen ? "max-h-[520px] opacity-100 mt-4" : "max-h-0 opacity-0"}`}
                          >
                            <div className="space-y-4 text-sm leading-relaxed text-white/70">
                              {/* Deskripsi */}
                              <div>
                                <p className="mb-1 font-semibold text-white/80">
                                  {lang === "id" ? "Deskripsi" : "Description"}
                                </p>
                                {product.detail.description.map((d, idx) => (
                                  <p key={idx} className="text-white/70">
                                    {d}
                                  </p>
                                ))}
                                {product.detail.note && (
                                  <p className="mt-2 italic text-white/60">
                                    {product.detail.note}
                                  </p>
                                )}
                              </div>

                              {/* Spesifikasi */}
                              <div>
                                <p className="mb-1 font-semibold text-white/80">
                                  {lang === "id"
                                    ? "Spesifikasi Produk"
                                    : "Specifications"}
                                </p>
                                <ul className="space-y-1 text-white/70">
                                  {product.detail.specs.map((s, idx) => (
                                    <li key={idx} className="flex gap-2">
                                      <span className="text-white/60 w-28 shrink-0">
                                        {s.label}:
                                      </span>
                                      <span>{s.value}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Kelebihan */}
                              <div>
                                <p className="mb-1 font-semibold text-white/80">
                                  {lang === "id"
                                    ? "Kelebihan Produk"
                                    : "Benefits"}
                                </p>
                                <ul className="pl-5 space-y-1 list-disc text-white/70">
                                  {product.detail.benefits.map((b, idx) => (
                                    <li key={idx}>{b}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* WHY US */}
      <section id="why" className="py-28 bg-[#0E0D0C]">
        <div className="px-6 mx-auto max-w-7xl">
          <h2 className="mb-16 font-serif text-4xl font-bold text-center">
            {t.why.title}
          </h2>

          <div className="grid gap-10 md:grid-cols-4">
            {t.why.items.map(([title, desc], i) => (
              <div
                key={i}
                className="p-8 rounded-3xl
                bg-[#11100F] border border-white/10
                hover:border-[#7A4A2A]/60 transition"
              >
                <h3 className="mb-3 font-serif text-lg font-semibold">
                  {title}
                </h3>
                <p className="text-sm text-white/60">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="contact"
        className="py-28 text-center text-[#F3E9D2]
        bg-gradient-to-br from-[#5E361F] to-[#2E1A10]"
      >
        <div className="max-w-4xl px-6 mx-auto">
          <h2 className="mb-6 font-serif text-4xl font-bold">
            {t.contact.title}
          </h2>

          <p className="mb-10 text-lg text-white/80">{t.contact.desc}</p>

          <div className="space-y-3 text-lg">
            <p>Email: arkahf65@gmail.com</p>
            <p>WhatsApp: +6281809193482</p>
          </div>

          <div className="mt-10">
            <a
              href="https://wa.me/6281809193482?text=Halo%20Arkahf,%20saya%20tertarik%20dengan%20produk%20gagang%20kayu."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 font-semibold transition
              rounded-xl bg-[#F3E9D2] text-[#2E1A10]
              hover:bg-[#E6D8BC]"
            >
              {t.contact.cta}
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-sm text-center bg-black text-white/50">
        © {new Date().getFullYear()} {t.footer.brand}
      </footer>
    </div>
  );
}
