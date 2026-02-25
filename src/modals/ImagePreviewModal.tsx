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
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative max-h-[90vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute px-3 py-2 text-white rounded-full -right-3 -top-3 bg-black/70 hover:bg-black"
          aria-label={closeLabel}
        >
          ✕
        </button>

        <img
          src={src}
          alt={alt}
          className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain"
        />
      </div>
    </div>
  );
}
