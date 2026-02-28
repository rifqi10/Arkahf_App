import { copyCore } from "./copyCore";
import type { Copy, Lang } from "./types";
import { productsId } from "./products/id";
import { productsEn } from "./products/en";

export { I18N_STORAGE_KEY } from "./types";
export type { Lang, Copy, ProductItem, ProductDetail } from "./types";

export const copy: Record<Lang, Copy> = {
  id: {
    ...copyCore.id,
    productsData: productsId,
  },
  en: {
    ...copyCore.en,
    productsData: productsEn,
  },
};