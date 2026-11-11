
import { money } from "../../utils/format";
import type { TotalRow } from "./types";

type Props = {
  rows: TotalRow[];
  onUpdateHpp: (
    index: number,
    value: string,
  ) => void;
};

export default function HppTable({
  rows,
  onUpdateHpp,
}: Props) {
  const totalHpp = rows.reduce(
    (sum, row) => sum + row.qty * row.hpp,
    0,
  );

  return (
    <section className="mt-5 rounded-2xl border border-[#E8E4DA] bg-white p-5 shadow-[0_4px_20px_rgba(38,59,48,0.04)] sm:p-6">

      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#294B3A]/10 text-sm font-bold text-[#294B3A]">
            03
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#263B30]">
              HPP Produk
            </h2>

            <p className="mt-0.5 text-xs leading-5 text-[#92958D]">
              Atur HPP setiap Produk + Variasi.
              Total HPP otomatis = QTY × HPP.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="rounded-full border border-[#E8E4DA] bg-[#FAF9F6] px-3 py-1.5 text-xs font-semibold text-[#777C73]">
            {rows.length} Baris Produk
          </span>
        </div>

      </div>

      {/* TABLE */}
      {rows.length === 0 ? (
        <div className="mt-5 rounded-xl border border-dashed border-[#DADFD6] bg-[#FAF9F6] px-4 py-10 text-center">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#294B3A]/10 text-[#294B3A]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18M9 21V9" />
            </svg>
          </div>

          <p className="mt-3 text-sm font-semibold text-[#35473B]">
            Belum Ada Data Produk
          </p>

          <p className="mt-1 text-xs text-[#92958D]">
            Upload dan proses file Shopee untuk menampilkan tabel HPP.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-5 overflow-x-auto rounded-xl border border-[#E8E4DA]">
            <table className="w-full min-w-[850px] border-collapse text-sm">

              <thead className="bg-[#294B3A]/[0.07] text-left">
                <tr>
                  <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-[#35473B]">
                    Produk
                  </th>

                  <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-[#35473B]">
                    Variasi
                  </th>

                  <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider text-[#35473B]">
                    QTY
                  </th>

                  <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-[#35473B]">
                    HPP / pcs
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-right text-xs font-bold uppercase tracking-wider text-[#35473B]">
                    Total HPP
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#EEEAE1]">

                {rows.map((row, index) => {
                  const rowTotal = row.qty * row.hpp;

                  return (
                    <tr
                      key={`${row.product}-${row.variation}`}
                      className="transition-colors hover:bg-[#F7F5EF]/80"
                    >
                      <td className="max-w-[280px] px-4 py-3.5 font-semibold text-[#35473B]">
                        {row.product}
                      </td>

                      <td className="px-4 py-3.5 text-[#777C73]">
                        {row.variation || "-"}
                      </td>

                      <td className="px-4 py-3.5 text-center">
                        <span className="inline-flex min-w-10 justify-center rounded-lg bg-[#F7F5EF] px-2.5 py-1.5 font-semibold tabular-nums text-[#35473B]">
                          {row.qty.toLocaleString("id-ID")}
                        </span>
                      </td>

                      <td className="px-4 py-3.5">
                        <div className="relative w-36">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#92958D]">
                            Rp
                          </span>

                          <input
                            type="text"
                            inputMode="numeric"
                            value={
                              row.hpp === 0
                                ? ""
                                : money(row.hpp)
                            }
                            onChange={(e) =>
                              onUpdateHpp(
                                index,
                                e.target.value,
                              )
                            }
                            className="w-full rounded-lg border border-[#E8E4DA] bg-[#FAF9F6] py-2.5 pl-9 pr-2 text-sm font-medium text-[#263B30] outline-none transition focus:border-[#294B3A] focus:bg-white focus:ring-4 focus:ring-[#294B3A]/10"
                            placeholder="0"
                          />
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-4 py-3.5 text-right font-bold tabular-nums text-[#294B3A]">
                        Rp {money(rowTotal)}
                      </td>
                    </tr>
                  );
                })}

              </tbody>

              <tfoot className="border-t border-[#E8E4DA] bg-[#F7F5EF]">
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-4 text-right text-xs font-bold uppercase tracking-wider text-[#35473B]"
                  >
                    Total Keseluruhan HPP
                  </td>

                  <td className="whitespace-nowrap px-4 py-4 text-right text-base font-bold text-[#294B3A]">
                    Rp {money(totalHpp)}
                  </td>
                </tr>
              </tfoot>

            </table>
          </div>

          <p className="mt-3 text-xs leading-5 text-[#92958D]">
            * HPP dapat diubah sesuai biaya modal setiap produk dan variasinya.
          </p>
        </>
      )}

    </section>
  );
}
