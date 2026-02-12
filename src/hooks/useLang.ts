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

function getInitialLang(): Lang {
  // PRIORITY: URL -> localStorage -> default
  const urlLang = getLangFromUrl();
  if (urlLang) return urlLang;

  try {
    const saved = localStorage.getItem(I18N_STORAGE_KEY);
    if (saved === "en" || saved === "id") return saved;
  } catch {
    // ignore
  }

  return "id";
}

export function useLang() {
  const [lang, setLang] = useState<Lang>(() => getInitialLang());
  const [ready, setReady] = useState(false);

  // Mark ready after mount (so effects that touch URL can be gated)
  useEffect(() => {
    setReady(true);
  }, []);

  // Persist + set <html lang="">
  useEffect(() => {
    localStorage.setItem(I18N_STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  // Sync URL when lang changes (only after ready)
  useEffect(() => {
    if (!ready) return;

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

    // Only update if different (avoid needless history ops)
    const current =
      window.location.pathname + window.location.search + window.location.hash;

    if (current !== newUrl) {
      window.history.replaceState(null, "", newUrl);
    }
  }, [lang, ready]);

  const t = useMemo(() => copy[lang], [lang]);

  return { lang, setLang, t };
}
