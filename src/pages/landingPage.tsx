import { useMemo, useState } from "react";
import SEO from "../components/SEO";
import { useLang } from "../hooks/useLang";
import {
  PRODUCT_IMAGE_BY_ID,
  DEFAULT_PRODUCT_IMAGE,
} from "../assets/productImages";
import type { ProductItem } from "../i18n/index";

import Navbar from "../sections/Navbar";
import Hero from "../sections/Hero";
import About from "../sections/About";
import ProductsSection from "../sections/ProductsSection";
import Why from "../sections/Why";
import Contact from "../sections/Contact";
import Footer from "../sections/Footer";

export default function LandingPage() {
  const { lang, setLang, t } = useLang();

  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [previewAlt, setPreviewAlt] = useState<string>("");
  const [showAllProducts, setShowAllProducts] = useState(false);

  type ProductWithImage = ProductItem & { image: string };

  const products = useMemo<ProductWithImage[]>(() => {
    return t.productsData.map((p) => ({
      ...p,
      image: PRODUCT_IMAGE_BY_ID[p.id] ?? DEFAULT_PRODUCT_IMAGE,
    }));
  }, [t.productsData]);

  return (
    <div className="min-h-screen font-sans text-[#F3E9D2] bg-[#070707]">
      <SEO
        lang={lang}
        title={
          lang === "id"
            ? "Arkahf — Gagang Kayu, Handle & Pegangan Kayu Premium"
            : "Arkahf — Wooden Handles, Handles & Premium Wooden Grips"
        }
        description={
          lang === "id"
            ? "Produk gagang kayu, handle, pegangan alat, serta aksesoris kayu dari Arkahf dibuat dari kayu pilihan (jati/mahoni) dengan finishing rapi. Kuat, ergonomis, dan nyaman digenggam untuk kebutuhan produksi maupun custom."
            : "Arkahf's wooden handles, grips, tool handles, and wooden accessories are made from selected wood (teak/mahogany) with a neat finish. Strong, ergonomic, and comfortable to hold for production and custom needs."
        }
        canonical={
          lang === "id" ? "https://arkahf.com/" : "https://arkahf.com/?lang=en"
        }
        ogImage="https://arkahf.com/logoArkahff.png"
      />

      <Navbar lang={lang} setLang={setLang} t={t} />

      <Hero lang={lang} t={t} />

      <About t={t} />

      <ProductsSection
        lang={lang}
        t={t}
        products={products}
        onOpenImage={(src, alt) => {
          setPreviewSrc(src);
          setPreviewAlt(alt);
        }}
        onOpenAll={() => setShowAllProducts(true)}
        showAllProducts={showAllProducts}
        onCloseAll={() => setShowAllProducts(false)}
        previewSrc={previewSrc}
        previewAlt={previewAlt}
        onClosePreview={() => {
          setPreviewSrc(null);
          setPreviewAlt("");
        }}
      />

      <Why t={t} />

      <Contact t={t} />

      <Footer t={t} />
    </div>
  );
}
