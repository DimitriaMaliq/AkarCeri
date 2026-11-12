import React from 'react';
import { Link } from 'react-router-dom';

export const HeroSection: React.FC = () => {
  return (
    <section
      className="relative py-16 sm:py-20 lg:py-28 overflow-hidden border-b border-sage/30 bg-cream"
      data-purpose="hero-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">

          {/* Left Column: Editorial Headline & Manifesto */}
          <div className="lg:col-span-7 flex flex-col items-start pr-0 lg:pr-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage/25 border border-sage/40 text-chocolate text-xs font-semibold tracking-wider uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-cherry flex-shrink-0 animate-pulse" />
              <span>Life Skills Academy • Teen &amp; Youth Readiness</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-chocolate font-medium tracking-tight leading-[1.12] mb-6">
              Belajar kecakapan hidup nyata,{' '}
              <br className="hidden sm:inline" />
              <span className="italic text-cherry font-normal">bertumbuh</span> dengan caramu.
            </h1>

            <p className="text-base sm:text-lg text-chocolate/80 max-w-xl leading-relaxed mb-8">
              Bekal penting yang kerap terlewat di ruang kelas konvensional: dari seni berbicara tanpa cemas, nalar kritis, hingga kecerdasan emosional. Didesain terapan, santai, dan siap pakai menghadapi dunia nyata tanpa beban ujian.
            </p>

            {/* Two Clean Buttons */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5 w-full sm:w-auto">
              <Link
                to="/eksplorasi"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-cherry text-cream font-semibold text-sm sm:text-base hover:bg-chocolate transition-all duration-200 shadow-md hover:shadow hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-cherry focus-visible:outline-none motion-reduce:hover:translate-y-0"
              >
                <span>Jelajahi Life Skills</span>
                <span className="material-symbols-outlined text-lg transition-transform duration-200 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0" aria-hidden="true">arrow_forward</span>
              </Link>
              <a
                href="#profil"
                className="group inline-flex items-center gap-1.5 text-sm sm:text-base font-semibold text-chocolate/80 hover:text-cherry transition-colors py-3.5 px-3 focus-visible:ring-2 focus-visible:ring-cherry focus-visible:outline-none rounded-full"
              >
                <span>Kenali AKAR CERI</span>
                <span className="material-symbols-outlined text-lg transition-transform duration-200 group-hover:translate-y-0.5 motion-reduce:group-hover:translate-y-0" aria-hidden="true">arrow_downward</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interconnected Growth Matrix Visual */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="w-full max-w-md rounded-3xl bg-cream-muted border border-sage/50 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-sage/40 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cherry animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-chocolate font-sans">
                    Life Skills Growth Matrix
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-chocolate/60 uppercase tracking-wider">
                  Pondasi Mandiri
                </span>
              </div>

              <div className="relative w-full h-[280px] rounded-2xl bg-cream border border-sage/30 p-4 flex items-center justify-center overflow-hidden">
                {/* SVG Interconnected Matrix Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <line stroke="#CDC69A" strokeDasharray="3 3" strokeWidth="1.5" x1="25%" x2="50%" y1="25%" y2="50%" />
                  <line stroke="#CDC69A" strokeWidth="1.5" x1="75%" x2="50%" y1="25%" y2="50%" />
                  <line stroke="#A7292F" strokeWidth="2" x1="50%" x2="25%" y1="50%" y2="75%" />
                  <line stroke="#CDC69A" strokeDasharray="3 3" strokeWidth="1.5" x1="50%" x2="75%" y1="50%" y2="75%" />
                  <circle cx="50%" cy="50%" fill="none" r="54" stroke="#CDC69A" strokeOpacity="0.4" strokeWidth="1" />
                </svg>

                {/* Center Node */}
                <div className="z-10 bg-chocolate text-cream p-3 rounded-xl border border-cherry shadow text-center min-w-[130px]">
                  <span className="text-[9px] uppercase tracking-wider text-sage block font-bold">
                    Inti Kemandirian
                  </span>
                  <p className="font-bold text-xs text-cream">Critical Thinking</p>
                  <span className="text-[10px] text-cherry font-medium">78% Kesiapan</span>
                </div>

                {/* Node 1: Public Speaking */}
                <div className="absolute top-4 left-4 z-10 bg-cream-muted border border-sage/50 px-3 py-1.5 rounded-lg shadow-sm hover:border-cherry/60 hover:-translate-y-0.5 transition-all duration-200 cursor-default">
                  <p className="font-bold text-[11px] text-chocolate">Public Speaking</p>
                  <span className="text-[10px] text-cherry font-medium">Percaya Diri +84%</span>
                </div>

                {/* Node 2: Cerdas Finansial */}
                <div className="absolute top-4 right-4 z-10 bg-cream-muted border border-sage/50 px-3 py-1.5 rounded-lg shadow-sm text-right hover:border-sage-dark/80 hover:-translate-y-0.5 transition-all duration-200 cursor-default">
                  <p className="font-bold text-[11px] text-chocolate">Cerdas Finansial</p>
                  <span className="text-[10px] text-chocolate/70 font-medium">Mandiri Positif</span>
                </div>

                {/* Node 3: Regulasi Emosi */}
                <div className="absolute bottom-4 left-4 z-10 bg-cream-muted border border-sage/50 px-3 py-1.5 rounded-lg shadow-sm hover:border-sage-dark/80 hover:-translate-y-0.5 transition-all duration-200 cursor-default">
                  <p className="font-bold text-[11px] text-chocolate">Regulasi Emosi</p>
                  <span className="text-[10px] text-chocolate/70 font-medium">Stabilitas Prima</span>
                </div>

                {/* Node 4: English Fluency */}
                <div className="absolute bottom-4 right-4 z-10 bg-cream-muted border border-sage/50 px-3 py-1.5 rounded-lg shadow-sm text-right hover:border-cherry/60 hover:-translate-y-0.5 transition-all duration-200 cursor-default">
                  <p className="font-bold text-[11px] text-chocolate">English Fluency</p>
                  <span className="text-[10px] text-cherry font-medium">Komunikasi Global</span>
                </div>
              </div>

              <p className="text-xs text-center text-chocolate/60 mt-4 leading-relaxed">
                Simulasi kerangka kemandirian terpadu untuk pemuda dan remaja.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
