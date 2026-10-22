
import type { Lang } from "../i18n/index";

type Props = {
  lang: Lang;
  onChange: (next: Lang) => void;
};

export default function LanguageToggle({ lang, onChange }: Props) {
  const buttonClass = (active: boolean) =>
    [
      "min-w-10 rounded-lg px-3 py-2 text-xs font-bold tracking-wide",
      "transition-all duration-200 ease-out",
      "focus-visible:outline-none focus-visible:ring-2",
      "focus-visible:ring-[#315747] focus-visible:ring-offset-2",
      active
        ? "bg-[#315747] text-white shadow-sm"
        : "text-[#59665B] hover:bg-[#EAEDE5] hover:text-[#294737]",
    ].join(" ");

  return (
    <div
      className="inline-flex items-center gap-1 rounded-xl border border-[#E2E5DB] bg-white p-1 shadow-sm"
      role="group"
      aria-label={lang === "id" ? "Pilih bahasa" : "Choose language"}
    >
      <button
        type="button"
        onClick={() => onChange("id")}
        className={buttonClass(lang === "id")}
        aria-pressed={lang === "id"}
        lang="id"
      >
        ID
      </button>

      <button
        type="button"
        onClick={() => onChange("en")}
        className={buttonClass(lang === "en")}
        aria-pressed={lang === "en"}
        lang="en"
      >
        EN
      </button>
    </div>
  );
}
