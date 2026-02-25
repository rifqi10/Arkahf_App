// src/i18n/index.ts
import { copyCore } from "./copyCore";
import { productsId } from "./products.id";
import { productsEn } from "./products.en";

export type Lang = "id" | "en";
export const I18N_STORAGE_KEY = "lang";

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

// ✅ Copy tipe eksplisit, biar productsData pasti ada
export type Copy = {
  nav: {
    about: string;
    products: string;
    why: string;
    contact: string;
  };
  hero: {
    title: string;
    desc: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  about: {
    title: string;
    desc: string;
  };
  products: {
    title: string;
    moreTitle: string;
    moreDescPrefix: string;
    moreDescSuffix: string;
    openAll: string;
    allTitle: string;
    detailOpen: string;
    detailClose: string;
    close: string;
  };
  why: {
    title: string;
    items: readonly (readonly [string, string])[];
  };
  contact: {
    title: string;
    desc: string;
    cta: string;
  };
  footer: {
    brand: string;
  };
  productsData: ProductItem[];
};

export const copy: Record<Lang, Copy> = {
  id: {
    ...copyCore.id,
    productsData: [...productsId] as unknown as ProductItem[],
  },
  en: {
    ...copyCore.en,
    productsData: [...productsEn] as unknown as ProductItem[],
  },
};
