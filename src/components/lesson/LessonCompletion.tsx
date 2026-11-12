import React from 'react';
import { Link } from 'react-router-dom';
import type { Lesson } from '../../data/lessonsData';

interface LessonCompletionProps {
  lesson: Lesson;
  nextModuleSlug?: string;
  nextModuleTitle?: string;
  parentPillarLink?: { to: string; label: string };
}

export const LessonCompletion: React.FC<LessonCompletionProps> = ({
  lesson,
  nextModuleSlug,
  nextModuleTitle = 'Modul 02: Speak Without Translating',
  parentPillarLink,
}) => {
  return (
    <section
      id="section-completion"
      className="py-14 sm:py-20 bg-cream border-b border-sage/30 px-4 sm:px-6 lg:px-8"
      aria-label="Panel Kelulusan Modul"
    >
      <div className="max-w-4xl mx-auto">
        <div className="rounded-3xl bg-chocolate text-cream p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          {/* Subtle Decorative Background Rings */}
          <div
            className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full border border-cream/10 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -right-10 -bottom-10 w-60 h-60 rounded-full border border-cherry/20 pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-2xl font-sans">
            {/* Pill & Icon */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream/15 text-sage text-xs font-bold uppercase tracking-wider mb-5 border border-sage/30">
              <span className="material-symbols-outlined text-base text-cherry">celebration</span>
              <span>Modul Berhasil Kamu Tuntaskan</span>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-cream leading-tight">
                LESSON COMPLETE
              </h3>
            </div>

            <p className="font-serif text-2xl sm:text-3xl text-sage mb-4 font-bold flex items-center gap-2">
              <span>{lesson.title}</span>
              <span className="text-cherry text-2xl font-sans">✓</span>
            </p>

            <p className="text-sm sm:text-base text-cream/85 leading-relaxed mb-8 max-w-xl">
              Selamat! Kamu telah menyelesaikan seluruh tahapan belajar, menyimak paparan ahli, menuntaskan tantangan berbicara, menguji skenario pemahaman, dan mencatat komitmen bicaramu.
            </p>

            {/* Navigation Buttons */}
            <div className="flex flex-wrap items-center gap-3.5">
              {parentPillarLink ? (
                <Link
                  to={parentPillarLink.to}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-cream text-chocolate font-semibold text-xs sm:text-sm hover:bg-cream-muted transition-all duration-200 shadow-md hover:-translate-y-0.5"
                >
                  <span className="material-symbols-outlined text-base">arrow_back</span>
                  <span>{parentPillarLink.label}</span>
                </Link>
              ) : (
                <Link
                  to="/eksplorasi"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-cream text-chocolate font-semibold text-xs sm:text-sm hover:bg-cream-muted transition-all duration-200 shadow-md hover:-translate-y-0.5"
                >
                  <span className="material-symbols-outlined text-base">grid_view</span>
                  <span>Kembali ke Eksplorasi</span>
                </Link>
              )}

              {nextModuleSlug ? (
                <Link
                  to={`/pelajaran/${nextModuleSlug}`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-cherry text-cream font-semibold text-xs sm:text-sm hover:bg-cream hover:text-chocolate transition-all duration-200 shadow-md hover:-translate-y-0.5"
                >
                  <span>Lanjut ke {nextModuleTitle}</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
              ) : (
                <span className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-cream/15 text-cream/60 text-xs sm:text-sm font-semibold border border-sage/20 cursor-not-allowed">
                  <span>{nextModuleTitle} (Segera Hadir)</span>
                  <span className="material-symbols-outlined text-base">lock</span>
                </span>
              )}

              <Link
                to="/peta-pik-r"
                className="inline-flex items-center gap-1.5 px-5 py-3.5 rounded-full bg-cream/10 border border-sage/30 text-cream text-xs sm:text-sm font-semibold hover:bg-cream/20 transition-colors"
              >
                <span className="material-symbols-outlined text-base">map</span>
                <span>Latihan Nyata di PIK-R Cimahi</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LessonCompletion;
