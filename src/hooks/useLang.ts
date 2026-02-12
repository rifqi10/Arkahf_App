import { useEffect, useMemo, useState } from "react";
import { copy, I18N_STORAGE_KEY } from "../i18n";
import type { Lang } from "../i18n";

function getLangFromUrl(): Lang | null {
  try {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("lang");
    if (q === "en" || q === "id") return q;
    return null;
  } catch {
    return null;
  }
}

export function useLang() {
  const [lang, setLang] = useState<Lang>("id");

  // 1) Initial: URL -> localStorage -> default
  useEffect(() => {
    const urlLang = getLangFromUrl();
    if (urlLang) {
      setLang(urlLang);
      return;
    }

    const saved = localStorage.getItem(I18N_STORAGE_KEY);
    if (saved === "en" || saved === "id") setLang(saved);
  }, []);

  // 2) Persist + set <html lang="">
  useEffect(() => {
    localStorage.setItem(I18N_STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  // 3) (Opsional) sync URL ketika user ganti bahasa
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (lang === "id") {
      params.delete("lang");
    } else {
      params.set("lang", "en");
    }

    const newQuery = params.toString();
    const newUrl =
      window.location.pathname +
      (newQuery ? `?${newQuery}` : "") +
      window.location.hash;

    window.history.replaceState(null, "", newUrl);
  }, [lang]);

  const t = useMemo(() => copy[lang], [lang]);

  return { lang, setLang, t };
}
