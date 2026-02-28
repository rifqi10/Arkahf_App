import { gagangSabitId } from "./gagangSabit";
import { balokKubusId } from "./balokKubus";
import { kotakKayuSerbagunaId } from "./kotakKayuSerbaguna";

export const productsId = [
  ...gagangSabitId,
  ...balokKubusId,
  ...kotakKayuSerbagunaId,
] as const;
