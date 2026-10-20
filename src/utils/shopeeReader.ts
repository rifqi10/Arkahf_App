import { cleanText } from "./format";
import type { Row } from "../components/totalisasi/types";

async function readZipEntries(file: File) {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const view = new DataView(bytes.buffer);

  let eocd = -1;

  for (
    let i = bytes.length - 22;
    i >= Math.max(0, bytes.length - 65557);
    i--
  ) {
    if (view.getUint32(i, true) === 0x06054b50) {
      eocd = i;
      break;
    }
  }

  if (eocd < 0) {
    throw new Error("File XLSX tidak valid.");
  }

  const cdSize = view.getUint32(eocd + 12, true);
  const cdOffset = view.getUint32(eocd + 16, true);

  const decoder = new TextDecoder();

  const entries = new Map<string, Uint8Array>();

  let p = cdOffset;
  const end = cdOffset + cdSize;

  while (p < end) {
    if (view.getUint32(p, true) !== 0x02014b50) {
      break;
    }

    const method = view.getUint16(p + 10, true);
    const compressedSize = view.getUint32(p + 20, true);

    const nameLen = view.getUint16(p + 28, true);
    const extraLen = view.getUint16(p + 30, true);
    const commentLen = view.getUint16(p + 32, true);

    const localOffset = view.getUint32(p + 42, true);

    const name = decoder.decode(
      bytes.slice(
        p + 46,
        p + 46 + nameLen,
      ),
    );

    const localNameLen =
      view.getUint16(localOffset + 26, true);

    const localExtraLen =
      view.getUint16(localOffset + 28, true);

    const dataStart =
      localOffset +
      30 +
      localNameLen +
      localExtraLen;

    const compressed = bytes.slice(
      dataStart,
      dataStart + compressedSize,
    );

    let data: Uint8Array;

    if (method === 0) {
      data = compressed;
    } else if (method === 8) {
      const ds = new DecompressionStream(
        "deflate-raw",
      );

      data = new Uint8Array(
        await new Response(
          new Blob([compressed])
            .stream()
            .pipeThrough(ds),
        ).arrayBuffer(),
      );
    } else {
      throw new Error(
        `Metode kompresi ZIP ${method} belum didukung.`,
      );
    }

    entries.set(name, data);

    p +=
      46 +
      nameLen +
      extraLen +
      commentLen;
  }

  return entries;
}

function xmlText(node: Element | null) {
  return node?.textContent ?? "";
}

export async function readShopeeXlsx(
  file: File,
): Promise<Row[]> {
  const entries = await readZipEntries(file);

  const decoder = new TextDecoder("utf-8");
  const parser = new DOMParser();

  const workbookXml =
    entries.get("xl/workbook.xml");

  const relsXml =
    entries.get("xl/_rels/workbook.xml.rels");

  if (!workbookXml || !relsXml) {
    throw new Error(
      "Struktur workbook Shopee tidak ditemukan.",
    );
  }

  const workbook = parser.parseFromString(
    decoder.decode(workbookXml),
    "application/xml",
  );

  const rels = parser.parseFromString(
    decoder.decode(relsXml),
    "application/xml",
  );

  const firstSheet =
    workbook.getElementsByTagName("sheet")[0];

  if (!firstSheet) {
    throw new Error(
      "Sheet orders tidak ditemukan.",
    );
  }

  const rid = firstSheet.getAttribute("r:id");

  const rel = Array.from(
    rels.getElementsByTagName("Relationship"),
  ).find(
    (r) => r.getAttribute("Id") === rid,
  );

  if (!rel) {
    throw new Error(
      "Relasi sheet tidak ditemukan.",
    );
  }

  const target =
    rel.getAttribute("Target") ||
    "worksheets/sheet1.xml";

  const sheetPath = target.startsWith("/")
    ? target.slice(1)
    : `xl/${target.replace(/^\//, "")}`;

  const sheetXml = entries.get(sheetPath);

  if (!sheetXml) {
    throw new Error(
      "Data sheet Shopee tidak ditemukan.",
    );
  }

  // Shared strings
  const shared = new Map<number, string>();

  const sharedXml =
    entries.get("xl/sharedStrings.xml");

  if (sharedXml) {
    const doc = parser.parseFromString(
      decoder.decode(sharedXml),
      "application/xml",
    );

    Array.from(
      doc.getElementsByTagName("si"),
    ).forEach((si, i) => {
      shared.set(
        i,
        Array.from(
          si.getElementsByTagName("t"),
        )
          .map(xmlText)
          .join(""),
      );
    });
  }

  const doc = parser.parseFromString(
    decoder.decode(sheetXml),
    "application/xml",
  );

  const rows =
    Array.from(doc.getElementsByTagName("row"));

  const matrix: Record<string, string>[] = [];

  let headers: Record<string, string> = {};

  const cellValue = (cell: Element) => {
    const type = cell.getAttribute("t");

    const v =
      cell.getElementsByTagName("v")[0];

    if (type === "inlineStr") {
      return Array.from(
        cell.getElementsByTagName("t"),
      )
        .map(xmlText)
        .join("");
    }

    const raw = xmlText(v);

    if (type === "s") {
      return shared.get(Number(raw)) ?? "";
    }

    return raw;
  };

  const colLetters = (ref: string) =>
    ref.replace(/[0-9]/g, "");

  rows.forEach((row, rowIndex) => {
    const obj: Record<string, string> = {};

    Array.from(
      row.getElementsByTagName("c"),
    ).forEach((cell) => {
      const ref =
        cell.getAttribute("r") || "";

      obj[colLetters(ref)] =
        cellValue(cell);
    });

    if (rowIndex === 0) {
      headers = obj;
    } else {
      matrix.push(obj);
    }
  });

  const findColumn = (name: string) =>
    Object.keys(headers).find(
      (key) =>
        headers[key].trim() === name,
    );

  const statusCol =
    findColumn("Status Pesanan");

  const productCol =
    findColumn("Nama Produk");

  const variationCol =
    findColumn("Nama Variasi");

  const qtyCol =
    findColumn("Jumlah");

  if (
    !productCol ||
    !variationCol ||
    !qtyCol
  ) {
    throw new Error(
      "Kolom Nama Produk, Nama Variasi, atau Jumlah tidak ditemukan.",
    );
  }

  return matrix
    .filter(
      (row) =>
        !statusCol ||
        cleanText(row[statusCol]) ===
          "Selesai",
    )
    .map((row) => ({
      product: cleanText(
        row[productCol],
      ),

      variation: cleanText(
        row[variationCol],
      ),

      qty:
        Number(
          String(
            row[qtyCol] ?? "0",
          ).replace(/,/g, ""),
        ) || 0,
    }))
    .filter(
      (row) =>
        row.product &&
        row.qty > 0,
    );
}