import React, { useState } from 'react';
import type { LessonSection } from '../../data/lessonsData';

interface TextSectionProps {
  section: LessonSection;
  isRead?: boolean;
  onMarkRead?: (sectionId: string) => void;
}

export const TextSection: React.FC<TextSectionProps> = ({
  section,
  isRead = false,
  onMarkRead,
}) => {
  const [selectedScenarioOpt, setSelectedScenarioOpt] = useState<string | null>(null);

  const scenario = section.interactiveScenario;
  const selectedOptionObj = scenario?.options.find((opt) => opt.id === selectedScenarioOpt);

  return (
    <article
      id={section.id}
      className="scroll-mt-36 py-12 sm:py-16 border-b border-sage/30"
      aria-labelledby={`heading-${section.id}`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="flex items-baseline justify-between gap-4 mb-2">
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-cherry/40 select-none">
              {section.orderNumber}
            </span>
            {section.subtitle && (
              <span className="text-xs font-bold uppercase tracking-wider text-cherry font-sans">
                {section.subtitle}
              </span>
            )}
          </div>

          {onMarkRead && (
            <button
              type="button"
              onClick={() => onMarkRead(section.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold font-sans transition-all duration-200 ${
                isRead
                  ? 'bg-sage/30 text-chocolate border border-sage/50'
                  : 'bg-cream-muted text-chocolate/60 hover:text-cherry border border-sage/30 hover:border-cherry/40'
              }`}
              title={isRead ? 'Tandai belum dibaca' : 'Tandai bagian ini selesai dibaca'}
            >
              <span className="material-symbols-outlined text-sm text-cherry">
                {isRead ? 'check_circle' : 'radio_button_unchecked'}
              </span>
              <span>{isRead ? 'Sudah Dibaca' : 'Tandai Selesai'}</span>
            </button>
          )}
        </div>

        <h2
          id={`heading-${section.id}`}
          className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-chocolate mb-6 leading-snug"
        >
          {section.title}
        </h2>

        {/* Editorial Body Content */}
        {section.content && section.content.length > 0 && (
          <div className="space-y-4 text-base sm:text-lg text-chocolate/85 leading-relaxed font-sans mb-8">
            {section.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        )}

        {/* Key Takeaways Box */}
        {section.keyTakeaways && section.keyTakeaways.length > 0 && (
          <div className="my-8 rounded-2xl bg-cream-muted/70 p-6 sm:p-7 border border-sage/40">
            <h3 className="text-xs font-bold uppercase tracking-widest text-chocolate mb-4 font-sans flex items-center gap-2">
              <span className="material-symbols-outlined text-cherry text-base">check_circle</span>
              <span>Strategi Penyelamat Percakapan</span>
            </h3>
            <ul className="space-y-3 font-sans">
              {section.keyTakeaways.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-chocolate/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-cherry shrink-0 mt-2" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Interactive Mini Scenario (if present) */}
        {scenario && (
          <div className="my-8 rounded-3xl bg-cream-muted border border-sage/40 p-6 sm:p-8 font-sans shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-cherry text-lg">psychology</span>
              <span className="text-xs font-bold uppercase tracking-wider text-sage-dark">
                Simulasi Skenario Nyata
              </span>
            </div>

            <h4 className="font-serif text-lg sm:text-xl font-bold text-chocolate mb-3 leading-snug">
              {scenario.context}
            </h4>

            <p className="text-xs sm:text-sm text-chocolate/70 mb-5 leading-relaxed">
              Pilih tindakan yang paling kamu pilih untuk menjaga alur obrolan tetap hidup:
            </p>

            <div className="space-y-2.5 mb-5">
              {scenario.options.map((opt) => {
                const isSelected = selectedScenarioOpt === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedScenarioOpt(opt.id)}
                    className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 ${
                      isSelected
                        ? opt.isBest
                          ? 'bg-green-50/90 border-green-600 text-green-950 font-semibold ring-1 ring-green-600'
                          : 'bg-cherry/10 border-cherry text-cherry font-semibold ring-1 ring-cherry'
                        : 'bg-cream border-sage/35 text-chocolate hover:bg-cream-muted'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 border text-[11px] font-bold ${
                        isSelected
                          ? opt.isBest
                            ? 'bg-green-700 text-cream border-green-700'
                            : 'bg-cherry text-cream border-cherry'
                          : 'border-sage/50 text-chocolate/60 bg-cream'
                      }`}
                    >
                      {isSelected ? (opt.isBest ? '✓' : '✕') : opt.id.slice(-1).toUpperCase()}
                    </span>
                    <span className="leading-relaxed flex-1">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {selectedOptionObj && (
              <div
                className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed animate-fade-in-up ${
                  selectedOptionObj.isBest
                    ? 'bg-green-50/80 border-green-300 text-green-950 font-medium'
                    : 'bg-cream border-sage/40 text-chocolate/85'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  <span className="material-symbols-outlined text-base text-cherry">
                    {selectedOptionObj.isBest ? 'check_circle' : 'info'}
                  </span>
                  <span>{selectedOptionObj.isBest ? 'Komentar Ahli:' : 'Perhatikan hal ini:'}</span>
                </div>
                <p>{selectedOptionObj.feedback}</p>
              </div>
            )}
          </div>
        )}

        {/* Callout Card (Insight / Tip / Quote) */}
        {section.callout && (
          <aside
            className="my-8 rounded-2xl bg-cream-muted p-6 sm:p-7 border-l-4 border-cherry border-y border-r border-sage/40 shadow-sm"
            aria-label="Catatan Wawasan"
          >
            <div className="flex items-start gap-3.5">
              <span
                className="material-symbols-outlined text-cherry text-2xl shrink-0 mt-0.5"
                aria-hidden="true"
              >
                {section.callout.type === 'tip'
                  ? 'tips_and_updates'
                  : section.callout.type === 'quote'
                  ? 'format_quote'
                  : 'lightbulb'}
              </span>
              <div>
                <p className="font-serif italic text-base sm:text-lg text-chocolate leading-relaxed">
                  &ldquo;{section.callout.text}&rdquo;
                </p>
                {section.callout.author && (
                  <footer className="mt-2 text-xs font-bold text-cherry font-sans uppercase tracking-wider">
                    — {section.callout.author}
                  </footer>
                )}
              </div>
            </div>
          </aside>
        )}

        {/* Action Prompt */}
        {section.actionPrompt && (
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sage/25 border border-sage/50 text-xs sm:text-sm font-semibold text-chocolate font-sans">
            <span className="material-symbols-outlined text-cherry text-base">play_arrow</span>
            <span>{section.actionPrompt}</span>
          </div>
        )}
      </div>
    </article>
  );
};


