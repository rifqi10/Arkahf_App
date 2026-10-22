
import { useEffect, useState } from "react";
import logoArkahf from "../assets/arkhafLogo2.webp";
import LanguageToggle from "../components/languageToggle";

type Props = {
  lang: "id" | "en";
  setLang: (l: "id" | "en") => void;
  t: any;
};

export default function Navbar({ lang, setLang, t }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMobileMenu();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  // Mencegah halaman bergulir ketika menu mobile terbuka.
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: "#about", label: t.nav.about },
    { href: "#products", label: t.nav.products },
    { href: "#why", label: t.nav.why },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-[#E7E5DC]/80 bg-[#F7F5EF]/90 shadow-sm shadow-[#292D29]/5 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
          {/* Logo */}
          <a
            href="#"
            onClick={closeMobileMenu}
            aria-label="Arkahf Craft - Home"
            className="flex min-w-0 shrink-0 items-center rounded-lg transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315747] focus-visible:ring-offset-2"
          >
            <img
              src={logoArkahf}
              alt="Arkahf Craft"
              className="h-9 w-auto object-contain sm:h-11 lg:h-12"
            />
          </a>

          {/* Navigasi Desktop */}
          <div className="hidden items-center gap-6 lg:flex xl:gap-8">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="whitespace-nowrap text-sm font-semibold text-[#555D53] transition-colors duration-200 hover:text-[#315747] focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315747]"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Bahasa dan Tombol Menu Mobile */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <LanguageToggle lang={lang} onChange={setLang} />

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#DCDDD2] bg-white text-[#315747] shadow-sm transition-colors duration-200 hover:bg-[#EAF0E9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315747] lg:hidden"
              aria-label={
                mobileMenuOpen
                  ? lang === "id"
                    ? "Tutup menu"
                    : "Close menu"
                  : lang === "id"
                    ? "Buka menu"
                    : "Open menu"
              }
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              {mobileMenuOpen ? (
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
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              ) : (
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
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[60] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={lang === "id" ? "Menu navigasi" : "Navigation menu"}
          onClick={closeMobileMenu}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-[#202820]/35 backdrop-blur-[2px]" />

          {/* Panel Menu */}
          <div
            id="mobile-navigation"
            className="absolute inset-x-0 top-0 border-b border-[#E7E5DC] bg-[#F7F5EF] shadow-xl shadow-[#292D29]/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Menu */}
            <div className="flex items-center justify-between gap-4 border-b border-[#E7E5DC] px-5 py-4 sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <img
                  src={logoArkahf}
                  alt="Arkahf Craft"
                  className="h-9 w-auto object-contain"
                />

                <span className="truncate text-sm font-semibold text-[#315747]">
                  {lang === "id" ? "Jelajahi Website" : "Explore Website"}
                </span>
              </div>

              <button
                type="button"
                onClick={closeMobileMenu}
                aria-label={lang === "id" ? "Tutup menu" : "Close menu"}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#DCDDD2] bg-white text-[#315747] transition hover:bg-[#EAF0E9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315747]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            {/* Daftar Navigasi */}
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
              <div className="flex flex-col gap-2">
                {navLinks.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="group flex min-h-12 items-center justify-between rounded-xl border border-transparent px-4 py-3 text-sm font-semibold text-[#454D44] transition-all duration-200 hover:border-[#DCE5D9] hover:bg-white hover:text-[#315747] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315747]"
                  >
                    <span>{item.label}</span>

                    <span
                      className="text-lg text-[#9CA69A] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#315747]"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </a>
                ))}
              </div>

              {/* Footer Menu */}
              <div className="mt-4 rounded-xl border border-[#E5E2D7] bg-white/70 px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#315747]">
                  Arkahf Craft
                </p>

                <p className="mt-1 text-xs leading-5 text-[#777A71]">
                  {lang === "id"
                    ? "Kerajinan kayu dengan perhatian pada detail."
                    : "Wooden crafts with attention to detail."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
