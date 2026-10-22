
export default function Footer({ t }: { t: any }) {
  return (
    <footer className="border-t border-white/10 bg-[#202820] px-5 py-7 text-center text-sm text-white/65">
      <p>
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-[#F0D7B6]">
          {t.footer.brand}
        </span>
      </p>
      <p className="mt-2 text-xs text-white/45">
        Crafted with care.
      </p>
    </footer>
  );
}
