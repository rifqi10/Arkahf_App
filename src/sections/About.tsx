
export default function About({ t }: { t: any }) {
  return (
    <section
      id="about"
      className="scroll-mt-24 bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <span className="mb-4 inline-block rounded-full bg-[#EAF0E9] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#315747]">
          Arkahf Craft
        </span>

        <h2 className="mb-6 font-serif text-3xl font-bold leading-tight tracking-tight text-[#294737] sm:text-4xl lg:text-5xl">
          {t.about.title}
        </h2>

        <p className="mx-auto max-w-3xl text-base leading-8 text-[#62675F] sm:text-lg sm:leading-9">
          {t.about.desc}
        </p>

        <div className="mx-auto mt-8 h-1 w-16 rounded-full bg-[#C58B55]" />
      </div>
    </section>
  );
}

