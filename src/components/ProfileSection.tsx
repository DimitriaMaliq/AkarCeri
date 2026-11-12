import React from 'react';

interface PrincipleItem {
  number: string;
  title: string;
  tag: string;
  body: string;
  note: string;
}

const principles: PrincipleItem[] = [
  {
    number: '01',
    title: 'Berbasis Realitas',
    tag: 'Kontekstual',
    body: 'Latihan dirancang langsung dari situasi sehari-hari yang dihadapi remaja: negosiasi tugas kelompok, memecah kecemasan sosial, hingga mengelola uang pertama.',
    note: 'Studi kasus nyata',
  },
  {
    number: '02',
    title: 'Bebas Penghakiman',
    tag: 'Ruang Aman',
    body: 'Eksplorasi aman tanpa tekanan nilai akademis atau peringkat. Setiap kemajuan diukur dari kesiapan dan kenyamanan dirimu sendiri.',
    note: 'Privasi & kenyamanan',
  },
  {
    number: '03',
    title: 'Aplikatif & Terarah',
    tag: 'Mikro-Aksi',
    body: 'Metode mikro-aksi 10–15 menit yang langsung bisa dipraktikkan tanpa menyita waktu sekolah atau kuliahmu.',
    note: '10–15 menit praktis',
  },
];

/**
 * ProfileSection — "Kenalan dengan AKAR CERI"
 * Refined as interactive editorial cards with subtle hover/focus interactions,
 * generous whitespace, and strong editorial typography.
 */
export const ProfileSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-cream border-b border-sage/30" id="profil">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Manifesto Quote */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-cherry block mb-2 font-sans">
            Profil &amp; Filosofi
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-chocolate leading-tight mb-6">
            Kenalan dengan <span className="italic text-cherry font-normal">AKAR CERI</span>
          </h2>
          <p className="text-lg sm:text-xl text-chocolate/90 font-serif italic leading-relaxed border-l-2 border-cherry pl-5">
            &ldquo;Ruang bertumbuh bagi remaja untuk menguasai keterampilan hidup nyata yang sering terlewatkan di ruang kelas formal.&rdquo;
          </p>
        </div>

        {/* Interactive Editorial Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pt-4">
          {principles.map((item) => (
            <div
              key={item.number}
              tabIndex={0}
              role="article"
              aria-label={`${item.number} — ${item.title}`}
              className="group relative flex flex-col justify-between rounded-2xl bg-cream-muted/70 p-7 sm:p-8 border border-sage/40 hover:border-cherry/60 hover:bg-cream-muted hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:border-cherry focus-visible:ring-2 focus-visible:ring-cherry focus-visible:outline-none transition-all duration-200 ease-out motion-reduce:hover:translate-y-0 motion-reduce:focus-visible:translate-y-0 cursor-default shadow-sm hover:shadow"
            >
              <div>
                {/* Visual Anchor Number */}
                <div className="flex items-baseline justify-between mb-4">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-chocolate/35 group-hover:text-cherry group-focus-visible:text-cherry transition-colors duration-200 select-none">
                    {item.number}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-sage-dark group-hover:text-cherry transition-colors duration-200 px-2.5 py-0.5 rounded-full bg-cream border border-sage/30 font-sans">
                    {item.tag}
                  </span>
                </div>

                {/* Editorial Title */}
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-chocolate mb-3 leading-snug group-hover:text-chocolate">
                  {item.title}
                </h3>

                {/* Short Supporting Description */}
                <p className="text-sm text-chocolate/80 leading-relaxed mb-6">
                  {item.body}
                </p>
              </div>

              {/* Directional Footer with Subtle Arrow */}
              <div className="pt-4 border-t border-sage/30 flex items-center justify-between text-xs font-semibold text-chocolate/65 group-hover:text-cherry group-focus-visible:text-cherry transition-colors duration-200 font-sans">
                <span>{item.note}</span>
                <span
                  className="material-symbols-outlined text-base transition-transform duration-200 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:group-hover:translate-x-0"
                  aria-hidden="true"
                >
                  arrow_forward
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
