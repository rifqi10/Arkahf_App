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
  return (
    <section className="mt-5 rounded-2xl border border-white/10 bg-white/[0.035] p-5 shadow-2xl">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">
            3. HPP Produk
          </h2>

          <p className="text-xs text-white/45">
            HPP diisi sekali per Produk +
            Variasi untuk periode ini.
            Total HPP otomatis = QTY × HPP.
          </p>
        </div>

        <span className="rounded-full bg-white/10 px-3 py-1 text-xs">
          {rows.length} baris
        </span>
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full min-w-[950px] text-sm">
          <thead className="bg-white/5 text-left text-white/55">
            <tr>
              <th className="px-3 py-3">
                Produk
              </th>

              <th className="px-3 py-3">
                Variasi
              </th>

              <th className="px-3 py-3">
                QTY
              </th>

              <th className="px-3 py-3">
                HPP / pcs
              </th>

              <th className="px-3 py-3 whitespace-nowrap">
                Total HPP
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map(
              (row, index) => {
                const totalHpp =
                  row.qty * row.hpp;

                return (
                  <tr
                    key={`${row.product}-${row.variation}`}
                    className="border-t border-white/10"
                  >
                    <td className="px-3 py-3">
                      {row.product}
                    </td>

                    <td className="px-3 py-3">
                      {row.variation ||
                        "-"}
                    </td>

                    <td className="px-3 py-3">
                      {row.qty}
                    </td>

                    <td className="px-3 py-3">
                      <input
                        type="text"
                        inputMode="numeric"
                        value={
                          row.hpp === 0
                            ? ""
                            : money(
                              row.hpp,
                            )
                        }
                        onChange={(e) =>
                          onUpdateHpp(
                            index,
                            e.target.value,
                          )
                        }
                        className="w-36 rounded-lg border border-white/10 bg-white/5 px-2 py-2"
                        placeholder="0"
                      />
                    </td>

                    <td className="px-3 py-3 whitespace-nowrap font-semibold">
                      Rp{" "}
                      {money(
                        totalHpp,
                      )}
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}