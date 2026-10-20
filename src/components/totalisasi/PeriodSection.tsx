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
    "w-full rounded-xl border border-white/15 bg-white/[0.06] px-3 py-2.5 text-white outline-none focus:border-amber-400";

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 shadow-2xl">
      <h2 className="text-lg font-semibold">
        1. Periode
      </h2>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="text-sm text-white/65">
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

        <label className="text-sm text-white/65">
          Tanggal Akhir

          <input
            type="date"
            value={periodEnd}
            onChange={(e) =>
              setPeriodEnd(e.target.value)
            }
            className={inputClass}
          />
        </label>
      </div>
    </section>
  );
}