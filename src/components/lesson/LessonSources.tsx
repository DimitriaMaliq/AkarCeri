import React from 'react';
import type { Source } from '../../data/lessonsData';

interface LessonSourcesProps {
  sources: Source[];
}

export const LessonSources: React.FC<LessonSourcesProps> = ({ sources }) => {
  if (!sources || sources.length === 0) return null;

  return (
    <section
      id="section-sources"
      className="py-12 sm:py-16 border-b border-sage/30 bg-cream"
      aria-labelledby="sources-title"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-2 font-sans">
          <span className="material-symbols-outlined text-cherry text-base" aria-hidden="true">
            menu_book
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-sage-dark">
            Integritas Pengetahuan &amp; Kurasi
          </span>
        </div>

        <h2
          id="sources-title"
          className="font-serif text-2xl sm:text-3xl font-medium text-chocolate mb-2 leading-snug"
        >
          Sumber &amp; Referensi
        </h2>

        <p className="text-xs sm:text-sm text-chocolate/70 leading-relaxed mb-6 font-sans">
          Materi AKAR CERI disusun berbasis riset psikologi perilaku, komunikasi vokal internasional, dan panduan resmi bina ketahanan remaja.
        </p>

        {/* Sources Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
          {sources.map((src, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-cream-muted/60 border border-sage/40 hover:border-cherry/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cream border border-sage/30 text-sage-dark">
                    {src.type || 'Referensi'}
                  </span>
                </div>
                <h3 className="font-serif text-base font-bold text-chocolate mb-1 leading-snug">
                  {src.title}
                </h3>
                <p className="text-xs text-chocolate/65 mb-3">
                  {src.authorOrInstitution}
                </p>
              </div>

              <div>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-cherry hover:text-chocolate transition-colors"
                >
                  <span>Buka Tautan Sumber</span>
                  <span className="material-symbols-outlined text-sm" aria-hidden="true">
                    arrow_outward
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

