export type Lang = "id" | "en";
export const I18N_STORAGE_KEY = "lang";

import { copyCore } from "./copyCore";
import { productsId } from "./products.id";
import { productsEn } from "./products.en";

export const copy = {
  id: { ...copyCore.id, productsData: productsId },
  en: { ...copyCore.en, productsData: productsEn },
} as const;

export type Copy = typeof copy.id;

export type ProductDetail = {
  description: string[];
  note?: string;
  specs: { label: string; value: string }[];
  benefits: string[];
};

export type ProductItem = {
  id: string;
  title: string;
  short: string;
  categoryId: string;
  detail: ProductDetail;
};