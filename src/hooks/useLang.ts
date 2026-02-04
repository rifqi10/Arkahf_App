// src/hooks/useLang.ts
import { useEffect, useMemo, useState } from "react";
import { copy, I18N_STORAGE_KEY } from "../i18n";
import type { Lang } from "../i18n";

export function useLang() {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem(I18N_STORAGE_KEY);
    return saved === "en" || saved === "id" ? saved : "id";
  });

  useEffect(() => {
    localStorage.setItem(I18N_STORAGE_KEY, lang);
    document.documentElement.lang = lang; // SEO & a11y
  }, [lang]);

  const t = useMemo(() => copy[lang], [lang]);

  return { lang, setLang, t };
}
