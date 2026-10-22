// src/assets/productImages.ts

// HERO / umum
import gagangFinishing2 from "./gagangFinishing2.webp";
import kotakUk30x30x10 from "./kotakUk30x30x10.webp";
import keranjangSpUk30x30x10 from "./keranjangSpUk30x30x10.webp";

// PRODUCT IMAGES (yang kamu pakai di list)
import gagangSabitNoFinishingText from "./gagangSabitNoFinishingText.webp";
import gagangSabitFinishingText from "./gagangSabitFinishingText.webp";
import gagangSabitFinishingNaturalText from "./gagangSabitFinishingNaturalText.webp";

import keranjangFullRang20x20x10 from "./Keranjang Full Rang/keranjangFullRang20x20x10.webp";
import keranjangFullRang25x25x10 from "./Keranjang Full Rang/keranjangFullRang25x25x10.webp";
import keranjangFullRang30x30x10 from "./Keranjang Full Rang/keranjangFullRang30x30x10.webp";
import keranjangFullRang30x17x11 from "./Keranjang Full Rang/keranjangFullRang30x17x11.webp";
import keranjangFullRang35x22x11 from "./Keranjang Full Rang/keranjangFullRang35x22x11.webp";
import keranjangFullRang40x27x11 from "./Keranjang Full Rang/keranjangFullRang40x27x11.webp";

import kotakKayu3Sekat from "./kotakKayu3Sekat.webp";

import uk10107TanpaSkat from "./uk10107TanpaSkat.webp";
import uk20107Skat2 from "./uk20107Skat2.webp";
import uk20107TanpaSkat from "./uk20107TanpaSkat.webp";
import uk30107Skat2 from "./uk30107Skat2.webp";
import uk30107Skat3 from "./uk30107Skat3.webp";
import uk30107TanpaSkat from "./uk30107TanpaSkat.webp";

// 1) HERO SLIDES kamu pindahkan ke sini biar landingPage bersih
export const HERO_SLIDES = [
  {
    type: "image" as const,
    src: gagangFinishing2,
    alt: "gagangFinishing2",
  },
  {
    type: "image" as const,
    src: kotakUk30x30x10,
    alt: "kotakUk30x30x10",
  },{
    type: "image" as const,
    src: keranjangSpUk30x30x10,
    alt: "keranjangSpUk30x30x10",
  },
];

// 2) Mapping gambar produk berdasarkan id (bukan index)
export const PRODUCT_IMAGE_BY_ID: Record<string, string> = {
  // gagang sabit (text image)
  "gagang-sabit-no-finishing-text": gagangSabitNoFinishingText,
  "gagang-sabit-finishing-text": gagangSabitFinishingText,
  "gagang-sabit-finishing-natural-text": gagangSabitFinishingNaturalText,

  // Keranjang Full Rang (text)
  "keranjang-full-rang-ukuran-20x20x10-text": keranjangFullRang20x20x10,
  "keranjang-full-rang-ukuran-25x25x10-text": keranjangFullRang25x25x10,
  "keranjang-full-rang-ukuran-30x30x10-text": keranjangFullRang30x30x10,
  "keranjang-full-rang-ukuran-30x17x11-text": keranjangFullRang30x17x11,
  "keranjang-full-rang-ukuran-35x22x11-text": keranjangFullRang35x22x11,
  "keranjang-full-rang-ukuran-40x27x11-text": keranjangFullRang40x27x11,

  // Kotak 3 Sekat (text)
  "kotak-kayu-3-sekat": kotakKayu3Sekat,

  // Kotak Sekat (text)
  "kotak-sekat-ukuran-10x10x7-text": uk10107TanpaSkat,
  "kotak-sekat-ukuran-20x10x7-skat2-text": uk20107Skat2,
  "kotak-sekat-ukuran-20x10x7-tanpa-skat-text": uk20107TanpaSkat,
  "kotak-sekat-ukuran-30x10x7-skat2-text": uk30107Skat2,
  "kotak-sekat-ukuran-30x10x7-skat3-text": uk30107Skat3,
  "kotak-sekat-ukuran-30x10x7-tanpa-skat-text": uk30107TanpaSkat,
};

export const DEFAULT_PRODUCT_IMAGE = gagangFinishing2;
