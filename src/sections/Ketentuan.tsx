
type Props = {
  lang: "id" | "en";
};

type Term = {
  number: string;
  title: string;
  description: string;
  icon: "custom" | "production" | "quality";
};


const termsByLanguage: Record<"id" | "en", Term[]> = {
  id: [
    {
      number: "01",
      title: "Pesanan Custom & Produksi",
      description:
        "Kami menerima permintaan bentuk dan ukuran khusus sesuai kebutuhan. Waktu pengerjaan menyesuaikan jumlah pesanan, tingkat kerumitan, dan ketersediaan bahan. Detail pesanan serta estimasi produksi dikonfirmasi sebelum pengerjaan.",
      icon: "production",
    },
    {
      number: "02",
      title: "Pembayaran DP 50%",
      description:
        "Pemesanan dikonfirmasi setelah pembayaran uang muka (DP) sebesar 50% dari total pesanan. Proses produksi dimulai setelah DP diterima.",
      icon: "custom",
    },
    {
      number: "03",
      title: "Pelunasan Pembayaran",
      description:
        "Sisa pembayaran sebesar 50% wajib dilunasi setelah barang selesai diproduksi dan siap dikirim. Pengiriman dilakukan setelah pelunasan diterima.",
      icon: "quality",
    },
  ],
  en: [
    {
      number: "01",
      title: "Custom Orders & Production",
      description:
        "We accept requests for custom shapes and sizes. Production time depends on order quantity, complexity, and material availability. Order details and estimated production time will be confirmed before production begins.",
      icon: "production",
    },
    {
      number: "02",
      title: "50% Down Payment",
      description:
        "Orders are confirmed after a 50% down payment of the total order value is received. Production begins once the down payment has been received.",
      icon: "custom",
    },
    {
      number: "03",
      title: "Final Payment",
      description:
        "The remaining 50% must be paid once the products are completed and ready for shipment. The order will be shipped after the full payment is received.",
      icon: "quality",
    },
  ],
};


function TermIcon({ type }: { type: Term["icon"] }) {
  const commonProps = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  switch (type) {
    case "custom":
      return (
        <svg {...commonProps}>
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L9 17l-4 1 1-4Z" />
          <path d="m15 5 3 3" />
        </svg>
      );

    case "production":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );

    case "quality":
      return (
        <svg {...commonProps}>
          <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
  }
}

export default function Ketentuan({ lang }: Props) {
  const isEnglish = lang === "en";
  const terms = termsByLanguage[lang];

  return (
    <section
      id="ketentuan"
      aria-labelledby="ketentuan-title"
      className="relative overflow-hidden bg-[#F1EFE6] px-5 py-16 text-[#292D29] sm:px-8 sm:py-20 lg:px-12"
    >
      {/* Dekorasi latar */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#315747]/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#B58A5A]/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#315747] sm:text-sm">
            {isEnglish ? "Before You Order" : "Informasi Pemesanan"}
          </p>

          <h2
            id="ketentuan-title"
            className="text-3xl font-bold tracking-tight text-[#292D29] sm:text-4xl lg:text-5xl"
          >
            {isEnglish ? "Terms & Conditions" : "Ketentuan Pemesanan"}
          </h2>

          <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-[#B58A5A]" />

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#686B62] sm:text-base">
            {isEnglish
              ? "Please review the following information to help ensure a smooth ordering and production process."
              : "Mohon perhatikan informasi berikut agar proses pemesanan dan produksi berjalan lancar."}
          </p>
        </div>

        {/* Daftar ketentuan */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {terms.map((term) => (
            <article
              key={term.number}
              className="group relative flex h-full flex-col rounded-2xl border border-[#E0DED3] bg-white/80 p-6 shadow-sm shadow-[#292D29]/5 transition-all duration-300 hover:-translate-y-1 hover:border-[#315747]/40 hover:bg-white hover:shadow-lg hover:shadow-[#292D29]/10 sm:p-7"
            >
              <div className="mb-7 flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#315747]/15 bg-[#315747]/10 text-[#315747] transition-colors duration-300 group-hover:bg-[#315747] group-hover:text-white">
                  <TermIcon type={term.icon} />
                </span>

                <span className="text-sm font-bold tracking-[0.2em] text-[#B58A5A]">
                  {term.number}
                </span>
              </div>

              <h3 className="mb-3 text-lg font-bold text-[#292D29] sm:text-xl">
                {term.title}
              </h3>

              <p className="flex-1 text-sm leading-7 text-[#686B62] sm:text-base">
                {term.description}
              </p>

              <div className="mt-6 h-px w-full bg-gradient-to-r from-[#B58A5A]/50 via-[#315747]/15 to-transparent" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
