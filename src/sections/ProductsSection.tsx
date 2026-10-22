
import { useMemo } from "react";
import ProductCard from "../components/ProductCard";
import ImagePreviewModal from "../modals/ImagePreviewModal";
import AllProductsModal from "../modals/AllProductsModal";

type Props = {
  lang: "id" | "en";
  t: any;
  products: any[];

  onOpenImage: (src: string, alt: string) => void;
  onOpenAll: () => void;

  showAllProducts: boolean;
  onCloseAll: () => void;

  previewSrc: string | null;
  previewAlt: string;
  onClosePreview: () => void;
};

export default function ProductsSection({
  lang,
  t,
  products,
  onOpenImage,
  onOpenAll,
  showAllProducts,
  onCloseAll,
  previewSrc,
  previewAlt,
  onClosePreview,
}: Props) {
  const MAX_VISIBLE = 4;
  const hasMore = products.length > MAX_VISIBLE;
  const visibleCount = hasMore ? MAX_VISIBLE - 1 : MAX_VISIBLE;

  const visibleProducts = useMemo(
    () => products.slice(0, visibleCount),
    [products, visibleCount],
  );

  const remainingProducts = products.length - visibleCount;

  return (
    <section
      id="products"
      className="scroll-mt-24 overflow-hidden bg-[#F7F5EF] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-8">
        {/* Heading Section */}
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14 lg:mb-16">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#DCE5D9] bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#315747] shadow-sm shadow-[#294737]/5 sm:text-sm">
            <span
              className="h-2 w-2 rounded-full bg-[#C58B55]"
              aria-hidden="true"
            />
            Arkahf Craft Collection
          </span>

          <h2 className="font-serif text-3xl font-bold leading-tight tracking-tight text-[#294737] sm:text-4xl lg:text-5xl">
            {t.products.title}
          </h2>

          <div
            className="mx-auto mt-5 h-1 w-16 rounded-full bg-[#C58B55]"
            aria-hidden="true"
          />
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-7">
            {visibleProducts.map((product) => (
              <div
                key={product.id}
                className="min-w-0"
              >
                <ProductCard
                  lang={lang}
                  t={t}
                  product={product}
                  onOpenImage={onOpenImage}
                />
              </div>
            ))}

            {/* Kartu Lihat Semua Produk */}
            {hasMore && (
              <button
                type="button"
                onClick={onOpenAll}
                aria-label={`${t.products.openAll}: ${remainingProducts} ${lang === "id" ? "produk lainnya" : "more products"
                  }`}
                className="group relative flex min-h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[#E3E2D9] bg-white text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#B8CDB9] hover:shadow-xl hover:shadow-[#294737]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315747] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F7F5EF]"
              >
                {/* Background dekoratif */}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#EAF0E9]/70 via-white to-[#F0D7B6]/20"
                  aria-hidden="true"
                />

                <div className="relative flex flex-1 flex-col p-5 sm:p-6">
                  {/* Ilustrasi kartu */}
                  <div className="relative flex min-h-52 flex-1 items-center justify-center overflow-hidden rounded-xl border border-[#E5E7DE] bg-[#F7F8F3] sm:min-h-56">
                    {/* Lingkaran dekoratif */}
                    <div
                      className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#C58B55]/10 blur-2xl transition duration-500 group-hover:bg-[#C58B55]/20"
                      aria-hidden="true"
                    />

                    <div
                      className="pointer-events-none absolute -bottom-12 -left-8 h-40 w-40 rounded-full bg-[#315747]/10 blur-2xl"
                      aria-hidden="true"
                    />

                    {/* Badge jumlah produk */}
                    <span className="absolute right-3 top-3 rounded-full border border-[#DCE5D9] bg-white/90 px-3 py-1.5 text-xs font-bold text-[#315747] shadow-sm">
                      +{remainingProducts}
                    </span>

                    {/* Ikon */}
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-[#DCE5D9] bg-white text-[#315747] shadow-md shadow-[#294737]/5 transition duration-300 group-hover:scale-105 group-hover:border-[#315747]/30 group-hover:bg-[#EAF0E9] sm:h-24 sm:w-24">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="38"
                        height="38"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="7"
                          height="7"
                          rx="1.5"
                        />
                        <rect
                          x="14"
                          y="3"
                          width="7"
                          height="7"
                          rx="1.5"
                        />
                        <rect
                          x="3"
                          y="14"
                          width="7"
                          height="7"
                          rx="1.5"
                        />
                        <path d="M17.5 14v7" />
                        <path d="M14 17.5h7" />
                      </svg>
                    </div>
                  </div>

                  {/* Deskripsi kartu */}
                  <div className="flex flex-1 flex-col pt-6">
                    <h3 className="font-serif text-xl font-bold leading-snug text-[#294737] sm:text-2xl">
                      {t.products.moreTitle}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-[#6B7068]">
                      {t.products.moreDescPrefix} {remainingProducts}{" "}
                      {t.products.moreDescSuffix}
                    </p>

                    <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                      <span className="text-sm font-bold text-[#315747] transition-colors group-hover:text-[#C58B55]">
                        {t.products.openAll}
                      </span>

                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EAF0E9] text-lg text-[#315747] transition duration-300 group-hover:translate-x-1 group-hover:bg-[#315747] group-hover:text-white"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            )}
          </div>
        ) : (
          /* Tampilan jika katalog kosong */
          <div className="rounded-2xl border border-dashed border-[#D7D8CE] bg-white/70 px-5 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF0E9] text-[#315747]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
            </div>

            <p className="mt-4 font-semibold text-[#294737]">
              {lang === "id"
                ? "Produk akan ditampilkan di sini."
                : "Products will appear here."}
            </p>
          </div>
        )}

        {/* Modal Preview Gambar */}
        {previewSrc && (
          <ImagePreviewModal
            src={previewSrc}
            alt={previewAlt}
            onClose={onClosePreview}
            closeLabel={t.products.close}
          />
        )}

        {/* Modal Semua Produk */}
        {showAllProducts && (
          <AllProductsModal
            lang={lang}
            t={t}
            products={products}
            onClose={onCloseAll}
            onOpenImage={onOpenImage}
          />
        )}
      </div>
    </section>
  );
}
