// src/i18n.ts
export type Lang = "id" | "en";

export const I18N_STORAGE_KEY = "lang";

export const copy = {
  id: {
    nav: {
      about: "Tentang",
      products: "Produk",
      why: "Kenapa Kami",
      contact: "Kontak",
    },

    hero: {
      title: "Arkahf — Gagang Kayu, Handle & Pegangan Kayu Premium",
      desc: "Produk gagang kayu, handle, pegangan alat, serta aksesoris kayu dari Arkahf dibuat dari kayu pilihan (jati/mahoni) dengan finishing rapi. Kuat, ergonomis, dan nyaman digenggam untuk kebutuhan produksi maupun custom.",
      ctaPrimary: "Minta Katalog & Harga",
      ctaSecondary: "Lihat Produk",
    },

    about: {
      title: "Tentang Arkahf",
      desc: "Arkahf memproduksi gagang kayu, handle, pegangan sabit, dan aksesoris kayu dari bahan pilihan dengan finishing rapi. Kuat, ergonomis, konsisten untuk order produksi dan custom.",
    },

    products: {
      title: "Kategori Produk",
      moreTitle: "Lainnya",
      moreDescPrefix: "Lihat",
      moreDescSuffix: "produk lainnya",
      openAll: "Buka semua →",
      allTitle: "Semua Produk",
      detailOpen: "Lihat Detail →",
      detailClose: "Tutup Detail ↑",
      close: "Tutup",
    },

    why: {
      title: "Kenapa Memilih Arkahf?",
      items: [
        ["Kayu Pilihan", "Disortir untuk kekuatan dan serat terbaik"],
        ["Finishing Rapi", "Nyaman digenggam dan tahan lama"],
        ["Custom Order", "Bisa request bentuk & ukuran"],
        ["Konsisten", "Cocok untuk produksi berkelanjutan"],
      ] as const,
    },

    contact: {
      title: "Tertarik Bekerja Sama?",
      desc: "Hubungi kami untuk katalog, harga, dan permintaan custom.",
      cta: "Hubungi Sekarang",
    },

    footer: {
      brand: "Arkahf",
    },

    productsData: [
      {
        title: "Gagang Sabit Tanpa Finishing",
        short: "Kuat · Ergonomis · Tanpa Finishing · Produksi stabil",
        detail: {
          description: [
            "Gagang sabit Arkahf dibuat dari kayu jati atau kayu mahoni pilihan yang terkenal kuat dan tahan lama. Pegangan ergonomis dan nyaman digunakan untuk aktivitas pertanian, perkebunan, serta pekerjaan lapangan sehari-hari.",
          ],
          note: "Catatan: Jenis kayu yang diterima akan dikirim secara acak sesuai stok tersedia (jati/mahoni).",
          specs: [
            { label: "Tinggi", value: "21 cm" },
            { label: "Panjang", value: "3 cm" },
            { label: "Berat", value: "± 1000 gram" },
            {
              label: "Bahan",
              value: "Kayu jati / kayu mahoni (random sesuai stok)",
            },
            { label: "Kondisi", value: "Baru, siap pakai" },
          ],
          benefits: [
            "Kayu keras dan tahan lama",
            "Pegangan nyaman dan tidak licin saat digunakan",
            "Cocok untuk berbagai jenis sabit",
            "Finishing rapi dan kuat (kalau ada varian tanpa finishing, bisa kamu pisahkan)",
            "Ideal untuk kebutuhan petani maupun industri alat pertanian",
          ],
        },
      },
      {
        title: "Gagang Sabit Dengan Finishing",
        short: "Kuat · Ergonomis · Finishing · Produksi stabil",
        detail: {
          description: [
            "Gagang sabit Arkahf dibuat dari kayu jati atau kayu mahoni pilihan yang terkenal kuat dan tahan lama. Pegangan ergonomis dan nyaman digunakan untuk aktivitas pertanian, perkebunan, serta pekerjaan lapangan sehari-hari.",
          ],
          note: "Catatan: Jenis kayu yang diterima akan dikirim secara acak sesuai stok tersedia (jati/mahoni).",
          specs: [
            { label: "Tinggi", value: "21 cm" },
            { label: "Panjang", value: "3 cm" },
            { label: "Berat", value: "± 1000 gram" },
            {
              label: "Bahan",
              value: "Kayu jati / kayu mahoni (random sesuai stok)",
            },
            { label: "Kondisi", value: "Baru, siap pakai" },
          ],
          benefits: [
            "Kayu keras dan tahan lama",
            "Pegangan nyaman dan tidak licin saat digunakan",
            "Cocok untuk berbagai jenis sabit",
            "Finishing rapi dan kuat (kalau ada varian tanpa finishing, bisa kamu pisahkan)",
            "Ideal untuk kebutuhan petani maupun industri alat pertanian",
          ],
        },
      },
      {
        title: "Gagang Sabit Dengan Finishing Natural",
        short: "Kuat · Ergonomis · Finishing · Produksi stabil",
        detail: {
          description: [
            "Gagang sabit Arkahf dibuat dari kayu jati atau kayu mahoni pilihan yang terkenal kuat dan tahan lama. Pegangan ergonomis dan nyaman digunakan untuk aktivitas pertanian, perkebunan, serta pekerjaan lapangan sehari-hari.",
          ],
          note: "Catatan: Jenis kayu yang diterima akan dikirim secara acak sesuai stok tersedia (jati/mahoni).",
          specs: [
            { label: "Tinggi", value: "21 cm" },
            { label: "Panjang", value: "3 cm" },
            { label: "Berat", value: "± 1000 gram" },
            {
              label: "Bahan",
              value: "Kayu jati / kayu mahoni (random sesuai stok)",
            },
            { label: "Kondisi", value: "Baru, siap pakai" },
          ],
          benefits: [
            "Kayu keras dan tahan lama",
            "Pegangan nyaman dan tidak licin saat digunakan",
            "Cocok untuk berbagai jenis sabit",
            "Finishing rapi dan kuat (kalau ada varian tanpa finishing, bisa kamu pisahkan)",
            "Ideal untuk kebutuhan petani maupun industri alat pertanian",
          ],
        },
      },
      {
        title: "Gagang Sabit Tanpa Finishing",
        short: "Kayu pilihan · Tanpa Finishing · Bisa custom",
        detail: {
          description: [
            "Gagang sabit Arkahf dibuat dari kayu jati atau kayu mahoni pilihan yang terkenal kuat dan tahan lama. Pegangan ergonomis dan nyaman digunakan untuk aktivitas pertanian, perkebunan, serta pekerjaan lapangan sehari-hari.",
          ],
          note: "Catatan: Jenis kayu yang diterima akan dikirim secara acak sesuai stok tersedia (jati/mahoni).",
          specs: [
            { label: "Tinggi", value: "21 cm" },
            { label: "Panjang", value: "3 cm" },
            { label: "Berat", value: "± 1000 gram" },
            {
              label: "Bahan",
              value: "Kayu jati / kayu mahoni (random sesuai stok)",
            },
            { label: "Kondisi", value: "Baru, siap pakai" },
          ],
          benefits: [
            "Kayu keras dan tahan lama",
            "Pegangan nyaman dan tidak licin saat digunakan",
            "Cocok untuk berbagai jenis sabit",
            "Finishing rapi dan kuat (kalau ada varian tanpa finishing, bisa kamu pisahkan)",
            "Ideal untuk kebutuhan petani maupun industri alat pertanian",
          ],
        },
      },
      {
        title: "Gagang Sabit Finishing",
        short: "Kayu pilihan · Finishing · Bisa custom",
        detail: {
          description: [
            "Gagang sabit Arkahf dibuat dari kayu jati atau kayu mahoni pilihan yang terkenal kuat dan tahan lama. Pegangan ergonomis dan nyaman digunakan untuk aktivitas pertanian, perkebunan, serta pekerjaan lapangan sehari-hari.",
          ],
          note: "Catatan: Jenis kayu yang diterima akan dikirim secara acak sesuai stok tersedia (jati/mahoni).",
          specs: [
            { label: "Tinggi", value: "21 cm" },
            { label: "Panjang", value: "3 cm" },
            { label: "Berat", value: "± 1000 gram" },
            {
              label: "Bahan",
              value: "Kayu jati / kayu mahoni (random sesuai stok)",
            },
            { label: "Kondisi", value: "Baru, siap pakai" },
          ],
          benefits: [
            "Kayu keras dan tahan lama",
            "Pegangan nyaman dan tidak licin saat digunakan",
            "Cocok untuk berbagai jenis sabit",
            "Finishing rapi dan kuat (kalau ada varian tanpa finishing, bisa kamu pisahkan)",
            "Ideal untuk kebutuhan petani maupun industri alat pertanian",
          ],
        },
      },
      {
        title: "Gagang Sabit Dengan Finishing Natural",
        short: "Kuat · Ergonomis · Finishing · Produksi stabil",
        detail: {
          description: [
            "Gagang sabit Arkahf dibuat dari kayu jati atau kayu mahoni pilihan yang terkenal kuat dan tahan lama. Pegangan ergonomis dan nyaman digunakan untuk aktivitas pertanian, perkebunan, serta pekerjaan lapangan sehari-hari.",
          ],
          note: "Catatan: Jenis kayu yang diterima akan dikirim secara acak sesuai stok tersedia (jati/mahoni).",
          specs: [
            { label: "Tinggi", value: "21 cm" },
            { label: "Panjang", value: "3 cm" },
            { label: "Berat", value: "± 1000 gram" },
            {
              label: "Bahan",
              value: "Kayu jati / kayu mahoni (random sesuai stok)",
            },
            { label: "Kondisi", value: "Baru, siap pakai" },
          ],
          benefits: [
            "Kayu keras dan tahan lama",
            "Pegangan nyaman dan tidak licin saat digunakan",
            "Cocok untuk berbagai jenis sabit",
            "Finishing rapi dan kuat (kalau ada varian tanpa finishing, bisa kamu pisahkan)",
            "Ideal untuk kebutuhan petani maupun industri alat pertanian",
          ],
        },
      },
    ],
  },

  en: {
    nav: {
      about: "About",
      products: "Products",
      why: "Why Us",
      contact: "Contact",
    },

    hero: {
      title: "Arkahf — Wooden Handles, Handles & Premium Wooden Grips",
      desc: "Arkahf's wooden handles, grips, tool handles, and wooden accessories are made from selected wood (teak/mahogany) with a neat finish. Strong, ergonomic, and comfortable to hold for production and custom needs.",
      ctaPrimary: "Request Catalog & Price",
      ctaSecondary: "View Products",
    },

    about: {
      title: "About Arkahf",
      desc: "Arkahf produces wooden handles, handles, sickle handles, and wooden accessories from selected materials with neat finishes. Strong, ergonomic, consistent for production and custom orders.",
    },

    products: {
      title: "Product Categories",
      moreTitle: "More",
      moreDescPrefix: "See",
      moreDescSuffix: "more products",
      openAll: "Open all →",
      allTitle: "All Products",
      detailOpen: "View Details →",
      detailClose: "Hide Details ↑",
      close: "Close",
    },

    why: {
      title: "Why Choose Arkahf?",
      items: [
        ["Selected Wood", "Sorted for strength and best grain"],
        ["Neat Finishing", "Comfortable grip and durable"],
        ["Custom Orders", "Shape & size on request"],
        ["Consistent Supply", "Suitable for ongoing production"],
      ] as const,
    },

    contact: {
      title: "Interested in Working Together?",
      desc: "Contact us for catalog, pricing, and custom requests.",
      cta: "Contact Now",
    },

    footer: {
      brand: "Arkahf",
    },

    productsData: [
      {
        title: "Sickle Handle (Unfinished)",
        short: "Strong · Ergonomic · Unfinished · Stable production",
        detail: {
          description: [
            "Arkahf sickle handles are made from selected teak or mahogany wood known for strength and durability. The grip is ergonomic and comfortable for farming, plantations, and daily field work.",
          ],
          note: "Note: The wood type will be shipped randomly based on available stock (teak/mahogany).",
          specs: [
            { label: "Heigh", value: "21 cm" },
            { label: "Length", value: "3 cm" },
            { label: "Weight", value: "± 1000 grams" },
            {
              label: "Material",
              value: "Teak / Mahogany (random based on stock)",
            },
            { label: "Condition", value: "New, ready to use" },
          ],
          benefits: [
            "Hardwood and long-lasting",
            "Comfortable, non-slip grip",
            "Fits many sickle types",
            "Neat and durable finishing (separate if there is an unfinished variant)",
            "Suitable for farmers and agricultural tool industries",
          ],
        },
      },
      {
        title: "Sickle Handle (Finished)",
        short: "Strong · Ergonomic · Finished · Stable production",
        detail: {
          description: [
            "Arkahf sickle handles are made from selected teak or mahogany wood known for strength and durability. The grip is ergonomic and comfortable for farming, plantations, and daily field work.",
          ],
          note: "Note: The wood type will be shipped randomly based on available stock (teak/mahogany).",
          specs: [
            { label: "Heigh", value: "21 cm" },
            { label: "Length", value: "3 cm" },
            { label: "Weight", value: "± 1000 grams" },
            {
              label: "Material",
              value: "Teak / Mahogany (random based on stock)",
            },
            { label: "Condition", value: "New, ready to use" },
          ],
          benefits: [
            "Hardwood and long-lasting",
            "Comfortable, non-slip grip",
            "Fits many sickle types",
            "Neat and durable finishing (separate if there is an unfinished variant)",
            "Suitable for farmers and agricultural tool industries",
          ],
        },
      },
      {
        title: "Sickle Handle (Natural Finished)",
        short: "Strong · Ergonomic · Finished · Stable production",
        detail: {
          description: [
            "Arkahf sickle handles are made from selected teak or mahogany wood known for strength and durability. The grip is ergonomic and comfortable for farming, plantations, and daily field work.",
          ],
          note: "Note: The wood type will be shipped randomly based on available stock (teak/mahogany).",
          specs: [
            { label: "Heigh", value: "21 cm" },
            { label: "Length", value: "3 cm" },
            { label: "Weight", value: "± 1000 grams" },
            {
              label: "Material",
              value: "Teak / Mahogany (random based on stock)",
            },
            { label: "Condition", value: "New, ready to use" },
          ],
          benefits: [
            "Hardwood and long-lasting",
            "Comfortable, non-slip grip",
            "Fits many sickle types",
            "Neat and durable finishing (separate if there is an unfinished variant)",
            "Suitable for farmers and agricultural tool industries",
          ],
        },
      },
      {
        title: "Sickle Handle (Unfinished)",
        short: "Selected wood · Unfinished · Customizable",
        detail: {
          description: [
            "Arkahf sickle handles are made from selected teak or mahogany wood known for strength and durability. The grip is ergonomic and comfortable for farming, plantations, and daily field work.",
          ],
          note: "Note: The wood type will be shipped randomly based on available stock (teak/mahogany).",
          specs: [
            { label: "Heigh", value: "21 cm" },
            { label: "Length", value: "3 cm" },
            { label: "Weight", value: "± 1000 grams" },
            {
              label: "Material",
              value: "Teak / Mahogany (random based on stock)",
            },
            { label: "Condition", value: "New, ready to use" },
          ],
          benefits: [
            "Hardwood and long-lasting",
            "Comfortable, non-slip grip",
            "Fits many sickle types",
            "Neat and durable finishing (separate if there is an unfinished variant)",
            "Suitable for farmers and agricultural tool industries",
          ],
        },
      },
      {
        title: "Sickle Handle (Finished)",
        short: "Selected wood · Finished · Customizable",
        detail: {
          description: [
            "Arkahf sickle handles are made from selected teak or mahogany wood known for strength and durability. The grip is ergonomic and comfortable for farming, plantations, and daily field work.",
          ],
          note: "Note: The wood type will be shipped randomly based on available stock (teak/mahogany).",
          specs: [
            { label: "Heigh", value: "21 cm" },
            { label: "Length", value: "3 cm" },
            { label: "Weight", value: "± 1000 grams" },
            {
              label: "Material",
              value: "Teak / Mahogany (random based on stock)",
            },
            { label: "Condition", value: "New, ready to use" },
          ],
          benefits: [
            "Hardwood and long-lasting",
            "Comfortable, non-slip grip",
            "Fits many sickle types",
            "Neat and durable finishing (separate if there is an unfinished variant)",
            "Suitable for farmers and agricultural tool industries",
          ],
        },
      },
      {
        title: "Sickle Handle (Natural Finished)",
        short: "Strong · Ergonomic · Finished · Stable production",
        detail: {
          description: [
            "Arkahf sickle handles are made from selected teak or mahogany wood known for strength and durability. The grip is ergonomic and comfortable for farming, plantations, and daily field work.",
          ],
          note: "Note: The wood type will be shipped randomly based on available stock (teak/mahogany).",
          specs: [
            { label: "Heigh", value: "21 cm" },
            { label: "Length", value: "3 cm" },
            { label: "Weight", value: "± 1000 grams" },
            {
              label: "Material",
              value: "Teak / Mahogany (random based on stock)",
            },
            { label: "Condition", value: "New, ready to use" },
          ],
          benefits: [
            "Hardwood and long-lasting",
            "Comfortable, non-slip grip",
            "Fits many sickle types",
            "Neat and durable finishing (separate if there is an unfinished variant)",
            "Suitable for farmers and agricultural tool industries",
          ],
        },
      },
    ],
  },
} as const;

export type Copy = typeof copy.id;
export type ProductDetail = {
  description: string[];
  note?: string;
  specs: { label: string; value: string }[];
  benefits: string[];
};

export type ProductItem = {
  title: string;
  short: string;
  detail: ProductDetail;
};
