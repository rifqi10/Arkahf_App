
import {
  money,
  formatNominalInput,
  parseNominalInput,
} from "../../utils/format";

type Props = {
  kas: string;
  setKas: (value: string) => void;

  packing: string;
  setPacking: (value: string) => void;

  totalFinance: number;
  totalHpp: number;
  totalQty: number;
  beforeSedekah: number;
  sedekah: number;
  hasilBersih: number;

  onDownloadPdf: () => void;
};

export default function ResultSection({
  kas,
  setKas,
  packing,
  setPacking,
  totalFinance,
  totalHpp,
  totalQty,
  beforeSedekah,
  sedekah,
  hasilBersih,
  onDownloadPdf,
}: Props) {
  const inputClass =
    "mt-2 w-full rounded-xl border border-[#E8E4DA] bg-[#FAF9F6] px-3.5 py-3 text-sm font-medium text-[#263B30] outline-none transition placeholder:text-[#A5A69F] focus:border-[#294B3A] focus:bg-white focus:ring-4 focus:ring-[#294B3A]/10";

  return (
    <section className="rounded-2xl border border-[#E8E4DA] bg-white p-5 shadow-[0_4px_20px_rgba(38,59,48,0.04)] sm:p-6">

      {/* HEADER */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#294B3A]/10 text-sm font-bold text-[#294B3A]">
          05
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#263B30]">
            Kas, Packing & Hasil
          </h2>

          <p className="mt-0.5 text-xs text-[#92958D]">
            Lengkapi biaya dan lihat hasil bersih.
          </p>
        </div>
      </div>

      {/* INPUT KAS */}
      <div className="mt-5 space-y-4">

        <label className="block text-sm font-semibold text-[#35473B]">
          Kas (Manual)

          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#92958D]">
              Rp
            </span>

            <input
              type="text"
              inputMode="numeric"
              value={formatNominalInput(kas)}
              onChange={(e) =>
                setKas(parseNominalInput(e.target.value))
              }
              className={`${inputClass} pl-10`}
              placeholder="0"
            />
          </div>
        </label>

        {/* PACKING */}
        <label className="block text-sm font-semibold text-[#35473B]">
          Pembayaran Packing

          <span className="ml-2 rounded-full bg-[#C58B4A]/10 px-2 py-1 text-[10px] font-bold text-[#A46F34]">
            OPSIONAL
          </span>

          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#92958D]">
              Rp
            </span>

            <input
              type="text"
              inputMode="numeric"
              value={formatNominalInput(packing)}
              onChange={(e) =>
                setPacking(parseNominalInput(e.target.value))
              }
              className={`${inputClass} pl-10`}
              placeholder="Kosongkan jika tidak ada"
            />
          </div>

          <span className="mt-1.5 block text-xs font-normal text-[#92958D]">
            Boleh diisi atau dikosongkan. Jika kosong, dihitung Rp0.
          </span>
        </label>

      </div>

      {/* DIVIDER */}
      <div className="my-6 border-t border-dashed border-[#E5E1D7]" />

      {/* RINCIAN PERHITUNGAN */}
      <div>
        <div className="mb-4">
          <h3 className="text-sm font-bold text-[#263B30]">
            Rincian Perhitungan
          </h3>

          <p className="mt-1 text-xs text-[#92958D]">
            Ringkasan seluruh transaksi dan pengeluaran.
          </p>
        </div>

        <div className="space-y-3 text-sm">

          <div className="flex items-center justify-between gap-3">
            <span className="text-[#777C73]">
              Total Keuangan
            </span>

            <b className="text-right tabular-nums text-[#35473B]">
              Rp {money(totalFinance)}
            </b>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-[#777C73]">
              Total HPP
            </span>

            <b className="text-right tabular-nums text-[#35473B]">
              Rp {money(totalHpp)}
            </b>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-[#777C73]">
              Total QTY Terjual
            </span>

            <b className="text-right tabular-nums text-[#35473B]">
              {totalQty.toLocaleString("id-ID")} pcs
            </b>
          </div>

          <div className="my-2 border-t border-[#EEEAE1]" />

          <div className="flex items-center justify-between gap-3">
            <span className="font-semibold text-[#35473B]">
              Sebelum Sedekah
            </span>

            <b className="text-right tabular-nums text-[#35473B]">
              Rp {money(beforeSedekah)}
            </b>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-[#777C73]">
              Sedekah 2,5%
            </span>

            <b className="text-right tabular-nums text-[#A46F34]">
              - Rp {money(sedekah)}
            </b>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-[#777C73]">
              Kas
            </span>

            <b className="text-right tabular-nums text-[#35473B]">
              - Rp {money(Number(kas) || 0)}
            </b>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-[#777C73]">
              Pembayaran Packing
            </span>

            <b className="text-right tabular-nums text-[#35473B]">
              - Rp {money(Number(packing) || 0)}
            </b>
          </div>

        </div>
      </div>

      {/* HASIL BERSIH */}
      <div className="mt-6 overflow-hidden rounded-2xl bg-[#294B3A] p-5 text-white shadow-lg shadow-[#294B3A]/15 sm:p-6">

        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/65">
              Hasil Bersih
            </p>

            <p className="mt-1 text-xs text-white/55">
              Total keuntungan setelah pengurangan.
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#E5BC80]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
        </div>

        <p className="mt-4 break-words text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Rp {money(hasilBersih)}
        </p>

        <div className="mt-4 border-t border-white/15 pt-3">
          <p className="text-[11px] leading-5 text-white/55">
            Hasil akhir berdasarkan total keuangan, HPP, sedekah, kas, dan pembayaran packing.
          </p>
        </div>

      </div>

      {/* DOWNLOAD PDF */}
      <button
        onClick={onDownloadPdf}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#294B3A] px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#294B3A]/10 transition hover:-translate-y-0.5 hover:bg-[#355D48] hover:shadow-xl"
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
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <path d="m7 10 5 5 5-5M12 15V3" />
        </svg>

        DOWNLOAD PDF TOTALISASI
      </button>

    </section>
  );
}
