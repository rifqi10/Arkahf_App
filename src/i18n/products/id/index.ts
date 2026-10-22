import { gagangSabitId } from "./gagangSabit";
import { kotakKayuSerbagunaId } from "./kotakKayuSerbaguna";
import { keranjangFullRangId } from "./keranjangFullRang";

export const productsId = [
  ...gagangSabitId,
  ...kotakKayuSerbagunaId,
  ...keranjangFullRangId
] as const;
