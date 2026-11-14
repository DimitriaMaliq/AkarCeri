import React, { useState } from 'react';
import type { LessonVideo } from '../../data/lessonsData';

interface VideoSectionProps {
  video: LessonVideo;
  sectionId?: string;
  orderNumber?: string;
  isWatched?: boolean;
  onWatchedToggle?: (watched: boolean) => void;
}

export const VideoSection: React.FC<VideoSectionProps> = ({
  video,
  sectionId,
  orderNumber = '03',
  isWatched: initialWatched = false,
  onWatchedToggle,
}) => {
  const [watched, setWatched] = useState(initialWatched);
  const [selectedThinkOption, setSelectedThinkOption] = useState<number | null>(null);

  const handleToggleWatched = () => {
    const next = !watched;
    setWatched(next);
    onWatchedToggle?.(next);
  };

  const effectiveId = sectionId || `section-${orderNumber}`;

  return (
    <section
      id={effectiveId}
      className="scroll-mt-36 py-12 sm:py-16 border-b border-sage/30"
      aria-labelledby="video-section-title"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="flex items-baseline justify-between gap-4 mb-2">
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-cherry/40 select-none">
              {orderNumber}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-cherry font-sans">
              Tonton Dari Ahlinya • {video.institution}
            </span>
          </div>

          <button
            type="button"
            onClick={handleToggleWatched}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold font-sans transition-all duration-200 ${
              watched
                ? 'bg-sage/40 text-chocolate border border-sage/60 font-bold'
                : 'bg-cream-muted text-chocolate/70 hover:text-cherry border border-sage/30'
            }`}
          >
            <span className="material-symbols-outlined text-sm text-cherry">
              {watched ? 'check_circle' : 'radio_button_unchecked'}
            </span>
            <span>{watched ? 'Sudah Ditonton' : 'Tandai Ditonton'}</span>
          </button>
        </div>

        <h2
          id="video-section-title"
          className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-chocolate mb-4 leading-snug"
        >
          {video.title}
        </h2>

        {/* Expert Learning Card */}
        <div className="rounded-3xl bg-cream-muted border border-sage/40 overflow-hidden shadow-sm">
          {/* Responsive 16:9 Video Embed */}
          <div className="relative aspect-video w-full bg-chocolate">
            <iframe
              src={video.embedUrl}
              title={`${video.speaker} — ${video.title} (${video.institution})`}
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>

          {/* Video Metadata & Learning Context */}
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-5 border-b border-sage/30">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-cherry text-cream flex items-center justify-center font-bold text-sm font-sans shadow-sm">
                  JT
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-chocolate leading-tight">
                    {video.speaker}
                  </h3>
                  <p className="text-xs text-cherry font-semibold font-sans mt-0.5">
                    Pakar Suara &amp; Komunikasi • {video.institution}
                  </p>
                </div>
              </div>

              {video.duration && (
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cream border border-sage/40 text-xs font-semibold text-chocolate/85 font-sans">
                  <span className="material-symbols-outlined text-sm text-cherry">schedule</span>
                  <span>Durasi: {video.duration}</span>
                </div>
              )}
            </div>

            {/* "What to watch for" Card */}
            <div className="rounded-2xl bg-cream p-5 sm:p-6 border border-sage/40 mb-6 font-sans">
              <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-widest text-cherry">
                <span className="material-symbols-outlined text-base">visibility</span>
                <span>Fokus Perhatian (What to Watch For)</span>
              </div>
              <p className="text-sm sm:text-base text-chocolate/85 leading-relaxed mb-4">
                {video.learningContext}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-chocolate/80">
                <div className="flex items-start gap-2 bg-cream-muted/60 p-2.5 rounded-lg border border-sage/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-cherry shrink-0 mt-1.5" />
                  <span>Amati bagaimana jeda digunakan sebelum menyampaikan poin penting.</span>
                </div>
                <div className="flex items-start gap-2 bg-cream-muted/60 p-2.5 rounded-lg border border-sage/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-cherry shrink-0 mt-1.5" />
                  <span>Ikuti latihan vokal 6 langkah di menit ke 7:30 bersama Julian.</span>
                </div>
              </div>
            </div>

            {/* "Think About It" Checkpoint Card (if provided) */}
            {video.thinkAboutIt && (
              <div className="rounded-2xl bg-cream p-5 sm:p-6 border border-sage/40 mb-6 font-sans">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-widest text-cherry">
                  <span className="material-symbols-outlined text-base">psychology</span>
                  <span>Think About It • Refleksi Singkat</span>
                </div>
                <h4 className="font-serif text-base sm:text-lg font-bold text-chocolate mb-4 leading-snug">
                  {video.thinkAboutIt.question}
                </h4>
                <div className="space-y-2 mb-3">
                  {video.thinkAboutIt.options.map((opt, idx) => {
                    const isSelected = selectedThinkOption === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedThinkOption(idx)}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center gap-3 ${
                          isSelected
                            ? 'bg-cherry/10 border-cherry text-chocolate font-semibold ring-1 ring-cherry'
                            : 'bg-cream-muted/60 border-sage/35 text-chocolate/80 hover:bg-cream'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border text-[11px] font-bold ${
                            isSelected
                              ? 'bg-cherry text-cream border-cherry'
                              : 'border-sage/50 text-chocolate/50 bg-cream'
                          }`}
                        >
                          {isSelected ? '✓' : idx + 1}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
                {selectedThinkOption !== null && (
                  <p className="text-xs text-cherry font-medium mt-3 italic animate-fade-in-up flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    <span>
                      Terima kasih atas refleksimu. Mengakui titik yang paling menantang adalah langkah pertama untuk menguasainya di modul ini!
                    </span>
                  </p>
                )}
              </div>
            )}

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 font-sans">
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cream border border-sage/50 text-chocolate hover:text-cherry hover:border-cherry text-xs sm:text-sm font-semibold transition-all duration-200"
              >
                <span>
                  {video.url.includes('ted.com') ? 'Tonton di TED Talk Resmi' : 'Tonton di YouTube Resmi'}
                </span>
                <span
                  className="material-symbols-outlined text-sm transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                >
                  open_in_new
                </span>
              </a>

              <button
                type="button"
                onClick={handleToggleWatched}
                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm ${
                  watched
                    ? 'bg-sage/40 text-chocolate border border-sage/60 font-bold'
                    : 'bg-cherry hover:bg-chocolate text-cream'
                }`}
              >
                <span className="material-symbols-outlined text-base">
                  {watched ? 'check_circle' : 'play_circle'}
                </span>
                <span>{watched ? 'Sudah Selesai Menonton' : 'Tandai Video Selesai'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

