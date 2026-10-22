
export default function Contact({ t }: { t: any }) {
  return (
    <section
      id="contact"
      className="scroll-mt-24 relative overflow-hidden bg-[#294737] py-20 text-center text-white sm:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#C58B55]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
        <span className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[#E9D4B7]">
          Get in Touch
        </span>

        <h2 className="mb-5 font-serif text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
          {t.contact.title}
        </h2>

        <p className="mx-auto mb-10 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
          {t.contact.desc}
        </p>

        <div className="mx-auto flex max-w-xl flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href="mailto:arkahf65@gmail.com"
            className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Email: arkahf65@gmail.com
          </a>

          <a
            href="https://wa.me/6285640905903?text=Halo%20Arkahf%20Craft,%20saya%20tertarik%20dengan%20produk%20anda."
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            WhatsApp: +62 856-4090-5903
          </a>
        </div>

        <a
          href="https://wa.me/6285640905903?text=Halo%20Arkahf%20Craft,%20saya%20tertarik%20dengan%20produk%20anda."
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#F0D7B6] px-8 py-4 font-bold text-[#294737] shadow-lg shadow-black/10 transition duration-200 hover:-translate-y-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#294737]"
        >
          {t.contact.cta}
          <span aria-hidden="true" className="ml-2">↗</span>
        </a>
      </div>
    </section>
  );
}
