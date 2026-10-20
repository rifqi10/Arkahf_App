import type { StoreFile } from "./types";

type Props = {
  files: StoreFile[];
  busy: boolean;
  onFilesChange: (
    list: FileList | null,
  ) => void;
  onProcess: () => void;
};

export default function ShopeeUpload({
  files,
  busy,
  onFilesChange,
  onProcess,
}: Props) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 shadow-2xl">
      <h2 className="text-lg font-semibold">
        2. Data Shopee
      </h2>

      <p className="mt-1 text-xs text-white/45">
        Pilih 1-4 file export Shopee.
        Nama file menjadi nama toko.
        Contoh: Arkah Craft.xlsx.
      </p>

      <input
        className="mt-4 block w-full text-sm"
        type="file"
        accept=".xlsx"
        multiple
        onChange={(e) =>
          onFilesChange(
            e.target.files,
          )
        }
      />

      <div className="mt-4 space-y-2">
        {files.map((file) => (
          <div
            key={file.store}
            className="flex items-center justify-between rounded-xl bg-black/25 px-3 py-2 text-sm"
          >
            <span>
              {file.store}.xlsx
            </span>

            <span className="text-emerald-400">
              {file.status}
            </span>
          </div>
        ))}
      </div>

      {files.length > 0 && (
        <div className="mt-3 text-xs text-white/45">
          {files.length} toko dipilih.
        </div>
      )}

      <button
        disabled={
          busy ||
          files.length === 0
        }
        onClick={onProcess}
        className="mt-4 w-full rounded-xl bg-amber-400 px-4 py-3 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-40"
      >
        {busy
          ? "Memproses..."
          : "PROSES DATA"}
      </button>
    </section>
  );
}