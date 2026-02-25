export default function Contact({ t }: { t: any }) {
  return (
    <section
      id="contact"
      className="py-28 text-center text-[#F3E9D2] bg-gradient-to-br from-[#5E361F] to-[#2E1A10]"
    >
      <div className="max-w-4xl px-6 mx-auto">
        <h2 className="mb-6 font-serif text-4xl font-bold">
          {t.contact.title}
        </h2>
        <p className="mb-10 text-lg text-white/80">{t.contact.desc}</p>

        <div className="space-y-3 text-lg">
          <p>Email: arkahf65@gmail.com</p>
          <p>WhatsApp: +6285640905903</p>
        </div>

        <div className="mt-10">
          <a
            href="https://wa.me/6285640905903?text=Halo%20Arkahf,%20saya%20tertarik%20dengan%20produk%20anda."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 font-semibold transition rounded-xl bg-[#F3E9D2] text-[#2E1A10] hover:bg-[#E6D8BC]"
          >
            {t.contact.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
