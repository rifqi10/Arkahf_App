// src/assets/productImages.ts

// HERO / umum
import gagangFinishing2 from "./gagangFinishing2.jpeg";
import balokKayu333FinishingBg1 from "./balokKayu333FinishingBg1.jpeg";

// PRODUCT IMAGES (yang kamu pakai di list)
import gagangSabitNoFinishing2 from "./gagangSabitNoFinishing2.jpeg";
import gagangSabitFinishing2 from "./gagangSabitFinishing2.jpeg";
import gagangSabitFinishingNatural from "./gagangSabitFinishingNatural.jpeg";

import gagangSabitNoFinishingText from "./gagangSabitNoFinishingText.png";
import gagangSabitFinishingText from "./gagangSabitFinishingText.png";
import gagangSabitFinishingNaturalText from "./gagangSabitFinishingNaturalText.png";

import balokKayu333NoFinishingText from "./balokKayu333NoFinishingText.png";
import balokKayu333FinishingText from "./balokKayu333FinishingText.png";
import balokKayu336NoFinishingText from "./balokKayu336NoFinishingText.png";
import balokKayu336FinishingText from "./balokKayu336FinishingText.png";
import balokKayu337NoFinishingText from "./balokKayu337NoFinishingText.png";
import balokKayu338NoFinishingText from "./balokKayu338NoFinishingText.png";
import balokKayu339NoFinishingText from "./balokKayu339NoFinishingText.png";
import balokKayu3310NoFinishingText from "./balokKayu3310NoFinishingText.png";
import balokKayu3311NoFinishingText from "./balokKayu3311NoFinishingText.png";
import balokKayu3312NoFinishingText from "./balokKayu3312NoFinishingText.png";

import boxKotak202010Bg1 from "./boxKotak202010Bg1.jpeg";
import boxKotak202010Text from "./boxKotak202010Text.png";
import boxKotak252510Text from "./boxKotak252510Text.png";
import boxKotak303010Text from "./boxKotak303010Text.png";

import kotakKayu3Sekat from "./kotakKayu3Sekat.png";



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

  // kalau ada card butuh bg khusus
  "balok-3x3x3-finishing-bg": balokKayu333FinishingBg1,
  "box-peti-kotak-20x20x10-bg1": boxKotak202010Bg1,
};

// fallback kalau id tidak ketemu (opsional)
export const DEFAULT_PRODUCT_IMAGE = balokKayu333FinishingBg1;
