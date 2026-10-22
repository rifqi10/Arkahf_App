
import { useEffect } from "react";

type Props = {
  src: string;
  alt: string;
  onClose: () => void;
  closeLabel: string;
};

export default function ImagePreviewModal({
  src,
  alt,
  onClose,
  closeLabel,
}: Props) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div
      className="
        fixed inset-0 z-[1000] flex items-center justify-center
        overflow-y-auto bg-[#172019]/90 p-3 backdrop-blur-sm
        sm:p-6
      "
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <div
        className="
          relative flex max-h-[94dvh] max-w-[96vw] items-center
          justify-center rounded-2xl border border-white/15
          bg-[#F7F5EF] p-2 shadow-2xl
          sm:max-h-[92dvh] sm:max-w-[92vw] sm:rounded-3xl sm:p-3
        "
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="
            absolute -right-2 -top-2 z-10 flex size-10 items-center
            justify-center rounded-full border border-white/20
            bg-[#315747] text-white shadow-lg transition
            hover:bg-[#294737] focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-white
            focus-visible:ring-offset-2 focus-visible:ring-offset-[#315747]
            sm:-right-3 sm:-top-3
          "
          aria-label={closeLabel}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="size-5"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m18 6-12 12M6 6l12 12"
            />
          </svg>
        </button>

        <img
          src={src}
          alt={alt}
          className="
            max-h-[calc(94dvh-1rem)] max-w-full rounded-xl
            object-contain sm:max-h-[calc(92dvh-1.5rem)]
            sm:rounded-2xl
          "
        />
      </div>
    </div>
  );
}
