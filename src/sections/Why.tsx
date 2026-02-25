export default function Why({ t }: { t: any }) {
  return (
    <section id="why" className="py-28 bg-[#0E0D0C]">
      <div className="px-6 mx-auto max-w-7xl">
        <h2 className="mb-16 font-serif text-4xl font-bold text-center">
          {t.why.title}
        </h2>

        <div className="grid gap-10 md:grid-cols-4">
          {t.why.items.map(([title, desc]: [string, string], i: number) => (
            <div
              key={i}
              className="p-8 rounded-3xl bg-[#11100F] border border-white/10 hover:border-[#7A4A2A]/60 transition"
            >
              <h3 className="mb-3 font-serif text-lg font-semibold">{title}</h3>
              <p className="text-sm text-white/60">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
