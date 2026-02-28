import { gagangSabitEn } from "./gagangSabit";
import { balokKubusEn } from "./balokKubus";
import { kotakKayuSerbagunaEn } from "./kotakKayuSerbaguna";

export const productsEn = [
  ...gagangSabitEn,
  ...balokKubusEn,
  ...kotakKayuSerbagunaEn,
] as const;
