
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
    <section className="rounded-2xl border border-[#E8E4DA] bg-white p-5 shadow-[0_4px_20px_rgba(38,59,48,0.04)] transition hover:shadow-[0_8px_25px_rgba(38,59,48,0.07)] sm:p-6">

      {/* HEADER */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#294B3A]/10 text-sm font-bold text-[#294B3A]">
          02
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#263B30]">
            Data Shopee
          </h2>

          <p className="mt-0.5 text-xs text-[#92958D]">
            Upload laporan penjualan setiap toko.
          </p>
        </div>
      </div>

      {/* DESCRIPTION */}
      <p className="mt-4 text-sm leading-6 text-[#777C73]">
        Pilih 1-4 file export Shopee. Nama file akan digunakan sebagai nama toko.
        Contoh: Arkahf Craft.xlsx.
      </p>

      {/* UPLOAD AREA */}
      <label className="group mt-4 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#DADFD6] bg-[#FAF9F6] px-4 py-6 text-center transition hover:border-[#294B3A]/50 hover:bg-[#294B3A]/[0.03]">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#294B3A]/10 text-[#294B3A] transition group-hover:scale-105">
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
            <path d="M12 16V4" />
            <path d="m7 9 5-5 5 5" />
            <path d="M20 16.5v2A1.5 1.5 0 0 1 18.5 20h-13A1.5 1.5 0 0 1 4 18.5v-2" />
          </svg>
        </div>

        <span className="mt-3 text-sm font-semibold text-[#294B3A]">
          Pilih File Excel Shopee
        </span>

        <span className="mt-1 text-xs text-[#92958D]">
          Format XLSX · Maksimal 4 toko
        </span>

        <input
          className="sr-only"
          type="file"
          accept=".xlsx"
          multiple
          onChange={(e) =>
            onFilesChange(e.target.files)
          }
        />
      </label>

      {/* STORE LIST */}
      {files.length > 0 && (
        <div className="mt-5">

          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-[#777C73]">
              Daftar Toko
            </p>

            <span className="rounded-full bg-[#294B3A]/10 px-3 py-1 text-xs font-semibold text-[#294B3A]">
              {files.length} Toko
            </span>
          </div>

          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={file.store}
                className="flex items-center justify-between gap-3 rounded-xl border border-[#E8E4DA] bg-[#FAF9F6] px-3.5 py-3"
              >
                <div className="flex min-w-0 items-center gap-3">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#294B3A]/10 text-[#294B3A]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <path d="M14 2v6h6" />
                      <path d="M8 13h8M8 17h8" />
                    </svg>
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#35473B]">
                      {file.store}
                    </p>

                    <p className="text-[11px] text-[#92958D]">
                      File Excel #{index + 1}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 rounded-full border border-[#294B3A]/15 bg-[#294B3A]/10 px-2.5 py-1 text-[11px] font-semibold text-[#294B3A]">
                  {file.status}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-3 text-xs text-[#777C73]">
            {files.length} toko dipilih dan siap diproses.
          </p>
        </div>
      )}

      {/* PROCESS BUTTON */}
      <button
        disabled={busy || files.length === 0}
        onClick={onProcess}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#294B3A] px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#294B3A]/10 transition hover:-translate-y-0.5 hover:bg-[#355D48] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
      >
        {busy ? (
          <>
            <svg
              className="h-5 w-5 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4z"
              />
            </svg>

            Memproses Data...
          </>
        ) : (
          <>
            PROSES DATA SHOPEE

            <span aria-hidden="true">→</span>
          </>
        )}
      </button>

    </section>
  );
}
