
type Props = {
  periodStart: string;
  periodEnd: string;
  setPeriodStart: (value: string) => void;
  setPeriodEnd: (value: string) => void;
};

export default function PeriodSection({
  periodStart,
  periodEnd,
  setPeriodStart,
  setPeriodEnd,
}: Props) {
  const inputClass =
    "mt-2 w-full rounded-xl border border-[#E8E4DA] bg-[#FAF9F6] px-3.5 py-3 text-sm text-[#263B30] outline-none transition hover:border-[#294B3A]/30 focus:border-[#294B3A] focus:bg-white focus:ring-4 focus:ring-[#294B3A]/10";

  return (
    <section className="rounded-2xl border border-[#E8E4DA] bg-white p-5 shadow-[0_4px_20px_rgba(38,59,48,0.04)] transition hover:shadow-[0_8px_25px_rgba(38,59,48,0.07)] sm:p-6">

      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#294B3A]/10 text-sm font-bold text-[#294B3A]">
          01
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#263B30]">
            Periode Penjualan
          </h2>

          <p className="mt-0.5 text-xs text-[#92958D]">
            Tentukan rentang tanggal totalisasi.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">

        <label className="block text-sm font-semibold text-[#35473B]">
          Tanggal Mulai

          <input
            type="date"
            value={periodStart}
            onChange={(e) =>
              setPeriodStart(e.target.value)
            }
            className={inputClass}
          />
        </label>

        <label className="block text-sm font-semibold text-[#35473B]">
          Tanggal Akhir

          <input
            type="date"
            min={periodStart || undefined}
            value={periodEnd}
            onChange={(e) =>
              setPeriodEnd(e.target.value)
            }
            className={inputClass}
          />
        </label>

      </div>

      <div className="mt-4 flex items-start gap-2 rounded-xl bg-[#F7F5EF] px-3.5 py-3">
        <span className="mt-0.5 text-[#C58B4A]">●</span>

        <p className="text-xs leading-5 text-[#777C73]">
          Gunakan periode yang sama dengan laporan pesanan selesai dari Shopee.
        </p>
      </div>

    </section>
  );
}
