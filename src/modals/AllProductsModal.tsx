import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";

const CATEGORY_IDS = [
  "all",
  "gagang_sabit",
  "talenan",
  "balok_kubus",
  "kotak_kayu_serbaguna",
] as const;

type CategoryId = (typeof CATEGORY_IDS)[number];

type Props = {
  lang: "id" | "en";
  t: any;
  products: any[];
  onClose: () => void;
  onOpenImage: (src: string, alt: string) => void;
};

export default function AllProductsModal({
  lang,
  t,
  products,
  onClose,
  onOpenImage,
}: Props) {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const categoryLabel = (id: CategoryId) => {
    const labels = {
      id: {
        all: "Semua",
        gagang_sabit: "Gagang Sabit",
        talenan: "Talenan",
        balok_kubus: "Balok/Kubus",
        kotak_kayu_serbaguna: "Kotak Kayu Serbaguna",
      },
      en: {
        all: "All",
        gagang_sabit: "Sickle Handles",
        talenan: "Cutting Boards",
        balok_kubus: "Blocks/Cubes",
        kotak_kayu_serbaguna: "Multipurpose Wooden Boxes",
      },
    } as const;

    return labels[lang][id];
  };

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return products.filter((p) => {
      const matchCategory =
        activeCategory === "all" ? true : p.categoryId === activeCategory;

      const matchQuery = !q
        ? true
        : (p.title + " " + p.short).toLowerCase().includes(q);

      return matchCategory && matchQuery;
    });
  }, [products, searchQuery, activeCategory]);

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/80 p-4"
      onClick={onClose}
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
            onClick={onClose}
            className="px-3 py-2 rounded-full bg-white/10 hover:bg-white/20"
            aria-label={t.products.close}
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-6 overflow-y-auto">
          <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-md">
              <span className="absolute -translate-y-1/2 pointer-events-none left-4 top-1/2 text-white/50">
                🔎
              </span>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  lang === "id" ? "Cari produk..." : "Search products..."
                }
                className="
                  w-full rounded-2xl border border-white/10 bg-white/5
                  pl-11 pr-4 py-3 text-white/85 placeholder:text-white/40
                  outline-none transition
                  focus:border-[#7A4A2A]/70 focus:bg-white/7
                "
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 px-3 py-2 text-sm border rounded-xl border-white/10 bg-white/5 text-white/70">
                <span className="opacity-80">⛃</span>
                {lang === "id" ? "Filter:" : "Filter:"}
              </span>

              {CATEGORY_IDS.map((catId) => {
                const active = catId === activeCategory;
                return (
                  <button
                    key={catId}
                    type="button"
                    onClick={() => setActiveCategory(catId)}
                    className={`
                      rounded-xl px-4 py-2 text-sm transition border
                      ${
                        active
                          ? "bg-[#7A4A2A]/25 border-[#7A4A2A]/60 text-[#F3E9D2]"
                          : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                      }
                    `}
                  >
                    {categoryLabel(catId)}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between mb-6 text-sm text-white/50">
            <span>
              {lang === "id"
                ? `Menampilkan ${filteredProducts.length} produk`
                : `Showing ${filteredProducts.length} products`}
            </span>

            {(searchQuery.trim() || activeCategory !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="text-[#D6B98C] hover:underline"
              >
                {lang === "id" ? "Reset" : "Reset"}
              </button>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="p-8 text-center border rounded-2xl border-white/10 bg-white/5 text-white/70">
              {lang === "id"
                ? "Produk tidak ditemukan. Coba kata kunci lain atau ubah filter."
                : "No products found. Try another keyword or change filters."}
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {filteredProducts.map((product, i) => (
                <ProductCard
                  key={`${product.id}-${i}`}
                  lang={lang}
                  t={t}
                  product={product}
                  compact
                  onOpenImage={onOpenImage}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
