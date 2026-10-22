
import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";

const CATEGORY_IDS = [
  "all",
  "gagang_sabit",
  "kotak_kayu_serbaguna",
  "keranjang_full_rang",
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
  const [activeCategory, setActiveCategory] =
    useState<CategoryId>("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const categoryLabel = (id: CategoryId) => {
    const labels = {
      id: {
        all: "Semua Produk",
        gagang_sabit: "Gagang Sabit",
        kotak_kayu_serbaguna: "Kotak Kayu",
        keranjang_full_rang: "Keranjang Full Rang",
      },
      en: {
        all: "All Products",
        gagang_sabit: "Sickle Handles",
        kotak_kayu_serbaguna: "Wooden Boxes",
        keranjang_full_rang: "Full Range Baskets",
      },
    } as const;

    return labels[lang][id];
  };

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return products.filter((product) => {
      const matchCategory =
        activeCategory === "all" ||
        product.categoryId === activeCategory;

      const searchableText = [
        product.title,
        product.short,
        product.detail?.description,
        ...(product.detail?.specs ?? []),
        ...(product.detail?.benefits ?? []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchQuery =
        !query || searchableText.includes(query);

      return matchCategory && matchQuery;
    });
  }, [products, searchQuery, activeCategory]);

  const hasFilters =
    searchQuery.trim().length > 0 || activeCategory !== "all";

  const resetFilters = () => {
    setSearchQuery("");
    setActiveCategory("all");
  };

  return (
    <div
      className="
        fixed inset-0 z-[999] flex items-center justify-center
        overflow-y-auto bg-[#172019]/70 p-2 backdrop-blur-sm
        sm:p-4
      "
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="all-products-title"
    >
      <div
        className="
          mx-auto flex max-h-[96dvh] w-full max-w-7xl flex-col
          overflow-hidden rounded-2xl border border-[#E5E7DE]
          bg-[#F7F5EF] shadow-2xl
          sm:max-h-[92dvh] sm:rounded-3xl
        "
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div
          className="
            flex shrink-0 items-center justify-between gap-3
            border-b border-[#E6E8DF] bg-white px-4 py-4
            sm:px-6 sm:py-5 lg:px-8
          "
        >
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="
                hidden size-11 shrink-0 items-center justify-center
                rounded-2xl bg-[#EAF0E8] text-[#315747]
                sm:flex
              "
              aria-hidden="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 5.5A1.5 1.5 0 0 1 5.5 4H10v7H4V5.5ZM14 4h4.5A1.5 1.5 0 0 1 20 5.5V11h-6V4ZM4 15h6v5H5.5A1.5 1.5 0 0 1 4 18.5V15ZM14 14h6v4.5a1.5 1.5 0 0 1-1.5 1.5H14v-6Z"
                />
              </svg>
            </div>

            <div className="min-w-0">
              <p
                className="
                  mb-1 text-[10px] font-bold uppercase tracking-[0.2em]
                  text-[#9B754E] sm:text-xs
                "
              >
                Arkahf Craft
              </p>

              <h3
                id="all-products-title"
                className="
                  font-serif text-xl font-bold leading-tight
                  text-[#294737] sm:text-2xl lg:text-3xl
                "
              >
                {t.products.allTitle}
              </h3>

              <p className="mt-1 hidden text-sm text-[#737B70] sm:block">
                {lang === "id"
                  ? "Temukan produk kayu yang sesuai kebutuhan Anda."
                  : "Discover wooden products for your needs."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              flex size-10 shrink-0 items-center justify-center
              rounded-full border border-[#E4E7DE] bg-[#F7F5EF]
              text-[#526154] transition hover:border-[#315747]
              hover:bg-[#EAF0E8] hover:text-[#294737]
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-[#315747]
            "
            aria-label={t.products.close}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="size-5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m18 6-12 12M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div
          className="
            min-h-0 flex-1 overflow-y-auto overscroll-contain
            px-4 py-5 sm:px-6 sm:py-6 lg:px-8
          "
        >
          {/* Search */}
          <div className="mb-5">
            <label
              htmlFor="product-search"
              className="
                mb-2 block text-sm font-semibold text-[#344A3A]
              "
            >
              {lang === "id" ? "Cari produk" : "Search products"}
            </label>

            <div className="relative w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="
                  pointer-events-none absolute left-4 top-1/2
                  size-5 -translate-y-1/2 text-[#788477]
                "
                aria-hidden="true"
              >
                <circle cx="10.8" cy="10.8" r="6.8" />
                <path
                  strokeLinecap="round"
                  d="m16 16 4 4"
                />
              </svg>

              <input
                id="product-search"
                type="search"
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(event.target.value)
                }
                placeholder={
                  lang === "id"
                    ? "Contoh: kotak kayu, keranjang..."
                    : "e.g. wooden box, basket..."
                }
                className="
                  w-full rounded-2xl border border-[#E0E4D9]
                  bg-white py-3.5 pl-12 pr-4 text-sm
                  text-[#292D29] shadow-sm outline-none
                  transition placeholder:text-[#9A9F95]
                  focus:border-[#78917B] focus:ring-4
                  focus:ring-[#315747]/10
                "
              />
            </div>
          </div>

          {/* Category filters */}
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="size-4 text-[#315747]"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M7 12h10m-7 6h4"
                />
              </svg>

              <span className="text-sm font-semibold text-[#344A3A]">
                {lang === "id" ? "Kategori produk" : "Product categories"}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {CATEGORY_IDS.map((categoryId) => {
                const active = categoryId === activeCategory;

                return (
                  <button
                    key={categoryId}
                    type="button"
                    onClick={() => setActiveCategory(categoryId)}
                    aria-pressed={active}
                    className={[
                      "rounded-xl border px-3.5 py-2.5 text-xs font-semibold",
                      "transition-all duration-200 sm:px-4 sm:text-sm",
                      "focus-visible:outline-none focus-visible:ring-2",
                      "focus-visible:ring-[#315747] focus-visible:ring-offset-2",
                      active
                        ? "border-[#315747] bg-[#315747] text-white shadow-sm"
                        : "border-[#E0E4D9] bg-white text-[#59665B] hover:border-[#9CAD9A] hover:bg-[#EEF2EA] hover:text-[#294737]",
                    ].join(" ")}
                  >
                    {categoryLabel(categoryId)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results count */}
          <div
            className="
              mb-5 flex flex-wrap items-center justify-between
              gap-3 border-b border-[#E4E7DD] pb-4
            "
          >
            <p
              className="text-sm text-[#737B70]"
              aria-live="polite"
              aria-atomic="true"
            >
              {lang === "id" ? (
                <>
                  Menampilkan{" "}
                  <span className="font-bold text-[#294737]">
                    {filteredProducts.length}
                  </span>{" "}
                  produk
                </>
              ) : (
                <>
                  Showing{" "}
                  <span className="font-bold text-[#294737]">
                    {filteredProducts.length}
                  </span>{" "}
                  products
                </>
              )}
            </p>

            {hasFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="
                  inline-flex items-center gap-1.5 rounded-lg
                  px-2 py-1.5 text-sm font-semibold
                  text-[#315747] transition hover:bg-[#EAF0E8]
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-[#315747]
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="size-4"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 7v5h5M20 17v-5h-5"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.5 12a7 7 0 0 1 12-4.8L20 10M4 14l2.5 2.8A7 7 0 0 0 18.5 12"
                  />
                </svg>

                {lang === "id" ? "Reset filter" : "Reset filters"}
              </button>
            )}
          </div>

          {/* Product grid */}
          {filteredProducts.length === 0 ? (
            <div
              className="
                flex flex-col items-center justify-center
                rounded-3xl border border-dashed border-[#D9DFD3]
                bg-white px-5 py-12 text-center
              "
            >
              <div
                className="
                  mb-4 flex size-16 items-center justify-center
                  rounded-full bg-[#EAF0E8] text-[#315747]
                "
                aria-hidden="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="size-8"
                >
                  <circle cx="10.8" cy="10.8" r="6.8" />
                  <path
                    strokeLinecap="round"
                    d="m16 16 4 4M8 10h5"
                  />
                </svg>
              </div>

              <h4 className="text-lg font-bold text-[#294737]">
                {lang === "id"
                  ? "Produk belum ditemukan"
                  : "No products found"}
              </h4>

              <p className="mt-2 max-w-sm text-sm leading-6 text-[#737B70]">
                {lang === "id"
                  ? "Coba kata kunci lain atau pilih kategori yang berbeda."
                  : "Try another keyword or choose a different category."}
              </p>

              {hasFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="
                    mt-5 rounded-xl bg-[#315747] px-5 py-3
                    text-sm font-semibold text-white transition
                    hover:bg-[#294737] focus-visible:outline-none
                    focus-visible:ring-2 focus-visible:ring-[#315747]
                    focus-visible:ring-offset-2
                  "
                >
                  {lang === "id" ? "Lihat semua produk" : "View all products"}
                </button>
              )}
            </div>
          ) : (
            <div
              className="
                grid grid-cols-1 items-start gap-4
                sm:grid-cols-2 sm:gap-5
                lg:grid-cols-3 lg:gap-6
                xl:grid-cols-4
              "
            >
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={`${product.id}-${index}`}
                  lang={lang}
                  t={t}
                  product={product}
                  compact
                  onOpenImage={onOpenImage}
                />
              ))}
            </div>
          )}

          {/* Footer note */}
          {filteredProducts.length > 0 && (
            <p className="mt-8 text-center text-xs leading-5 text-[#858B80]">
              {lang === "id"
                ? "Arkahf Craft · Produk kayu dengan perhatian pada detail."
                : "Arkahf Craft · Wooden products crafted with attention to detail."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
