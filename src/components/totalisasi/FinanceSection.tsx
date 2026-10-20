import {
  money,
  formatNominalInput,
  parseNominalInput,
} from "../../utils/format";
import type { StoreFile } from "./types";

type Props = {
  files: StoreFile[];
  finance: string[];
  setFinance: (value: string[]) => void;
  totalFinance: number;
};

export default function FinanceSection({
  files,
  finance,
  setFinance,
  totalFinance,
}: Props) {
  const inputClass =
    "w-full rounded-xl border border-white/15 bg-white/[0.06] px-3 py-2.5 text-white outline-none focus:border-amber-400";

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 shadow-2xl">
      <h2 className="text-lg font-semibold">
        4. Keuangan per Toko
      </h2>

      <p className="mt-1 text-xs text-white/45">
        Masukkan nominal dari
        saldo/keuangan toko yang
        diproses. Sistem hanya
        menjumlahkannya.
      </p>

      {files.length === 0 ? (
        <div className="mt-4 rounded-xl border border-dashed border-white/10 bg-white/[0.02] px-4 py-5 text-center text-sm text-white/40">
          Belum ada toko yang dipilih.
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {files.map((file, index) => (
            <label
              key={file.store}
              className="block text-sm text-white/65"
            >
              {file.store}

              <input
                type="text"
                inputMode="numeric"
                value={formatNominalInput(
                  finance[index] ?? "",
                )}
                onChange={(e) => {
                  const value = parseNominalInput(
                    e.target.value,
                  );

                  const nextFinance = [...finance];
                  nextFinance[index] = value;

                  setFinance(nextFinance);
                }}
                className={inputClass}
                placeholder="0"
              />
            </label>
          ))}
        </div>
      )}

      <div className="mt-4 rounded-xl bg-white/5 p-4">
        <div className="text-xs text-white/45">
          Total Keuangan
        </div>

        <div className="mt-1 text-2xl font-bold">
          Rp {money(totalFinance)}
        </div>
      </div>
    </section>
  );
}