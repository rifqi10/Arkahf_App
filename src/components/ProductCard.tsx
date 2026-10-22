
import { useState } from "react";

type Props = {
  lang: "id" | "en";
  t: any;
  product: any;
  compact?: boolean;
  onOpenImage: (src: string, alt: string) => void;
};

export default function ProductCard({
  lang,
  t,
  product,
  compact,
  onOpenImage,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const detailsId = `product-details-${String(product.id)}`;

  return (
    <article
      className={`group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[#E7E5DC] bg-white shadow-sm shadow-[#294737]/5 transition duration-300 hover:-translate-y-1 hover:border-[#C4D4C4] hover:shadow-xl hover:shadow-[#294737]/10 ${
        compact ? "p-4 sm:p-5" : "p-5 sm:p-6"
      }`}
    >
      {/* Gambar Produk */}
      <button
        type="button"
        className={`relative mb-5 block w-full overflow-hidden rounded-xl border border-[#ECEAE2] bg-[#F7F5EF] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315747] focus-visible:ring-offset-2 ${
          compact ? "h-44 sm:h-48" : "h-52 sm:h-56"
        }`}
        onClick={() => onOpenImage(product.image, product.title)}
        aria-label={
          lang === "id"
            ? `Lihat gambar ${product.title}`
            : `View image of ${product.title}`
        }
      >
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Label Pre-Order */}
        <span className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/95 px-3 py-1.5 text-xs font-bold text-[#315747] shadow-sm backdrop-blur">
          <span
            className="h-1.5 w-1.5 rounded-full bg-[#C58B55]"
            aria-hidden="true"
          />
          Pre-Order
        </span>

        {/* Ikon perbesar gambar */}
        <span
          className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-xl border border-white/70 bg-white/90 text-[#315747] shadow-sm transition duration-200 group-hover:bg-[#315747] group-hover:text-white"
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
            <path d="M11 8v6" />
            <path d="M8 11h6" />
          </svg>
        </span>
      </button>

      {/* Informasi Produk */}
      <div className="flex flex-1 flex-col">
        <h3
          className={`mb-2 break-words font-serif font-bold leading-snug text-[#294737] ${
            compact ? "text-lg" : "text-xl"
          }`}
        >
          {product.title}
        </h3>

        <p className="mb-5 text-sm leading-6 text-[#6B7068]">
          {product.short}
        </p>

        {/* Tombol Detail */}
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls={detailsId}
          className="mt-auto inline-flex min-h-11 w-full items-center justify-between gap-3 rounded-xl border border-[#DCE5D9] bg-[#F5F8F3] px-4 py-3 text-left text-sm font-bold text-[#315747] transition duration-200 hover:border-[#B8CDB9] hover:bg-[#EAF0E9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315747] focus-visible:ring-offset-2"
        >
          <span>
            {isOpen ? t.products.detailClose : t.products.detailOpen}
          </span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={`shrink-0 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        {/* Detail Produk */}
        <div
          id={detailsId}
          hidden={!isOpen}
          className={`mt-4 overflow-hidden rounded-xl border border-[#E7E5DC] bg-[#FAFAF6] ${
            compact ? "p-3" : "p-4"
          }`}
        >
          <div className="space-y-5 text-sm leading-6 text-[#62675F]">
            {/* Deskripsi */}
            <div>
              <h4 className="mb-2 font-bold text-[#294737]">
                {lang === "id" ? "Deskripsi" : "Description"}
              </h4>

              <div className="space-y-2">
                {product.detail.description.map(
                  (description: string, idx: number) => (
                    <p key={idx}>{description}</p>
                  ),
                )}
              </div>

              {product.detail.note && (
                <p className="mt-3 rounded-lg border-l-2 border-[#C58B55] bg-[#F0D7B6]/20 px-3 py-2 italic text-[#777A71]">
                  {product.detail.note}
                </p>
              )}
            </div>

            {/* Spesifikasi */}
            <div>
              <h4 className="mb-3 font-bold text-[#294737]">
                {lang === "id" ? "Spesifikasi Produk" : "Specifications"}
              </h4>

              <dl className="space-y-2">
                {product.detail.specs.map((spec: any, idx: number) => (
                  <div
                    key={idx}
                    className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-3 border-b border-[#E7E5DC] pb-2 last:border-b-0 last:pb-0"
                  >
                    <dt className="break-words text-[#777A71]">
                      {spec.label}
                    </dt>

                    <dd className="break-words font-medium text-[#3E493E]">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Kelebihan */}
            <div>
              <h4 className="mb-2 font-bold text-[#294737]">
                {lang === "id" ? "Kelebihan Produk" : "Benefits"}
              </h4>

              <ul className="space-y-2">
                {product.detail.benefits.map(
                  (benefit: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E5EDE3] text-xs font-bold text-[#315747]"
                        aria-hidden="true"
                      >
                        ✓
                      </span>

                      <span className="min-w-0 break-words">
                        {benefit}
                      </span>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
