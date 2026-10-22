import { gagangSabitEn } from "./gagangSabit";
import { kotakKayuSerbagunaEn } from "./kotakKayuSerbaguna";
import { keranjangFullRangEn } from "./keranjangFullRang";

export const productsEn = [
  ...gagangSabitEn,
  ...kotakKayuSerbagunaEn,
  ...keranjangFullRangEn
] as const;
