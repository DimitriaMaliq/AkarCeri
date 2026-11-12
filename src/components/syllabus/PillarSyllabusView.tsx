import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageLayout } from '../PageLayout';
import { getLessonProgress } from '../../data/lessonsData';

export interface SyllabusModuleItem {
  number: string;
  title: string;
  subtitle: string;
  level: string;
  duration?: string;
  status: 'available' | 'coming_soon';
  slug?: string;
  targetUrl?: string;
  description: string;
  focusPoints?: string[];
  highlights?: string[];
}

export interface PhilosophyStep {
  label: string;
  sublabel?: string;
  active?: boolean;
}

export interface PillarSyllabusViewProps {
  pageTitle: string;
  pillarBadge: string;
  taglineBadge: string;
  modulesCountBadge: string;
  headline: string;
  italicSubtitle: string;
  leadDescription: string;
  philosophyTitle?: string;
  philosophySteps: PhilosophyStep[];
  modules: SyllabusModuleItem[];
  communityCallout?: {
    tag: string;
    title: string;
    description: string;
  };
}

export const PillarSyllabusView: React.FC<PillarSyllabusViewProps> = ({
  pageTitle,
  pillarBadge,
  taglineBadge,
  modulesCountBadge,
  headline,
  italicSubtitle,
  leadDescription,
  philosophyTitle = 'Alur Perjalanan Pembelajaran (Learning Progression):',
  philosophySteps,
  modules,
  communityCallout = {
    tag: 'Jejaring Konseling Sebaya Kota Cimahi',
    title: 'Ruang Latihan Nyata yang Bebas Penghakiman',
    description:
      'Pusat Informasi dan Konseling Remaja (PIK-R) siap menjadi kawan latihan bicaramu tanpa rasa cemas dihakimi. Temukan pos terdekat di sekitarmu.',
  },
}) => {
  const navigate = useNavigate();

  return (
    <PageLayout title={pageTitle}>
      {/* 1. Hero Header */}
      <header className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-sage/30 bg-cream">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 font-sans">
            <Link
              to="/eksplorasi"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-cherry hover:text-chocolate transition-colors group"
            >
              <span
                className="material-symbols-outlined text-sm transition-transform duration-200 group-hover:-translate-x-1"
                aria-hidden="true"
              >
                arrow_back
              </span>
              <span>Kembali ke Eksplorasi Kurikulum</span>
            </Link>
          </nav>

          {/* Eyebrow Badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-5 font-sans">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-muted border border-sage/40 text-[11px] font-bold text-cherry tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-cherry animate-pulse" />
              <span>{pillarBadge}</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-sage/25 text-chocolate text-[11px] font-bold uppercase tracking-wider border border-sage/40">
              {taglineBadge}
            </span>
            <span className="px-3 py-1 rounded-full bg-cream-muted text-chocolate/80 text-[11px] font-semibold border border-sage/30">
              {modulesCountBadge}
            </span>
          </div>

          {/* Title & Italic Subtitle */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-chocolate leading-tight mb-4">
            {headline}
          </h1>

          <p className="font-serif italic text-xl sm:text-2xl text-cherry mb-6 leading-relaxed max-w-4xl">
            {italicSubtitle}
          </p>

          <p className="text-base sm:text-lg text-chocolate/85 leading-relaxed max-w-3xl mb-10 font-sans">
            {leadDescription}
          </p>

          {/* Philosophy / Progression Roadmap Visual */}
          {philosophySteps && philosophySteps.length > 0 && (
            <div className="rounded-2xl bg-cream-muted p-5 sm:p-7 border border-sage/40 shadow-sm font-sans">
              <span className="text-[11px] font-bold uppercase tracking-widest text-chocolate/60 block mb-3.5">
                {philosophyTitle}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {philosophySteps.map((step, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border transition-all ${
                      step.active
                        ? 'bg-cream border-cherry/60 shadow-sm ring-1 ring-cherry/40'
                        : 'bg-cream/60 border-sage/35'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                          step.active
                            ? 'bg-cherry text-cream'
                            : 'bg-sage/30 text-chocolate/70'
                        }`}
                      >
                        0{idx + 1}
                      </span>
                      <span
                        className={`text-xs font-bold font-serif ${
                          step.active ? 'text-cherry' : 'text-chocolate'
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                    {step.sublabel && (
                      <span className="text-[11px] text-chocolate/65 block pl-7 font-sans">
                        {step.sublabel}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* 2. Modules Roadmap Section */}
      <section className="py-16 sm:py-20 bg-cream px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-sage/30">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-cherry block mb-1">
                Peta Pembelajaran
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-chocolate">
                Silabus Modul Bertahap
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-chocolate/70 max-w-xs">
              Mulai dari Modul 01 untuk membangun fondasi mental dan kesiapan suaramu.
            </p>
          </div>

          {/* Modules List */}
          <div className="space-y-6">
            {modules.map((m) => {
              const isAvailable = m.status === 'available';
              const progress = m.slug ? getLessonProgress(m.slug) : null;
              const isCompleted = progress?.isCompleted || false;
              const targetUrl = m.targetUrl || (m.slug ? `/pelajaran/${m.slug}` : undefined);

              return (
                <div
                  key={m.number}
                  onClick={() => {
                    if (isAvailable && targetUrl) {
                      navigate(targetUrl);
                    }
                  }}
                  className={`group rounded-3xl border transition-all duration-300 p-6 sm:p-9 ${
                    isAvailable
                      ? 'bg-cream-muted border-sage/50 hover:border-cherry hover:bg-cream hover:-translate-y-1 shadow-sm hover:shadow-md cursor-pointer'
                      : 'bg-cream-muted/40 border-sage/25 opacity-80 cursor-default'
                  }`}
                  role={isAvailable ? 'link' : undefined}
                  tabIndex={isAvailable ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (isAvailable && targetUrl && (e.key === ' ' || e.key === 'Enter')) {
                      e.preventDefault();
                      navigate(targetUrl);
                    }
                  }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    <div className="flex-1 min-w-0">
                      {/* Header Badges Row */}
                      <div className="flex flex-wrap items-center gap-2.5 mb-3">
                        <span className="px-3 py-0.5 rounded-full bg-sage/30 text-chocolate text-[11px] font-bold uppercase tracking-wider border border-sage/40">
                          {m.number.startsWith('MODUL') ? m.number : `MODUL ${m.number}`}
                        </span>

                        <span className="px-3 py-0.5 rounded-full bg-cream text-chocolate/80 text-[11px] font-semibold border border-sage/30">
                          Level: {m.level}
                        </span>

                        {m.duration && (
                          <span className="px-3 py-0.5 rounded-full bg-cream text-chocolate/80 text-[11px] font-semibold border border-sage/30">
                            {m.duration}
                          </span>
                        )}

                        {isAvailable ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-green-100 text-green-900 border border-green-300 text-[11px] font-bold uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-700 animate-pulse" />
                            <span>Tersedia (Available)</span>
                          </span>
                        ) : (
                          <span className="px-3 py-0.5 rounded-full bg-sage/15 text-chocolate/60 text-[11px] font-bold uppercase tracking-wider border border-sage/25">
                            Segera Hadir (Coming Soon)
                          </span>
                        )}

                        {isAvailable && isCompleted && (
                          <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-cherry text-cream text-[11px] font-bold uppercase tracking-wider shadow-sm">
                            <span className="material-symbols-outlined text-xs">check_circle</span>
                            <span>Sudah Tuntas</span>
                          </span>
                        )}
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-chocolate mb-1 leading-snug group-hover:text-chocolate transition-colors">
                        {m.title}
                      </h3>

                      <p className="text-xs sm:text-sm font-semibold text-cherry mb-3 italic">
                        {m.subtitle}
                      </p>

                      <p className="text-sm text-chocolate/80 leading-relaxed mb-4">
                        {m.description}
                      </p>

                      {/* Focus Points or Highlights List */}
                      {m.focusPoints && m.focusPoints.length > 0 && (
                        <div className="pt-3 border-t border-sage/25">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-chocolate/60 block mb-2">
                            Fokus Pembelajaran:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-chocolate/80">
                            {m.focusPoints.map((point, pIdx) => (
                              <div
                                key={pIdx}
                                className="flex items-start gap-2 bg-cream/70 p-2 rounded-lg border border-sage/30"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-cherry shrink-0 mt-1.5" />
                                <span className="leading-snug">{point}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {m.highlights && m.highlights.length > 0 && !m.focusPoints && (
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-sage/25">
                          {m.highlights.map((h, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1 text-[11px] text-chocolate/75 bg-cream px-2.5 py-1 rounded-lg border border-sage/30"
                            >
                              <span className="w-1 h-1 rounded-full bg-cherry" />
                              <span>{h}</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <div className="shrink-0 lg:self-center" onClick={(e) => e.stopPropagation()}>
                      {isAvailable && targetUrl ? (
                        <Link
                          to={targetUrl}
                          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-cherry text-cream text-xs sm:text-sm font-semibold hover:bg-chocolate transition-all duration-200 shadow-md hover:shadow hover:-translate-y-0.5"
                        >
                          <span>{isCompleted ? 'Pelajari Ulang Modul' : `Buka ${m.title}`}</span>
                          <span className="material-symbols-outlined text-base">arrow_forward</span>
                        </Link>
                      ) : (
                        <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-cream/70 text-chocolate/40 text-xs font-semibold border border-sage/30 cursor-not-allowed">
                          <span className="material-symbols-outlined text-sm">lock</span>
                          <span>Segera Hadir</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* District Link Bottom Banner */}
          <div className="mt-14 rounded-3xl bg-cream-muted border border-sage/40 p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-2 font-sans">
                <span className="material-symbols-outlined text-cherry text-base">pin_drop</span>
                <span className="text-xs font-bold uppercase tracking-wider text-sage-dark">
                  {communityCallout.tag}
                </span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-chocolate mb-2">
                {communityCallout.title}
              </h3>
              <p className="text-sm text-chocolate/75 leading-relaxed font-sans">
                {communityCallout.description}
              </p>
            </div>

            <Link
              to="/peta-pik-r"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-cherry hover:bg-chocolate text-cream font-semibold text-xs sm:text-sm transition-all duration-200 shadow-md hover:-translate-y-0.5 font-sans"
            >
              <span className="material-symbols-outlined text-base">map</span>
              <span>Buka Peta PIK-R</span>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default PillarSyllabusView;

