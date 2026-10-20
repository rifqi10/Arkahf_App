export const money = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    useGrouping: true,
  }).format(
    Number.isFinite(n)
      ? n
      : 0,
  );

// Mengubah 15000000 menjadi 15.000.000
export const formatNominalInput = (
  value: string | number,
): string => {
  const digits = String(value ?? "").replace(/\D/g, "");

  if (!digits) return "";

  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// Mengambil angka asli dari input berformat
// Contoh: 15.000.000 menjadi 15000000
export const parseNominalInput = (
  value: string,
): string => {
  return value.replace(/\D/g, "");
};

export const cleanText = (v: unknown) =>
  String(v ?? "").trim();

export function storeNameFromFile(
  file: File,
) {
  return file.name
    .replace(/\.xlsx$/i, "")
    .trim();
}

export function formatDate(
  value: string,
) {
  if (!value) return "-";

  const parts =
    value.split("-");

  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }

  return value;
}