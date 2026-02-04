import { useEffect, useMemo, useState } from "react";
import { copy, I18N_STORAGE_KEY } from "../i18n";
import type { Lang } from "../i18n";

export function useLang() {
  const [lang, setLang] = useState<Lang>("id");

  useEffect(() => {
    const saved = localStorage.getItem(I18N_STORAGE_KEY);
    if (saved === "en" || saved === "id") setLang(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem(I18N_STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useMemo(() => copy[lang], [lang]);

  return { lang, setLang, t };
}
