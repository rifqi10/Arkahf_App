
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
    "mt-2 w-full rounded-xl border border-[#E8E4DA] bg-[#FAF9F6] px-3.5 py-3 text-sm font-medium text-[#263B30] outline-none transition placeholder:text-[#A5A69F] focus:border-[#294B3A] focus:bg-white focus:ring-4 focus:ring-[#294B3A]/10";

  return (
    <section className="rounded-2xl border border-[#E8E4DA] bg-white p-5 shadow-[0_4px_20px_rgba(38,59,48,0.04)] transition hover:shadow-[0_8px_25px_rgba(38,59,48,0.07)] sm:p-6">

      {/* HEADER */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#294B3A]/10 text-sm font-bold text-[#294B3A]">
          04
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#263B30]">
            Keuangan per Toko
          </h2>

          <p className="mt-0.5 text-xs text-[#92958D]">
            Masukkan saldo keuangan masing-masing toko.
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-[#777C73]">
        Masukkan nominal berdasarkan saldo/keuangan dari setiap toko Shopee yang diproses. Sistem akan menjumlahkan seluruh nominal.
      </p>

      {/* STORE INPUT */}
      {files.length === 0 ? (
        <div className="mt-5 rounded-xl border border-dashed border-[#DADFD6] bg-[#FAF9F6] px-4 py-8 text-center">

          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#E8E4DA] text-[#92958D]">
            <span className="text-xl">₋</span>
          </div>

          <p className="mt-3 text-sm font-semibold text-[#35473B]">
            Belum Ada Toko
          </p>

          <p className="mt-1 text-xs text-[#92958D]">
            Upload file Shopee terlebih dahulu.
          </p>
        </div>
      ) : (
        <div className="mt-5 space-y-4">

          {files.map((file, index) => (
            <label
              key={file.store}
              className="block text-sm font-semibold text-[#35473B]"
            >
              <span className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#294B3A]/10 text-xs font-bold text-[#294B3A]">
                  {index + 1}
                </span>

                {file.store}
              </span>

              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#92958D]">
                  Rp
                </span>

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
                  className={`${inputClass} pl-10`}
                  placeholder="0"
                />
              </div>
            </label>
          ))}

        </div>
      )}

      {/* TOTAL FINANCE */}
      <div className="mt-5 rounded-2xl border border-[#294B3A]/10 bg-[#294B3A]/[0.05] p-4 sm:p-5">

        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#777C73]">
              Total Keuangan
            </p>

            <p className="mt-1 text-xs text-[#92958D]">
              Gabungan seluruh toko
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#294B3A]/10 text-[#294B3A]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 10h18M7 15h3" />
            </svg>
          </div>
        </div>

        <p className="mt-3 text-2xl font-bold tracking-tight text-[#294B3A] sm:text-3xl">
          Rp {money(totalFinance)}
        </p>
      </div>

    </section>
  );
}
