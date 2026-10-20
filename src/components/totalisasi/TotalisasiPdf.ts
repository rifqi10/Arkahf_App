type PdfStoreFile = {
  store: string;
};

type PdfRow = {
  product: string;
  variation: string;
  qty: number;
  hpp: number;
};

type MakeTotalisasiPdfProps = {
  periodStart: string;
  periodEnd: string;
  files: PdfStoreFile[];
  rows: PdfRow[];
  finance: string[];
  totalFinance: number;
  totalHpp: number;
  totalQty: number;
  beforeSedekah: number;
  sedekah: number;
  kas: number;
  packing: number;
  hasilBersih: number;
};

const PAGE_WIDTH = 842;
const PAGE_HEIGHT = 595;

const MARGIN_LEFT = 36;
const MARGIN_RIGHT = 36;
// const MARGIN_TOP = 36;
const MARGIN_BOTTOM = 36;

const money = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);

const safeNumber = (value: number) =>
  Number.isFinite(value) ? value : 0;

/**
 * PDF standard fonts seperti Helvetica tidak aman untuk seluruh Unicode.
 * Kita ubah karakter tertentu menjadi karakter ASCII yang aman.
 */
function pdfSafeText(value: unknown) {
  return String(value ?? "")
    .replace(/×/g, "x")
    .replace(/–/g, "-")
    .replace(/—/g, "-")
    .replace(/•/g, "-")
    .replace(/“/g, '"')
    .replace(/”/g, '"')
    .replace(/‘/g, "'")
    .replace(/’/g, "'")
    .replace(/→/g, "->")
    .replace(/←/g, "<-")
    .replace(/≥/g, ">=")
    .replace(/≤/g, "<=")
    .replace(/[^\x20-\x7E]/g, "?");
}

/**
 * Escape karakter khusus PDF string.
 */
function escapePdfText(value: unknown) {
  return pdfSafeText(value)
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function formatPeriod(start: string, end: string) {
  if (!start && !end) return "Periode tidak ditentukan";
  if (start && end) return `${start} s/d ${end}`;
  if (start) return `Mulai ${start}`;
  return `Sampai ${end}`;
}

/**
 * Membuat perintah text PDF.
 */
function text(
  x: number,
  y: number,
  value: string,
  size = 9,
  bold = false,
) {
  const font = bold ? "/F2" : "/F1";

  return [
    "BT",
    `${font} ${size} Tf`,
    `1 0 0 1 ${x} ${y} Tm`,
    `(${escapePdfText(value)}) Tj`,
    "ET",
  ].join("\n");
}

/**
 * Membuat kotak.
 */
function rect(
  x: number,
  y: number,
  width: number,
  height: number,
  fillGray = 0.95,
) {
  return [
    `${fillGray} g`,
    `${x} ${y} ${width} ${height} re`,
    "f",
    "0 g",
  ].join("\n");
}

/**
 * Membuat garis.
 */
function line(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  width = 0.7,
) {
  return [
    "0.65 G",
    `${width} w`,
    `${x1} ${y1} m`,
    `${x2} ${y2} l`,
    "S",
    "0 G",
  ].join("\n");
}

/**
 * Membuat teks dengan lebar maksimum.
 * Karena kita memakai Helvetica standar, kita tidak melakukan
 * pengukuran font yang rumit. Pemotongan berdasarkan jumlah karakter.
 */
function truncate(value: string, maxChars: number) {
  const clean = pdfSafeText(value);

  if (clean.length <= maxChars) return clean;

  if (maxChars <= 3) {
    return clean.slice(0, maxChars);
  }

  return `${clean.slice(0, maxChars - 3)}...`;
}

/**
 * Membuat object PDF.
 *
 * Hal terpenting:
 * offset xref dihitung dari Uint8Array final,
 * sehingga PDF tidak rusak karena perbedaan panjang
 * string vs byte.
 */
function buildPdf(objects: string[]) {
  const encoder = new TextEncoder();

  let pdf = "%PDF-1.4\n%\xE2\xE3\xCF\xD3\n";

  const offsets: number[] = [0];

  for (let i = 0; i < objects.length; i++) {
    offsets.push(encoder.encode(pdf).length);

    pdf += `${i + 1} 0 obj\n`;
    pdf += `${objects[i]}\n`;
    pdf += "endobj\n";
  }

  const xrefOffset = encoder.encode(pdf).length;

  pdf += `xref\n`;
  pdf += `0 ${objects.length + 1}\n`;
  pdf += `0000000000 65535 f \n`;

  for (let i = 1; i < offsets.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }

  pdf += "trailer\n";
  pdf += `<< /Size ${objects.length + 1} /Root 1 0 R >>\n`;
  pdf += "startxref\n";
  pdf += `${xrefOffset}\n`;
  pdf += "%%EOF";

  return new Blob([encoder.encode(pdf)], {
    type: "application/pdf",
  });
}

export function makeTotalisasiPdf({
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
  kas,
  packing,
  hasilBersih,
}: MakeTotalisasiPdfProps) {
  const encoder = new TextEncoder();

  /**
   * Object PDF:
   *
   * 1 Catalog
   * 2 Pages
   * 3 Font Helvetica
   * 4 Font Helvetica-Bold
   *
   * Setelah itu pasangan Page + Content.
   */
  const objects: string[] = [];

  objects.push("<< /Type /Catalog /Pages 2 0 R >>");

  // Placeholder Pages. Akan diperbarui setelah jumlah halaman diketahui.
  objects.push("");

  objects.push(
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
  );

  objects.push(
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
  );

  const pageContents: string[] = [];

  /**
   * =========================
   * HALAMAN 1 - RINGKASAN
   * =========================
   */
  {
    const commands: string[] = [];

    // Background
    commands.push("1 g");
    commands.push(`0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT} re`);
    commands.push("f");
    commands.push("0 g");

    // Header - dibuat terang agar teks tetap jelas
    commands.push(
      rect(
        MARGIN_LEFT,
        PAGE_HEIGHT - 105,
        PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT,
        69,
        0.90,
      ),
    );

    commands.push(
      text(
        MARGIN_LEFT + 20,
        PAGE_HEIGHT - 61,
        "ARKAHF CRAFT",
        19,
        true,
      ),
    );

    commands.push(
      text(
        MARGIN_LEFT + 20,
        PAGE_HEIGHT - 82,
        "LAPORAN TOTALISASI PENJUALAN",
        10,
        false,
      ),
    );

    commands.push(
      text(
        PAGE_WIDTH - 220,
        PAGE_HEIGHT - 61,
        "PERIODE",
        7,
        true,
      ),
    );

    commands.push(
      text(
        PAGE_WIDTH - 220,
        PAGE_HEIGHT - 82,
        formatPeriod(periodStart, periodEnd),
        8,
        false,
      ),
    );

    // Judul ringkasan
    commands.push(
      text(
        MARGIN_LEFT,
        PAGE_HEIGHT - 135,
        "RINGKASAN KEUANGAN",
        12,
        true,
      ),
    );

    commands.push(
      text(
        PAGE_WIDTH - MARGIN_RIGHT - 150,
        PAGE_HEIGHT - 135,
        `TOTAL QTY: ${money(totalQty)} PCS`,
        9,
        true,
      ),
    );

    const cardGap = 12;
    const cardWidth =
      (PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT - cardGap * 2) / 3;

    const cardHeight = 54;
    const cardY = PAGE_HEIGHT - 202;

    const cards = [
      ["TOTAL KEUANGAN", totalFinance],
      ["TOTAL HPP", totalHpp],
      ["SEBELUM SEDEKAH", beforeSedekah],
    ];

    cards.forEach(([label, value], index) => {
      const x =
        MARGIN_LEFT + index * (cardWidth + cardGap);

      commands.push(
        rect(x, cardY, cardWidth, cardHeight, 0.94),
      );

      commands.push(
        text(x + 12, cardY + 36, String(label), 7, true),
      );

      commands.push(
        text(
          x + 12,
          cardY + 17,
          `Rp ${money(Number(value))}`,
          12,
          true,
        ),
      );
    });

    const secondRowY = cardY - cardHeight - 10;

    const secondCards = [
      ["SEDEKAH 2,5%", sedekah],
      ["KAS", kas],
      ["HASIL BERSIH", hasilBersih],
    ];

    secondCards.forEach(([label, value], index) => {
      const x =
        MARGIN_LEFT + index * (cardWidth + cardGap);

      commands.push(
        rect(
          x,
          secondRowY,
          cardWidth,
          cardHeight,
          index === 2 ? 0.88 : 0.94,
        ),
      );

      commands.push(
        text(x + 12, secondRowY + 36, String(label), 7, true),
      );

      commands.push(
        text(
          x + 12,
          secondRowY + 17,
          `Rp ${money(Number(value))}`,
          12,
          true,
        ),
      );
    });

    /*
     * Bagian bawah dibuat 2 kolom:
     * kiri  = keuangan per toko
     * kanan = alur perhitungan
     *
     * Dengan layout ini, alur perhitungan tidak lagi
     * memanjang sampai menabrak footer.
     */

    const bottomTop = secondRowY - 30;

    // =========================
    // KIRI: KEUANGAN PER TOKO
    // =========================
    const leftX = MARGIN_LEFT;
    const leftWidth = 425;

    commands.push(
      text(
        leftX,
        bottomTop,
        "KEUANGAN PER TOKO",
        11,
        true,
      ),
    );

    const storeTableTop = bottomTop - 18;
    const storeHeaderHeight = 22;

    commands.push(
      rect(
        leftX,
        storeTableTop - storeHeaderHeight,
        leftWidth,
        storeHeaderHeight,
        0.88,
      ),
    );

    commands.push(
      text(
        leftX + 10,
        storeTableTop - 14,
        "TOKO",
        7,
        true,
      ),
    );

    commands.push(
      text(
        leftX + leftWidth - 115,
        storeTableTop - 14,
        "NOMINAL",
        7,
        true,
      ),
    );

    let storeY = storeTableTop - 38;

    for (
      let i = 0;
      i < files.length;
      i++
    ) {
      const storeName =
        files[i]?.store || `Toko ${i + 1}`;

      const value = Number(finance[i]) || 0;

      commands.push(
        text(
          leftX + 10,
          storeY,
          truncate(storeName, 45),
          8,
        ),
      );

      commands.push(
        text(
          leftX + leftWidth - 115,
          storeY,
          `Rp ${money(value)}`,
          8,
        ),
      );

      commands.push(
        line(
          leftX,
          storeY - 7,
          leftX + leftWidth,
          storeY - 7,
          0.35,
        ),
      );

      storeY -= 22;
    }

    commands.push(
      text(
        leftX + 10,
        storeY - 1,
        "TOTAL KEUANGAN",
        8,
        true,
      ),
    );

    commands.push(
      text(
        leftX + leftWidth - 115,
        storeY - 1,
        `Rp ${money(totalFinance)}`,
        8,
        true,
      ),
    );

    // =========================
    // KANAN: ALUR PERHITUNGAN
    // =========================
    const rightX = leftX + leftWidth + 18;
    const rightWidth =
      PAGE_WIDTH - MARGIN_RIGHT - rightX;

    commands.push(
      text(
        rightX,
        bottomTop,
        "ALUR PERHITUNGAN",
        11,
        true,
      ),
    );

    const flowBoxTop = bottomTop - 18;
    const flowBoxHeight = 165;

    commands.push(
      rect(
        rightX,
        flowBoxTop - flowBoxHeight,
        rightWidth,
        flowBoxHeight,
        0.96,
      ),
    );

    const flowLines = [
      ["Total Keuangan", totalFinance],
      ["- Total HPP", totalHpp],
      ["= Sebelum Sedekah", beforeSedekah],
      ["- Sedekah 2,5%", sedekah],
      ["- Kas", kas],
      ["- Pembayaran Packing", packing],
      ["= HASIL BERSIH", hasilBersih],
    ] as const;

    let flowLineY = flowBoxTop - 24;

    flowLines.forEach(([label, value], index) => {
      const isResult = index === flowLines.length - 1;

      commands.push(
        text(
          rightX + 12,
          flowLineY,
          label,
          isResult ? 9 : 8,
          isResult,
        ),
      );

      commands.push(
        text(
          rightX + rightWidth - 105,
          flowLineY,
          `Rp ${money(Number(value))}`,
          isResult ? 9 : 8,
          isResult,
        ),
      );

      if (isResult) {
        commands.push(
          line(
            rightX + 10,
            flowLineY + 10,
            rightX + rightWidth - 10,
            flowLineY + 10,
            0.7,
          ),
        );
      }

      flowLineY -= 21;
    });

    // Footer diletakkan tetap di area aman halaman
    commands.push(
      text(
        MARGIN_LEFT,
        MARGIN_BOTTOM - 5,
        "Dokumen totalisasi dibuat oleh sistem internal Arkahf Craft.",
        7,
      ),
    );

    pageContents.push(commands.join("\n"));
  }

  /**
   * =========================
   * HALAMAN DETAIL PRODUK
   * =========================
   */

  const rowsPerPage = 24;

  if (rows.length === 0) {
    const commands: string[] = [];

    commands.push(
      text(
        MARGIN_LEFT,
        PAGE_HEIGHT - 50,
        "DETAIL PRODUK",
        14,
        true,
      ),
    );

    commands.push(
      text(
        MARGIN_LEFT,
        PAGE_HEIGHT - 75,
        "Tidak ada data produk.",
        9,
      ),
    );

    pageContents.push(commands.join("\n"));
  } else {
    for (
      let start = 0;
      start < rows.length;
      start += rowsPerPage
    ) {
      const pageRows = rows.slice(
        start,
        start + rowsPerPage,
      );

      const commands: string[] = [];

      commands.push(
        text(
          MARGIN_LEFT,
          PAGE_HEIGHT - 42,
          "DETAIL PRODUK",
          14,
          true,
        ),
      );

      commands.push(
        text(
          MARGIN_LEFT,
          PAGE_HEIGHT - 59,
          `Produk ${start + 1}-${start + pageRows.length} dari ${rows.length}`,
          8,
        ),
      );

      const tableTop = PAGE_HEIGHT - 82;

      // Lebar kolom
      const colNo = 30;
      const colProduct = 255;
      const colVariation = 170;
      const colQty = 48;
      const colHpp = 115;
      const colTotal = 120;

      const xNo = MARGIN_LEFT;
      const xProduct = xNo + colNo;
      const xVariation = xProduct + colProduct;
      const xQty = xVariation + colVariation;
      const xHpp = xQty + colQty;
      const xTotal = xHpp + colHpp;

      const tableWidth =
        colNo +
        colProduct +
        colVariation +
        colQty +
        colHpp +
        colTotal;

      const headerHeight = 24;

      commands.push(
        rect(
          MARGIN_LEFT,
          tableTop - headerHeight,
          tableWidth,
          headerHeight,
          0.88,
        ),
      );

      const headerY = tableTop - 16;

      commands.push(text(xNo + 6, headerY, "NO", 7, true));
      commands.push(
        text(xProduct + 6, headerY, "PRODUK", 7, true),
      );
      commands.push(
        text(xVariation + 6, headerY, "VARIASI", 7, true),
      );
      commands.push(
        text(xQty + 6, headerY, "QTY", 7, true),
      );
      commands.push(
        text(xHpp + 6, headerY, "HPP / PCS", 7, true),
      );
      commands.push(
        text(xTotal + 6, headerY, "TOTAL HPP", 7, true),
      );

      let y = tableTop - headerHeight - 17;
      const rowHeight = 20;

      pageRows.forEach((row, index) => {
        const actualIndex = start + index;

        if (index % 2 === 0) {
          commands.push(
            rect(
              MARGIN_LEFT,
              y - 6,
              tableWidth,
              rowHeight,
              0.97,
            ),
          );
        }

        commands.push(
          text(
            xNo + 6,
            y,
            String(actualIndex + 1),
            7,
          ),
        );

        commands.push(
          text(
            xProduct + 6,
            y,
            truncate(row.product, 45),
            7,
          ),
        );

        commands.push(
          text(
            xVariation + 6,
            y,
            truncate(row.variation || "-", 29),
            7,
          ),
        );

        commands.push(
          text(
            xQty + 6,
            y,
            String(row.qty),
            7,
          ),
        );

        commands.push(
          text(
            xHpp + 6,
            y,
            `Rp ${money(safeNumber(row.hpp))}`,
            7,
          ),
        );

        commands.push(
          text(
            xTotal + 6,
            y,
            `Rp ${money(
              safeNumber(row.qty) *
              safeNumber(row.hpp),
            )}`,
            7,
          ),
        );

        commands.push(
          line(
            MARGIN_LEFT,
            y - 8,
            MARGIN_LEFT + tableWidth,
            y - 8,
            0.25,
          ),
        );

        y -= rowHeight;
      });

      // Footer
      commands.push(
        text(
          MARGIN_LEFT,
          MARGIN_BOTTOM - 5,
          `Arkahf Craft - Totalisasi - Halaman detail ${Math.floor(start / rowsPerPage) + 2
          }`,
          7,
        ),
      );

      pageContents.push(commands.join("\n"));
    }
  }

  /**
   * Sekarang kita tahu jumlah halaman.
   *
   * Struktur object:
   *
   * 1 Catalog
   * 2 Pages
   * 3 Helvetica
   * 4 Helvetica-Bold
   *
   * Kemudian:
   * Page 1 = object 5
   * Content 1 = object 6
   * Page 2 = object 7
   * Content 2 = object 8
   * dst.
   */
  const pageObjectNumbers: number[] = [];

  const firstPageObject = 5;

  pageContents.forEach((content, index) => {
    const pageObject = firstPageObject + index * 2;
    const contentObject = pageObject + 1;

    pageObjectNumbers.push(pageObject);

    const contentLength =
      encoder.encode(content).length;

    objects.push(
      `<< /Type /Page
/Parent 2 0 R
/MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}]
/Resources <<
  /Font <<
    /F1 3 0 R
    /F2 4 0 R
  >>
>>
/Contents ${contentObject} 0 R
>>`,
    );

    objects.push(
      `<< /Length ${contentLength} >>
stream
${content}
endstream`,
    );
  });

  // Object Pages
  objects[1] =
    `<< /Type /Pages
/Kids [${pageObjectNumbers
      .map((number) => `${number} 0 R`)
      .join(" ")}]
/Count ${pageObjectNumbers.length}
>>`;

  return buildPdf(objects);
}