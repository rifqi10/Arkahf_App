
export default function Why({ t }: { t: any }) {
  return (
    <section
      id="why"
      className="scroll-mt-24 bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <span className="mb-4 inline-block rounded-full bg-[#EAF0E9] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#315747]">
            Why Arkahf Craft
          </span>

          <h2 className="font-serif text-3xl font-bold tracking-tight text-[#294737] sm:text-4xl lg:text-5xl">
            {t.why.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {t.why.items.map(
            ([title, desc]: [string, string], i: number) => (
              <div
                key={i}
                className="group rounded-2xl border border-[#E7E5DC] bg-[#F9F8F3] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#C4D4C4] hover:bg-white hover:shadow-xl hover:shadow-[#294737]/5 sm:p-7"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#E5EDE3] font-serif text-lg font-bold text-[#315747] transition group-hover:bg-[#315747] group-hover:text-white">
                  {String(i + 1).padStart(2, "0")}
                </div>

                <h3 className="mb-3 font-serif text-lg font-bold leading-snug text-[#294737]">
                  {title}
                </h3>

                <p className="text-sm leading-7 text-[#6B7068]">
                  {desc}
                </p>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
