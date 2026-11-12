import React from 'react';

interface StageItem {
  step: string;
  eyebrow: string;
  title: string;
  body: string;
  actionNote: string;
}

const stages: StageItem[] = [
  {
    step: '01',
    eyebrow: 'Langkah Pertama',
    title: 'Kenali',
    body: 'Refleksi awal mengenali blind spot dan potensi diri melalui asesmen singkat tanpa tekanan ujian formal.',
    actionNote: 'Asesmen Diri & Pemetaan',
  },
  {
    step: '02',
    eyebrow: 'Langkah Kedua',
    title: 'Latih',
    body: 'Studi kasus kontekstual 10–15 menit yang terstruktur untuk mengasah pola pikir dan keberanian bertindak.',
    actionNote: 'Skenario Terapan 10–15 Menit',
  },
  {
    step: '03',
    eyebrow: 'Langkah Ketiga',
    title: 'Terapkan',
    body: 'Praktik langsung dalam komunikasi, finansial, dan relasi nyata dengan umpan balik konstruktif di ruang suportif.',
    actionNote: 'Aksi Nyata & Refleksi Sebaya',
  },
];

/**
 * LearningApproachSection — "Bagaimana Cara Belajar Bekerja"
 * Interactive learning journey: Kenali → Latih → Terapkan.
 * Features connecting progression line on desktop, active hover states,
 * and clear typographical hierarchy.
 */
export const LearningApproachSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-cream-muted border-b border-sage/40" id="cara-belajar">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-cherry block mb-2 font-sans">
            Alur Terstruktur
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-chocolate">
            Bagaimana Cara Belajar Bekerja
          </h2>
          <p className="text-sm sm:text-base text-chocolate/75 mt-3 leading-relaxed">
            Tiga tahapan sederhana yang dirancang agar kamu dapat bertumbuh secara organik.
          </p>

          {/* Journey Sequence Indicator Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream border border-sage/40 text-xs font-semibold text-chocolate/85 mt-5 shadow-sm font-sans">
            <span className="hover:text-cherry transition-colors">01 Kenali</span>
            <span className="text-cherry font-bold" aria-hidden="true">→</span>
            <span className="hover:text-cherry transition-colors">02 Latih</span>
            <span className="text-cherry font-bold" aria-hidden="true">→</span>
            <span className="hover:text-cherry transition-colors">03 Terapkan</span>
          </div>
        </div>

        {/* Interactive Learning Journey Progression Track */}
        <div className="relative">
          {/* Subtle Desktop Connecting Line */}
          <div
            className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-sage/45 z-0"
            aria-hidden="true"
          />

          {/* Stages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 relative z-10">
            {stages.map((stage, idx) => (
              <div
                key={stage.step}
                tabIndex={0}
                role="region"
                aria-label={`Tahap ${stage.step}: ${stage.title}`}
                className="group relative flex flex-col justify-between rounded-2xl bg-cream/70 hover:bg-cream p-7 sm:p-8 border border-sage/40 hover:border-cherry/60 hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cherry transition-all duration-200 ease-out motion-reduce:hover:translate-y-0 cursor-default shadow-sm hover:shadow"
              >
                <div>
                  {/* Step Anchor Node */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-cream border-2 border-sage/50 group-hover:border-cherry group-hover:bg-cherry group-focus-visible:border-cherry group-focus-visible:bg-cherry flex items-center justify-center font-serif text-xl font-bold text-chocolate group-hover:text-cream group-focus-visible:text-cream transition-all duration-200 shadow-sm">
                      {stage.step}
                    </div>
                    {idx < stages.length - 1 && (
                      <span
                        className="hidden md:inline-flex text-sage-dark group-hover:text-cherry transition-colors font-sans text-xs font-semibold"
                        aria-hidden="true"
                      >
                        Tahap {idx + 1} dari 3
                      </span>
                    )}
                    {idx === stages.length - 1 && (
                      <span
                        className="hidden md:inline-flex text-cherry font-sans text-xs font-bold uppercase tracking-wider"
                        aria-hidden="true"
                      >
                        Tahap Final
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-bold uppercase tracking-wider text-cherry block mb-1 font-sans">
                    {stage.eyebrow}
                  </span>

                  {/* Stage Title */}
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-chocolate group-hover:text-chocolate mb-2 transition-colors duration-200">
                    {stage.title}
                  </h3>

                  {/* Subtle Underline Progression Indicator */}
                  <div
                    className="w-8 h-0.5 bg-sage/45 group-hover:w-16 group-hover:bg-cherry transition-all duration-200 mb-3"
                    aria-hidden="true"
                  />

                  {/* Concise Description */}
                  <p className="text-sm text-chocolate/80 group-hover:text-chocolate leading-relaxed transition-colors duration-200 mb-6">
                    {stage.body}
                  </p>
                </div>

                {/* Footer Note */}
                <div className="pt-4 border-t border-sage/30 flex items-center justify-between text-xs font-semibold text-chocolate/65 group-hover:text-cherry transition-colors duration-200 font-sans">
                  <span>{stage.actionNote}</span>
                  <span
                    className="material-symbols-outlined text-base transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:group-hover:translate-x-0"
                    aria-hidden="true"
                  >
                    arrow_forward
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
