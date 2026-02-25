import { useEffect, useState } from "react";
import logoArkahf from "../assets/arkhafLogo2.png";
import LanguageToggle from "../components/languageToggle";

type Props = {
  lang: "id" | "en";
  setLang: (l: "id" | "en") => void;
  t: any;
};

export default function Navbar({ lang, setLang, t }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  // tutup menu saat klik ESC (opsional)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobileMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur">
      <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
        <a
          href="#"
          className="flex items-center gap-3"
          onClick={closeMobileMenu}
        >
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

          <button
            type="button"
            className="inline-flex items-center justify-center w-10 h-10 border rounded-xl border-white/10 bg-white/5 text-white/80 hover:bg-white/10 md:hidden"
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            {mobileMenuOpen ? (
              <span className="text-2xl leading-none">✕</span>
            ) : (
              <span className="text-2xl leading-none">☰</span>
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          className="md:hidden"
          role="dialog"
          aria-modal="true"
          onClick={closeMobileMenu}
        >
          <div className="fixed inset-0 z-40 bg-black/60" />

          <div
            className="fixed top-[72px] left-0 right-0 z-50 mx-auto w-full max-w-7xl px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-2xl border border-white/10 bg-[#0B0B0B] shadow-2xl overflow-hidden">
              <div className="flex flex-col p-4 text-white/80">
                <a
                  href="#about"
                  className="px-4 py-3 rounded-xl hover:bg-white/5"
                  onClick={closeMobileMenu}
                >
                  {t.nav.about}
                </a>
                <a
                  href="#products"
                  className="px-4 py-3 rounded-xl hover:bg-white/5"
                  onClick={closeMobileMenu}
                >
                  {t.nav.products}
                </a>
                <a
                  href="#why"
                  className="px-4 py-3 rounded-xl hover:bg-white/5"
                  onClick={closeMobileMenu}
                >
                  {t.nav.why}
                </a>
                <a
                  href="#contact"
                  className="px-4 py-3 rounded-xl hover:bg-white/5"
                  onClick={closeMobileMenu}
                >
                  {t.nav.contact}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
