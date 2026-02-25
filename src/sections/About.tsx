export default function About({ t }: { t: any }) {
  return (
    <section id="about" className="py-28 bg-[#0E0D0C]">
      <div className="max-w-5xl px-6 mx-auto text-center">
        <h2 className="mb-6 font-serif text-4xl font-bold">{t.about.title}</h2>
        <p className="text-lg leading-relaxed text-white/70">{t.about.desc}</p>
      </div>
    </section>
  );
}
