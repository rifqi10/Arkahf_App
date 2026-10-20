
import {
  money, formatNominalInput,
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
    "w-full rounded-xl border border-white/15 bg-white/[0.06] px-3 py-2.5 text-white outline-none focus:border-amber-400";

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 shadow-2xl">
      <h2 className="text-lg font-semibold">
        5. Kas, Packing & Hasil
      </h2>

      <label className="mt-4 block text-sm text-white/65">
        Kas (manual)

        <input
          type="text"
          inputMode="numeric"
          value={formatNominalInput(kas)}
          onChange={(e) =>
            setKas(parseNominalInput(e.target.value))
          }
          className={inputClass}
          placeholder="0"
        />
      </label>

      <label className="mt-4 block text-sm text-white/65">
        Pembayaran Packing (opsional)

        <input
          type="text"
          inputMode="numeric"
          value={formatNominalInput(packing)}
          onChange={(e) =>
            setPacking(parseNominalInput(e.target.value))
          }
          className={inputClass}
          placeholder="Kosongkan jika tidak ada"
        />

        <span className="mt-1 block text-xs text-white/40">
          Boleh diisi atau dikosongkan.
          Jika kosong, dihitung Rp0.
        </span>
      </label>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between gap-3">
          <span>Total Keuangan</span>
          <b>Rp {money(totalFinance)}</b>
        </div>

        <div className="flex justify-between gap-3">
          <span>Total HPP</span>
          <b>Rp {money(totalHpp)}</b>
        </div>

        <div className="flex justify-between gap-3">
          <span>Total QTY Terjual</span>
          <b>{totalQty.toLocaleString("id-ID")} pcs</b>
        </div>

        <div className="flex justify-between gap-3">
          <span>Sebelum Sedekah</span>
          <b>Rp {money(beforeSedekah)}</b>
        </div>

        <div className="flex justify-between gap-3">
          <span>Sedekah 2,5%</span>
          <b>Rp {money(sedekah)}</b>
        </div>

        <div className="flex justify-between gap-3">
          <span>Kas</span>
          <b>
            Rp {money(Number(kas) || 0)}
          </b>
        </div>

        <div className="flex justify-between gap-3">
          <span>Pembayaran Packing</span>
          <b>
            Rp {money(Number(packing) || 0)}
          </b>
        </div>

        <div className="mt-3 flex justify-between gap-3 border-t border-white/10 pt-3 text-base">
          <span>Hasil Bersih</span>

          <b className="text-amber-400">
            Rp {money(hasilBersih)}
          </b>
        </div>
      </div>

      <button
        onClick={onDownloadPdf}
        className="mt-5 w-full rounded-xl bg-amber-400 px-4 py-3 font-semibold text-black hover:bg-amber-300"
      >
        DOWNLOAD PDF
      </button>
    </section>
  );
}
