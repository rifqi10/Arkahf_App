// src/components/LanguageToggle.tsx
import type { Lang } from "../i18n/index";

type Props = {
  lang: Lang;
  onChange: (next: Lang) => void;
};

export default function LanguageToggle({ lang, onChange }: Props) {
  const btn = (active: boolean) =>
    `px-3 py-1 text-xs font-semibold rounded-lg transition ${
      active ? "bg-[#7A4A2A] text-white" : "text-white/70 hover:text-white"
    }`;

  return (
    <div className="flex items-center p-1 border rounded-xl border-white/10 bg-white/5">
      <button
        type="button"
        onClick={() => onChange("id")}
        className={btn(lang === "id")}
        aria-pressed={lang === "id"}
      >
        ID
      </button>

      <button
        type="button"
        onClick={() => onChange("en")}
        className={btn(lang === "en")}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
    </div>
  );
}
