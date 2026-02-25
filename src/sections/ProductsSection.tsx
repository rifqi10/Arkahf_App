import { useMemo, useState } from "react";
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

  return (
    <section id="products" className="py-28 bg-[#070707]">
      <div className="px-6 mx-auto max-w-7xl">
        <h2 className="mb-16 font-serif text-4xl font-bold text-center">
          {t.products.title}
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {visibleProducts.map((product, i) => (
            <ProductCard
              key={product.id}
              lang={lang}
              t={t}
              product={product}
              onOpenImage={onOpenImage}
            />
          ))}

          {hasMore && (
            <button
              type="button"
              onClick={onOpenAll}
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

        {previewSrc && (
          <ImagePreviewModal
            src={previewSrc}
            alt={previewAlt}
            onClose={onClosePreview}
            closeLabel={t.products.close}
          />
        )}

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
