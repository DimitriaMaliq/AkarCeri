import React from 'react';
import type { LessonSection } from '../../data/lessonsData';

interface LessonContentProps {
  section: LessonSection;
}

export const LessonContent: React.FC<LessonContentProps> = ({ section }) => {
  return (
    <article
      id={section.id}
      className="scroll-mt-36 py-10 sm:py-14 border-b border-sage/30"
      aria-labelledby={`heading-${section.id}`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="flex items-baseline gap-3 mb-2">
          <span className="font-serif text-3xl sm:text-4xl font-bold text-cherry/40 select-none">
            {section.orderNumber}
          </span>
          {section.subtitle && (
            <span className="text-xs font-bold uppercase tracking-wider text-cherry font-sans">
              {section.subtitle}
            </span>
          )}
        </div>

        <h2
          id={`heading-${section.id}`}
          className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-chocolate mb-6 leading-snug"
        >
          {section.title}
        </h2>

        {/* Editorial Paragraphs */}
        {section.content && section.content.length > 0 && (
          <div className="space-y-4 text-base sm:text-lg text-chocolate/85 leading-relaxed font-sans mb-8">
            {section.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        )}

        {/* Callout Box */}
        {section.callout && (
          <blockquote className="my-8 rounded-2xl bg-cream-muted p-6 sm:p-7 border-l-4 border-cherry border-y border-r border-sage/40 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-cherry text-2xl shrink-0 mt-0.5" aria-hidden="true">
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
          </blockquote>
        )}

        {/* Key Takeaways */}
        {section.keyTakeaways && section.keyTakeaways.length > 0 && (
          <div className="my-8 rounded-2xl bg-cream-muted/70 p-6 sm:p-7 border border-sage/40">
            <h3 className="text-xs font-bold uppercase tracking-widest text-chocolate mb-4 font-sans flex items-center gap-2">
              <span className="material-symbols-outlined text-cherry text-base">check_circle</span>
              <span>Poin Kunci &amp; Praktik</span>
            </h3>
            <ul className="space-y-3">
              {section.keyTakeaways.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-chocolate/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-cherry shrink-0 mt-2" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Prompt */}
        {section.actionPrompt && (
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sage/25 border border-sage/50 text-xs sm:text-sm font-semibold text-chocolate">
            <span className="material-symbols-outlined text-cherry text-base">play_arrow</span>
            <span>{section.actionPrompt}</span>
          </div>
        )}
      </div>
    </article>
  );
};

