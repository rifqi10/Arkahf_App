export default function Footer({ t }: { t: any }) {
  return (
    <footer className="py-8 text-sm text-center bg-black text-white/50">
      © {new Date().getFullYear()} {t.footer.brand}
    </footer>
  );
}
