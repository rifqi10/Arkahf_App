// src/assets/productImages.ts

// HERO / umum
import gagangFinishing2 from "./gagangFinishing2.webp";
import balokKayu333FinishingBg1 from "./balokKayu333FinishingBg1.webp";

// PRODUCT IMAGES (yang kamu pakai di list)
import gagangSabitNoFinishing2 from "./gagangSabitNoFinishing2.webp";
import gagangSabitFinishing2 from "./gagangSabitFinishing2.webp";
import gagangSabitFinishingNatural from "./gagangSabitFinishingNatural.webp";

import gagangSabitNoFinishingText from "./gagangSabitNoFinishingText.webp";
import gagangSabitFinishingText from "./gagangSabitFinishingText.webp";
import gagangSabitFinishingNaturalText from "./gagangSabitFinishingNaturalText.webp";

import balokKayu333NoFinishingText from "./balokKayu333NoFinishingText.webp";
import balokKayu333FinishingText from "./balokKayu333FinishingText.webp";
import balokKayu336NoFinishingText from "./balokKayu336NoFinishingText.webp";
import balokKayu336FinishingText from "./balokKayu336FinishingText.webp";
import balokKayu337NoFinishingText from "./balokKayu337NoFinishingText.webp";
import balokKayu338NoFinishingText from "./balokKayu338NoFinishingText.webp";
import balokKayu339NoFinishingText from "./balokKayu339NoFinishingText.webp";
import balokKayu3310NoFinishingText from "./balokKayu3310NoFinishingText.webp";
import balokKayu3311NoFinishingText from "./balokKayu3311NoFinishingText.webp";
import balokKayu3312NoFinishingText from "./balokKayu3312NoFinishingText.webp";

import boxKotak202010Bg1 from "./boxKotak202010Bg1.webp";
import boxKotak202010Text from "./boxKotak202010Text.webp";
import boxKotak252510Text from "./boxKotak252510Text.webp";
import boxKotak303010Text from "./boxKotak303010Text.webp";

import kotakKayu3Sekat from "./kotakKayu3Sekat.webp";

import boxPetiUk173011Text from "./boxPetiUk173011Text.webp";
import boxPetiUk223511Text from "./boxPetiUk223511Text.webp";
import boxPetiUk274011Text from "./boxPetiUk274011Text.webp";


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
    src: boxKotak202010Bg1,
    alt: "boxKotak202010Bg1",
  },
  {
    type: "image" as const,
    src: balokKayu333FinishingBg1,
    alt: "balokKayu333FinishingBg1",
  },
];

// 2) Mapping gambar produk berdasarkan id (bukan index)
export const PRODUCT_IMAGE_BY_ID: Record<string, string> = {
  // gagang sabit (text image)
  "gagang-sabit-no-finishing-text": gagangSabitNoFinishingText,
  "gagang-sabit-finishing-text": gagangSabitFinishingText,
  "gagang-sabit-finishing-natural-text": gagangSabitFinishingNaturalText,

  // gagang sabit (photo)
  "gagang-sabit-no-finishing-photo": gagangSabitNoFinishing2,
  "gagang-sabit-finishing-photo": gagangSabitFinishing2,
  "gagang-sabit-finishing-natural-photo": gagangSabitFinishingNatural,

  // balok/kubus (text)
  "balok-3x3x3-no-finishing-text": balokKayu333NoFinishingText,
  "balok-3x3x3-finishing-text": balokKayu333FinishingText,

  "balok-3x3x6-no-finishing-text": balokKayu336NoFinishingText,
  "balok-3x3x6-finishing-text": balokKayu336FinishingText,

  "balok-3x3x7-no-finishing-text": balokKayu337NoFinishingText,
  "balok-3x3x8-no-finishing-text": balokKayu338NoFinishingText,
  "balok-3x3x9-no-finishing-text": balokKayu339NoFinishingText,
  "balok-3x3x10-no-finishing-text": balokKayu3310NoFinishingText,
  "balok-3x3x11-no-finishing-text": balokKayu3311NoFinishingText,
  "balok-3x3x12-no-finishing-text": balokKayu3312NoFinishingText,

  // Box Peti Kotak (text)
  "box-peti-kotak-20x20x10-text": boxKotak202010Text,
  "box-peti-kotak-25x25x10-text": boxKotak252510Text,
  "box-peti-kotak-30x30x10-text": boxKotak303010Text,

  // Kotak 3 Sekat (text)
  "kotak-kayu-3-sekat": kotakKayu3Sekat,

  // Box Peti (text)
  "box-peti-ukuran-17x30x11-text": boxPetiUk173011Text,
  "box-peti-ukuran-22x35x11-text": boxPetiUk223511Text,
  "box-peti-ukuran-27x40x11-text": boxPetiUk274011Text,

  // Kotak Sekat (text)
  "kotak-sekat-ukuran-10x10x7-text": uk10107TanpaSkat,
  "kotak-sekat-ukuran-20x10x7-skat2-text": uk20107Skat2,
  "kotak-sekat-ukuran-20x10x7-tanpa-skat-text": uk20107TanpaSkat,
  "kotak-sekat-ukuran-30x10x7-skat2-text": uk30107Skat2,
  "kotak-sekat-ukuran-30x10x7-skat3-text": uk30107Skat3,
  "kotak-sekat-ukuran-30x10x7-tanpa-skat-text": uk30107TanpaSkat,

  // kalau ada card butuh bg khusus
  "balok-3x3x3-finishing-bg": balokKayu333FinishingBg1,
  "box-peti-kotak-20x20x10-bg1": boxKotak202010Bg1,
};

// fallback kalau id tidak ketemu (opsional)
export const DEFAULT_PRODUCT_IMAGE = balokKayu333FinishingBg1;