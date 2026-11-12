import React from 'react';
import { Link } from 'react-router-dom';

interface LessonNavigationProps {
  currentModuleIndex?: number;
  totalModules?: number;
  prevSlug?: string;
  nextSlug?: string;
  nextTitle?: string;
  prevLink?: { to: string; label: string };
  nextLink?: { to: string; label: string; disabled?: boolean };
}

export const LessonNavigation: React.FC<LessonNavigationProps> = ({
  currentModuleIndex = 1,
  totalModules = 6,
  prevSlug,
  nextSlug,
  nextTitle,
  prevLink,
  nextLink,
}) => {
  return (
    <nav
      aria-label="Navigasi Antar Modul"
      className="py-8 border-b border-sage/30 bg-cream-muted/50 px-4 sm:px-6 lg:px-8 font-sans"
    >
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        {/* Previous Button */}
        {prevLink ? (
          <Link
            to={prevLink.to}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-chocolate hover:text-cherry transition-colors group"
          >
            <span
              className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-1"
              aria-hidden="true"
            >
              arrow_back
            </span>
            <span>{prevLink.label}</span>
          </Link>
        ) : prevSlug ? (
          <Link
            to={`/pelajaran/${prevSlug}`}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-chocolate hover:text-cherry transition-colors group"
          >
            <span
              className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-1"
              aria-hidden="true"
            >
              arrow_back
            </span>
            <span>Modul Sebelumnya</span>
          </Link>
        ) : (
          <Link
            to="/eksplorasi"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-chocolate/70 hover:text-cherry transition-colors group"
          >
            <span
              className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-1"
              aria-hidden="true"
            >
              arrow_back
            </span>
            <span>Eksplorasi Kurikulum</span>
          </Link>
        )}

        {/* Center Indicator */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-chocolate">
          <span className="font-serif">Modul 0{currentModuleIndex}</span>
          <span className="text-chocolate/40">/</span>
          <span className="text-chocolate/60">0{totalModules}</span>
        </div>

        {/* Next Button */}
        {nextLink ? (
          nextLink.disabled ? (
            <span
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-chocolate/40 cursor-not-allowed"
              title="Modul berikutnya sedang dalam tahap kurasi"
            >
              <span>{nextLink.label}</span>
              <span className="material-symbols-outlined text-sm">lock</span>
            </span>
          ) : (
            <Link
              to={nextLink.to}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-cherry hover:text-chocolate transition-colors group"
            >
              <span>{nextLink.label}</span>
              <span
                className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              >
                arrow_forward
              </span>
            </Link>
          )
        ) : nextSlug ? (
          <Link
            to={`/pelajaran/${nextSlug}`}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-cherry hover:text-chocolate transition-colors group"
            title={nextTitle ? `Lanjut ke ${nextTitle}` : 'Modul Selanjutnya'}
          >
            <span>Modul Selanjutnya</span>
            <span
              className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            >
              arrow_forward
            </span>
          </Link>
        ) : (
          <Link
            to="/eksplorasi"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-chocolate/60 hover:text-cherry transition-colors group"
            title="Lihat modul kurikulum lainnya di Eksplorasi"
          >
            <span>Eksplorasi Lainnya</span>
            <span
              className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            >
              arrow_forward
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
};

