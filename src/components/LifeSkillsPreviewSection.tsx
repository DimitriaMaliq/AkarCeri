import React from 'react';
import { Link } from 'react-router-dom';

/**
 * LifeSkillsPreviewSection — "Kecakapan Esensial untuk Masa Depanmu"
 * Features clear visual hierarchy:
 * - Featured Skill: "Public Speaking & Komunikasi" (stronger visual weight, prominent badge, larger typography)
 * - Supporting Skills: "English Communication" & "Money Management" (visually lighter and more compact)
 * - Typography-first (zero illustrations or photographs per brief)
 * - Smooth micro-interactions (hover:-translate-y-1, group-hover:translate-x-1, 200ms transition)
 */
export const LifeSkillsPreviewSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-cream border-b border-sage/30" id="life-skills">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline & Subtitle */}
        <div className="max-w-2xl mb-12 sm:mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-cherry block mb-2 font-sans">
            Kurikulum Pilihan
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-chocolate mb-3">
            Kecakapan Esensial untuk Masa Depanmu
          </h2>
          <p className="text-sm sm:text-base text-chocolate/80 leading-relaxed">
            Katalog kurikulum ringkas yang dirancang relevan, terapan, dan bebas dari beban hafalan kaku.
          </p>
        </div>

        {/* Visual Hierarchy: Featured Skill (7 cols) + Supporting Skills (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-12 items-stretch">

          {/* ───────────────────────────────────────────────────────────
              FEATURED SKILL: Public Speaking & Komunikasi (Stronger Visual Weight)
          ─────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-7 flex flex-col">
            <Link
              to="/pelajaran/public-speaking"
              className="group relative flex flex-col justify-between h-full rounded-3xl bg-cream-muted p-8 sm:p-10 border-2 border-cherry/35 hover:border-cherry/80 hover:bg-cream hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cherry transition-all duration-200 ease-out motion-reduce:hover:translate-y-0 shadow-sm hover:shadow-md"
              aria-label="Pelajari Public Speaking & Komunikasi — Pilar Utama"
            >
              <div>
                {/* Featured Eyebrow Badge */}
                <div className="flex items-center justify-between gap-3 mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cherry text-cream text-[11px] font-bold uppercase tracking-wider font-sans shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-cream animate-pulse" />
                    <span>Pilar 01 • Topik Utama</span>
                  </div>
                  <span className="text-xs font-semibold text-chocolate/65 font-sans">
                    4 Modul Terarah
                  </span>
                </div>

                {/* Primary Icon */}
                <div className="w-12 h-12 rounded-2xl bg-cherry text-cream flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform duration-200 motion-reduce:group-hover:scale-100">
                  <span className="material-symbols-outlined text-2xl">record_voice_over</span>
                </div>

                {/* Category Label */}
                <span className="text-xs font-bold uppercase tracking-widest text-cherry block mb-1 font-sans">
                  Komunikasi &amp; Keberanian Vokal
                </span>

                {/* Dominant Headline */}
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-chocolate mb-4 leading-tight group-hover:text-chocolate">
                  Public Speaking &amp; Komunikasi
                </h3>

                {/* Richer Description */}
                <p className="text-sm sm:text-base text-chocolate/80 leading-relaxed mb-8">
                  Seni bicara percaya diri dan menyusun argumen tanpa cemas di depan audiens kelas, forum, maupun presentasi profesional. Dilengkapi formula 3 poin spontan dan teknik pernapasan vokal 4-4-4.
                </p>
              </div>

              {/* Bottom Action Row */}
              <div className="pt-6 border-t border-sage/40 flex items-center justify-between text-xs sm:text-sm font-semibold text-chocolate">
                <span className="text-chocolate/75 font-sans">15 Menit Mikro-Aksi</span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cherry text-cream text-xs font-semibold group-hover:bg-chocolate transition-colors font-sans shadow-sm">
                  <span>Mulai Belajar</span>
                  <span
                    className="material-symbols-outlined text-sm transition-transform duration-200 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
                    aria-hidden="true"
                  >
                    arrow_forward
                  </span>
                </span>
              </div>
            </Link>
          </div>

          {/* ───────────────────────────────────────────────────────────
              SUPPORTING SKILLS (Visually Lighter / More Compact)
          ─────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 justify-between">

            {/* Supporting Skill 1: English Communication */}
            <Link
              to="/pelajaran/english-your-way"
              className="group relative flex flex-col justify-between rounded-2xl bg-cream-muted/70 hover:bg-cream p-6 sm:p-7 border border-sage/40 hover:border-sage-dark/80 hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cherry transition-all duration-200 ease-out motion-reduce:hover:translate-y-0 shadow-sm hover:shadow"
              aria-label="Pelajari English Communication — Pilar 02"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-sage-dark text-cream flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-lg">translate</span>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-sage-dark bg-cream px-2.5 py-0.5 rounded-full border border-sage/30 font-sans">
                    Pilar 02
                  </span>
                </div>

                <span className="text-[11px] font-bold uppercase tracking-wider text-sage-dark block mb-1 font-sans">
                  Global Communication
                </span>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-chocolate mb-2 leading-snug group-hover:text-chocolate">
                  English Communication
                </h3>

                <p className="text-xs sm:text-sm text-chocolate/75 leading-relaxed mb-4">
                  Percakapan santai sehari-hari tanpa terjebak grammar kaku. Berani berpendapat secara artikulatif dalam jejaring global.
                </p>
              </div>

              <div className="pt-3 border-t border-sage/30 flex items-center justify-between text-xs font-semibold text-chocolate/70 group-hover:text-sage-dark transition-colors font-sans">
                <span>6 Modul Terarah</span>
                <span className="inline-flex items-center gap-1 font-bold">
                  <span>Eksplor</span>
                  <span
                    className="material-symbols-outlined text-sm transition-transform duration-200 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
                    aria-hidden="true"
                  >
                    arrow_forward
                  </span>
                </span>
              </div>
            </Link>

            {/* Supporting Skill 2: Money Management */}
            <Link
              to="/pelajaran/money-matters"
              className="group relative flex flex-col justify-between rounded-2xl bg-cream-muted/70 hover:bg-cream p-6 sm:p-7 border border-sage/40 hover:border-chocolate/60 hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cherry transition-all duration-200 ease-out motion-reduce:hover:translate-y-0 shadow-sm hover:shadow"
              aria-label="Pelajari Money Management — Pilar 03"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-chocolate text-cream flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-lg">account_balance_wallet</span>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-chocolate/80 bg-cream px-2.5 py-0.5 rounded-full border border-sage/30 font-sans">
                    Pilar 03
                  </span>
                </div>

                <span className="text-[11px] font-bold uppercase tracking-wider text-chocolate/70 block mb-1 font-sans">
                  Literasi Finansial Remaja
                </span>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-chocolate mb-2 leading-snug group-hover:text-chocolate">
                  Money Management
                </h3>

                <p className="text-xs sm:text-sm text-chocolate/75 leading-relaxed mb-4">
                  Kelola uang saku, hindari jebakan konsumtif, dan bangun literasi finansial mandiri tanpa rasa bingung atau cemas.
                </p>
              </div>

              <div className="pt-3 border-t border-sage/30 flex items-center justify-between text-xs font-semibold text-chocolate/70 group-hover:text-chocolate transition-colors font-sans">
                <span>14 Modul Praktis</span>
                <span className="inline-flex items-center gap-1 font-bold">
                  <span>Eksplor</span>
                  <span
                    className="material-symbols-outlined text-sm transition-transform duration-200 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
                    aria-hidden="true"
                  >
                    arrow_forward
                  </span>
                </span>
              </div>
            </Link>

          </div>
        </div>

        {/* Single Text Arrow Link */}
        <div>
          <Link
            to="/eksplorasi"
            className="inline-flex items-center gap-2 text-base font-semibold text-cherry hover:text-chocolate transition-colors group font-sans"
          >
            <span>Lihat semua kecakapan</span>
            <span
              className="material-symbols-outlined text-lg transition-transform duration-200 ease-out group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
              aria-hidden="true"
            >
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};
