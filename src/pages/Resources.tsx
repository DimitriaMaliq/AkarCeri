import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { Link } from 'react-router-dom';

const resourceCategories = [
  {
    icon: 'menu_book',
    title: 'Pedoman Konseling Sebaya',
    desc: 'Panduan etika dasar, active listening, dan batasan rujukan konselor sebaya ramah remaja.',
    format: 'Modul PDF & Panduan Aksi',
    badge: 'Kurasi PIK-R',
  },
  {
    icon: 'psychology',
    title: 'Toolkit Regulasi Emosi Remaja',
    desc: 'Lembar kerja praktis identifikasi pemicu stres, teknik grounding 5-4-3-2-1, dan jurnal reflektif.',
    format: 'Template & Lembar Kerja',
    badge: 'Self-Help',
  },
  {
    icon: 'savings',
    title: 'Workbook Literasi Finansial',
    desc: 'Kalkulator alokasi uang saku 50-30-20, panduan menghindari jebakan pinjaman daring, dan habit tabungan.',
    format: 'Spreadsheet & Panduan',
    badge: 'Finansial Remaja',
  },
  {
    icon: 'record_voice_over',
    title: 'Framework Komunikasi & Vokal',
    desc: 'Struktur argumen 3 poin spontan, panduan mengatasi demam panggung, dan teknik vokal hangat.',
    format: 'Audio Guide & Ringkasan',
    badge: 'Public Speaking',
  },
];

export const Resources: React.FC = () => {
  return (
    <PageLayout title="Sumber Belajar">
      {/* Hero Header */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-sage/30 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cream-muted border border-sage/40 text-chocolate mb-4">
            <span className="w-2 h-2 rounded-full bg-cherry animate-pulse" />
            <span className="text-[11px] font-bold text-cherry tracking-widest uppercase font-sans">
              Pustaka &amp; Toolkit Remaja
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-chocolate leading-tight mb-4">
            Sumber <span className="italic text-cherry font-normal">Belajar</span>
          </h1>
          <p className="text-base sm:text-lg text-chocolate/75 max-w-2xl leading-relaxed">
            Kumpulan panduan, lembar kerja terapan, dan referensi terpilih untuk mendukung perjalanan kemandirian dan konseling sebayau.
          </p>
        </div>
      </section>

      {/* Resource Cards Grid */}
      <section className="py-16 bg-cream px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {resourceCategories.map((item) => (
              <div
                key={item.title}
                className="bg-cream-muted border border-sage/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:border-cherry/30 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-cream border border-sage/40 flex items-center justify-center text-cherry">
                      <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-sage-dark bg-cream px-3 py-1 rounded-full border border-sage/30 font-sans">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-chocolate mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-chocolate/75 leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-sage/30 flex items-center justify-between text-xs font-semibold text-chocolate/70">
                  <span>{item.format}</span>
                  <span className="text-cherry font-sans">Segera Tersedia</span>
                </div>
              </div>
            ))}
          </div>

          {/* Under construction announcement card */}
          <div className="rounded-2xl bg-cream-muted border-2 border-dashed border-sage/50 p-10 flex flex-col items-center justify-center text-center">
            <span className="material-symbols-outlined text-4xl text-chocolate/30 mb-3">auto_stories</span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-chocolate mb-2">
              Kurasi Dokumen Berkala
            </h2>
            <p className="text-sm text-chocolate/70 max-w-md leading-relaxed mb-6">
              Materi sumber belajar sedang diselaraskan bersama konselor remaja dan mitra edukasi. Ingin mengusulkan topik panduan baru?
            </p>
            <Link
              to="/komunitas"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cherry text-cream text-sm font-semibold hover:bg-chocolate transition-colors shadow-sm"
            >
              <span>Usulkan di Ruang Komunitas</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Resources;
