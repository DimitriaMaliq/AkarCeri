import React from 'react';
import { Link } from 'react-router-dom';
import type { Lesson } from '../../data/lessonsData';

interface LessonHeaderProps {
  lesson: Lesson;
  backLink?: { to: string; label: string };
  isCompleted?: boolean;
  progressPercent?: number;
  completedActivitiesCount?: number;
  totalActivitiesCount?: number;
  onStartClick?: () => void;
}

export const LessonHeader: React.FC<LessonHeaderProps> = ({
  lesson,
  backLink,
  isCompleted = false,
  progressPercent = 0,
  completedActivitiesCount = 0,
  totalActivitiesCount = 6,
  onStartClick,
}) => {
  const effectiveBackLink = backLink || (
    lesson.pillarSlug === 'english-your-way' || lesson.pillar === 'English Your Way'
      ? { to: '/pelajaran/english-your-way', label: 'Kembali ke English Your Way' }
      : { to: '/eksplorasi', label: 'Kembali ke Eksplorasi Life Skills' }
  );

  return (
    <header className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 border-b border-sage/30 bg-cream">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 font-sans">
          <Link
            to={effectiveBackLink.to}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cherry hover:text-chocolate transition-colors group"
          >
            <span
              className="material-symbols-outlined text-sm transition-transform duration-200 group-hover:-translate-x-1"
              aria-hidden="true"
            >
              arrow_back
            </span>
            <span>{effectiveBackLink.label}</span>
          </Link>
        </nav>

        {/* Metadata Badges */}
        <div className="flex flex-wrap items-center gap-2.5 mb-5 font-sans">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-muted border border-sage/40 text-[11px] font-bold text-cherry tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-cherry animate-pulse" />
            <span>{lesson.pillar}</span>
          </span>

          <span className="px-3 py-1 rounded-full bg-sage/25 text-chocolate text-[11px] font-bold uppercase tracking-wider border border-sage/40">
            {lesson.moduleNumber}
          </span>

          <span className="px-3 py-1 rounded-full bg-cream-muted text-chocolate/80 text-[11px] font-semibold border border-sage/30">
            {lesson.level.toUpperCase()}
          </span>

          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-cream-muted text-chocolate/80 text-[11px] font-semibold border border-sage/30">
            <span className="material-symbols-outlined text-sm text-cherry">schedule</span>
            <span>{lesson.duration.toUpperCase()}</span>
          </span>

          {isCompleted && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-cherry text-cream text-[11px] font-bold uppercase tracking-wider shadow-sm">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              <span>Modul Selesai</span>
            </span>
          )}
        </div>

        {/* Display Headline */}
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-chocolate leading-tight mb-6">
          {lesson.title}
        </h1>

        {/* Lead Overview Paragraph */}
        <p className="text-base sm:text-lg text-chocolate/85 leading-relaxed mb-8 max-w-3xl font-sans">
          {lesson.overview}
        </p>

        {/* Learning Objectives Cards Grid */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-cherry text-lg" aria-hidden="true">
              flag
            </span>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-chocolate">
              Tujuan Pembelajaran (Learning Objectives)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 font-sans">
            {lesson.learningObjectives.map((obj, index) => (
              <div
                key={index}
                className="group p-4 sm:p-5 rounded-2xl bg-cream-muted border border-sage/40 hover:border-cherry hover:bg-cream transition-all duration-200 shadow-sm flex items-start gap-3.5"
              >
                <span className="font-serif text-2xl font-bold text-cherry/60 group-hover:text-cherry transition-colors shrink-0 leading-none pt-0.5">
                  0{index + 1}
                </span>
                <p className="text-xs sm:text-sm text-chocolate/80 group-hover:text-chocolate leading-relaxed">
                  {obj}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Header Progress Indicator Bar */}
        <div className="rounded-2xl bg-cream-muted/70 border border-sage/30 p-4 sm:p-5 mb-8 font-sans">
          <div className="flex items-center justify-between gap-3 text-xs font-semibold mb-2">
            <div className="flex items-center gap-2">
              <span className="text-chocolate">Progress Belajar</span>
              <span className="text-cherry font-bold">{progressPercent}%</span>
              {isCompleted && (
                <span className="text-[10px] uppercase font-bold text-green-800 bg-green-100 px-2 py-0.5 rounded-full">
                  Tuntas
                </span>
              )}
            </div>
            <span className="text-chocolate/60 text-[11px]">
              {completedActivitiesCount} dari {totalActivitiesCount} aktivitas terselesaikan
            </span>
          </div>

          <div
            className="w-full h-2 rounded-full bg-cream border border-sage/40 overflow-hidden"
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className={`h-full transition-all duration-300 ${
                isCompleted ? 'bg-green-700' : 'bg-cherry'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* CTA Button to Start */}
        <div>
          <button
            type="button"
            onClick={onStartClick}
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-cherry text-cream font-semibold text-sm sm:text-base hover:bg-chocolate transition-all duration-200 shadow-md hover:shadow hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-cherry focus-visible:outline-none"
          >
            <span>{isCompleted ? 'Pelajari Ulang Modul' : 'Mulai Pelajari Modul'}</span>
            <span
              className="material-symbols-outlined text-lg transition-transform duration-200 group-hover:translate-y-0.5"
              aria-hidden="true"
            >
              arrow_downward
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

