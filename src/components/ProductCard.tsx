import { useState } from "react";

type Props = {
  lang: "id" | "en";
  t: any;
  product: any;
  compact?: boolean; // untuk modal all products (lebih kecil)
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

  return (
    <div
      className={`${compact ? "p-6" : "p-8"} transition rounded-3xl
      bg-[#11100F] border border-white/10 hover:border-[#7A4A2A]/60`}
    >
      <button
        type="button"
        className={`relative w-full ${compact ? "h-48" : "h-56"} mb-6 overflow-hidden rounded-2xl`}
        onClick={() => onOpenImage(product.image, product.title)}
      >
        <span className="absolute z-10 px-3 py-1 text-xs border rounded-full left-3 top-3 border-white/15 bg-black/50 text-white/80 backdrop-blur">
          {lang === "id" ? "Pre-Order" : "Pre-Order"}
        </span>

        <img
          src={product.image}
          alt={product.title}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
      </button>

      <h3
        className={`mb-2 font-serif ${compact ? "text-lg" : "text-xl"} font-semibold`}
      >
        {product.title}
      </h3>

      <p className="mb-4 text-sm text-white/60">{product.short}</p>

      <button
        onClick={() => setIsOpen((v) => !v)}
        className="font-medium text-[#D6B98C] hover:underline"
      >
        {isOpen ? t.products.detailClose : t.products.detailOpen}
      </button>

      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "mt-4 opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`
            overflow-y-auto pr-2
            max-h-[45vh] md:max-h-[520px]
            ${isOpen ? "block" : "hidden"}
          `}
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <div className="space-y-4 text-sm leading-relaxed text-white/70">
            <div>
              <p className="mb-1 font-semibold text-white/80">
                {lang === "id" ? "Deskripsi" : "Description"}
              </p>
              {product.detail.description.map((d: string, idx: number) => (
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

            <div>
              <p className="mb-1 font-semibold text-white/80">
                {lang === "id" ? "Spesifikasi Produk" : "Specifications"}
              </p>
              <ul className="space-y-1 text-white/70">
                {product.detail.specs.map((s: any, idx: number) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-white/60 w-28 shrink-0">
                      {s.label}:
                    </span>
                    <span>{s.value}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-1 font-semibold text-white/80">
                {lang === "id" ? "Kelebihan Produk" : "Benefits"}
              </p>
              <ul className="pl-5 space-y-1 list-disc text-white/70">
                {product.detail.benefits.map((b: string, idx: number) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
