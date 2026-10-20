import { useMemo, useState } from "react";

import PeriodSection from "../components/totalisasi/PeriodSection";
import ShopeeUpload from "../components/totalisasi/ShopeeUpload";
import HppTable from "../components/totalisasi/HppTable";
import FinanceSection from "../components/totalisasi/FinanceSection";
import ResultSection from "../components/totalisasi/ResultSection";

import type {
  Row,
  StoreFile,
  TotalRow,
} from "../components/totalisasi/types";

import {
  storeNameFromFile,
} from "../utils/format";

import {
  readShopeeXlsx,
} from "../utils/shopeeReader";

import {
  makeTotalisasiPdf,
} from "../components/totalisasi/TotalisasiPdf";

type TotalisasiPageProps = {
  onLogout: () => void;
};

export default function totalisasiPage({
  onLogout,
}: TotalisasiPageProps) {
  const [files, setFiles] =
    useState<StoreFile[]>([]);

  const [rows, setRows] =
    useState<TotalRow[]>([]);

  const [periodStart, setPeriodStart] =
    useState("");

  const [periodEnd, setPeriodEnd] =
    useState("");

  const [finance, setFinance] =
    useState([
      "",
      "",
      "",
      "",
    ]);

  const [kas, setKas] =
    useState("");

  const [packing, setPacking] = useState("");

  const [busy, setBusy] =
    useState(false);

  const [message, setMessage] =
    useState("");

  // -----------------------------------------
  // PERHITUNGAN
  // -----------------------------------------

  const totalHpp = useMemo(
    () =>
      rows.reduce(
        (sum, row) =>
          sum +
          row.qty *
          row.hpp,
        0,
      ),
    [rows],
  );

  const totalQty = useMemo(
    () =>
      rows.reduce(
        (sum, row) => sum + row.qty,
        0,
      ),
    [rows],
  );

  const totalFinance =
    useMemo(
      () =>
        finance.reduce(
          (sum, value) =>
            sum +
            (Number(value) ||
              0),
          0,
        ),
      [finance],
    );

  const beforeSedekah =
    totalFinance -
    totalHpp;

  const sedekah =
    Math.max(
      0,
      beforeSedekah *
      0.025,
    );

  const hasilBersih =
    beforeSedekah -
    sedekah -
    (Number(kas) || 0) -
    (Number(packing) || 0);

  // -----------------------------------------
  // PILIH FILE SHOPEE
  // -----------------------------------------

  const chooseFiles = (
    list: FileList | null,
  ) => {
    if (!list) return;

    const selected =
      Array.from(list);

    // Minimal 1 file, maksimal 4 file
    if (
      selected.length < 1 ||
      selected.length > 4
    ) {
      setMessage(
        "Pilih minimal 1 dan maksimal 4 file XLSX.",
      );

      return;
    }

    const names =
      selected.map(
        storeNameFromFile,
      );

    if (
      names.some(
        (name) => !name,
      )
    ) {
      setMessage(
        "Nama file toko tidak boleh kosong.",
      );

      return;
    }

    const uniqueNames =
      new Set(
        names.map(
          (name) =>
            name.toLowerCase(),
        ),
      );

    if (
      uniqueNames.size !==
      selected.length
    ) {
      setMessage(
        "Ada nama toko yang sama. Pastikan nama file setiap toko berbeda.",
      );

      return;
    }

    setFiles(
      selected.map(
        (file) => ({
          file,
          store:
            storeNameFromFile(
              file,
            ),
          status: "Siap",
        }),
      ),
    );

    setRows([]);

    // Sesuaikan jumlah finance
    // dengan jumlah file yang dipilih
    setFinance(
      Array(selected.length).fill(""),
    );

    setMessage(
      `${selected.length} file siap diproses.`,
    );
  };

  // -----------------------------------------
  // PROSES DATA SHOPEE
  // -----------------------------------------

  const processFiles =
    async () => {
      if (files.length === 0) {
        setMessage(
          "Upload minimal 1 file XLSX terlebih dahulu.",
        );

        return;
      }

      setBusy(true);
      setMessage("");

      try {
        const grouped =
          new Map<
            string,
            Row
          >();

        for (
          const item of files
        ) {
          const data =
            await readShopeeXlsx(
              item.file,
            );

          data.forEach(
            (row) => {
              const key =
                `${row.product}\u0000${row.variation}`;

              const old =
                grouped.get(
                  key,
                );

              if (old) {
                old.qty +=
                  row.qty;
              } else {
                grouped.set(
                  key,
                  {
                    ...row,
                  },
                );
              }
            },
          );
        }

        const totalRows =
          Array.from(
            grouped.values(),
          )
            .sort(
              (a, b) =>
                a.product.localeCompare(
                  b.product,
                  "id",
                ),
            )
            .map(
              (row) => ({
                ...row,
                hpp: 0,
              }),
            );

        setRows(
          totalRows,
        );

        setMessage(
          `Berhasil: ${files.length} toko diproses, ${grouped.size} kombinasi produk + variasi.`,
        );
      } catch (error) {
        setMessage(
          error instanceof
            Error
            ? error.message
            : "Gagal membaca file Shopee.",
        );
      } finally {
        setBusy(false);
      }
    };

  // -----------------------------------------
  // UPDATE HPP
  // -----------------------------------------

  const updateHpp = (
    index: number,
    value: string,
  ) => {
    // Hapus semua karakter selain angka.
    //
    // Contoh:
    // "12.500" -> "12500"
    // "12500"  -> "12500"
    // "Rp 12.500" -> "12500"
    const cleaned =
      value.replace(/\D/g, "");

    const number =
      cleaned === ""
        ? 0
        : Number(cleaned);

    setRows(
      (old) =>
        old.map(
          (row, i) =>
            i === index
              ? {
                ...row,
                hpp: number,
              }
              : row,
        ),
    );
  };

  // -----------------------------------------
  // DOWNLOAD PDF
  // -----------------------------------------

  const downloadPdf =
    () => {
      if (!rows.length) {
        setMessage(
          "Proses data Shopee terlebih dahulu.",
        );

        return;
      }

      const blob =
        makeTotalisasiPdf({
          periodStart,
          periodEnd,
          files,
          rows,
          finance,
          totalFinance,
          totalHpp,
          totalQty,
          beforeSedekah,
          sedekah,
          kas:
            Number(kas) ||
            0,
          packing: Number(packing) || 0,
          hasilBersih,
        });

      const url =
        URL.createObjectURL(
          blob,
        );

      const a =
        document.createElement(
          "a",
        );

      a.href = url;

      const safeStart =
        periodStart ||
        "periode";

      const safeEnd =
        periodEnd ||
        "";

      a.download =
        `Totalan_${safeStart}${safeEnd
          ? `-${safeEnd}`
          : ""
        }.pdf`;

      document.body.appendChild(
        a,
      );

      a.click();

      document.body.removeChild(
        a,
      );

      setTimeout(() => {
        URL.revokeObjectURL(
          url,
        );
      }, 1000);

      setMessage(
        "PDF totalisasi berhasil dibuat.",
      );
    };

  // -----------------------------------------
  // RESET
  // -----------------------------------------

  const reset = () => {
    setFiles([]);

    setRows([]);

    setFinance([]);

    setKas("");

    setPacking("");

    setPeriodStart("");

    setPeriodEnd("");

    setMessage("");
  };

  // -----------------------------------------
  // UI
  // -----------------------------------------

  return (
    <div className="min-h-screen bg-[#090909] px-4 py-8 text-[#f5ead5] md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
              Arkahf Craft Internal
            </p>

            <h1 className="mt-2 text-3xl font-bold md:text-4xl">
              Totalisasi Penjualan
            </h1>

            <p className="mt-2 max-w-3xl text-sm text-white/55">
              Upload 1-4 export Shopee
              → gabungkan Produk +
              Variasi → masukkan HPP
              → masukkan keuangan toko
              → hitung hasil
              → download PDF.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={reset}
              className="rounded-xl border border-white/15 px-4 py-2 text-sm hover:bg-white/10"
            >
              Totalan Baru
            </button>

            <button
              onClick={onLogout}
              className="rounded-xl border border-red-400/25 bg-red-400/5 px-4 py-2 text-sm text-red-300 transition hover:bg-red-400/10"
            >
              Logout
            </button>
          </div>
        </div>

        {/* MESSAGE */}
        {message && (
          <div className="mb-5 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
            {message}
          </div>
        )}

        {/* STEP 1 & 2 */}
        <div className="grid gap-5 lg:grid-cols-2">

          <PeriodSection
            periodStart={
              periodStart
            }
            periodEnd={
              periodEnd
            }
            setPeriodStart={
              setPeriodStart
            }
            setPeriodEnd={
              setPeriodEnd
            }
          />

          <ShopeeUpload
            files={files}
            busy={busy}
            onFilesChange={
              chooseFiles
            }
            onProcess={
              processFiles
            }
          />

        </div>

        {/* STEP 3 */}
        <HppTable
          rows={rows}
          onUpdateHpp={
            updateHpp
          }
        />

        {/* STEP 4 & 5 */}
        <div className="mt-5 grid gap-5 lg:grid-cols-2">

          <FinanceSection
            files={files}
            finance={finance}
            setFinance={
              setFinance
            }
            totalFinance={
              totalFinance
            }
          />

          <ResultSection
            kas={kas}
            setKas={setKas}
            packing={packing}
            setPacking={setPacking}
            totalFinance={totalFinance}
            totalHpp={totalHpp}
            totalQty={totalQty}
            beforeSedekah={beforeSedekah}
            sedekah={sedekah}
            hasilBersih={hasilBersih}
            onDownloadPdf={downloadPdf}
          />

        </div>
      </div>
    </div>
  );
}