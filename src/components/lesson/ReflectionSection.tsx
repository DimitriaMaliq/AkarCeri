import React, { useState } from 'react';
import type { ReflectionQuestion } from '../../data/lessonsData';

interface ReflectionSectionProps {
  questions: ReflectionQuestion[];
  sectionId?: string;
  orderNumber?: string;
  initialAnswers?: Record<string, string>;
  onSaveAnswers?: (answers: Record<string, string>) => void;
}

export const ReflectionSection: React.FC<ReflectionSectionProps> = ({
  questions,
  sectionId,
  orderNumber = '07',
  initialAnswers = {},
  onSaveAnswers,
}) => {
  const [answers, setAnswers] = useState<Record<string, string>>(initialAnswers);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'idle'>('idle');

  const handleTextChange = (questionId: string, val: string) => {
    const nextAnswers = { ...answers, [questionId]: val };
    setAnswers(nextAnswers);
    setSaveStatus('saving');

    // Debounced autosave
    const timer = setTimeout(() => {
      onSaveAnswers?.(nextAnswers);
      setSaveStatus('saved');
    }, 600);

    return () => clearTimeout(timer);
  };

  const handleBlur = () => {
    onSaveAnswers?.(answers);
    setSaveStatus('saved');
  };

  const handleManualSave = () => {
    onSaveAnswers?.(answers);
    setSaveStatus('saved');
  };

  const filledCount = Object.values(answers).filter((v) => v && v.trim().length > 0).length;
  const effectiveId = sectionId || `section-${orderNumber}`;

  return (
    <section
      id={effectiveId}
      className="scroll-mt-36 py-12 sm:py-16 border-b border-sage/30"
      aria-labelledby="reflection-heading"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="flex items-baseline justify-between gap-4 mb-2">
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-cherry/40 select-none">
              {orderNumber}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-cherry font-sans">
              Refleksi Diri • Catatan Tumbuh
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-sans font-semibold text-chocolate/70">
            <span className="px-3 py-1 rounded-full bg-cream-muted border border-sage/40">
              {filledCount} dari {questions.length} Refleksi Terisi
            </span>
          </div>
        </div>

        <h2
          id="reflection-heading"
          className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-chocolate mb-4 leading-snug"
        >
          Ruang Renung &amp; Pengamatan Pribadi
        </h2>

        <p className="text-base sm:text-lg text-chocolate/80 leading-relaxed mb-8 font-sans">
          Tidak ada jawaban benar atau salah. Catatlah pengamatanmu secara jujur. Tulisanmu tersimpan otomatis di perangkatmu sebagai jejak pembelajaran pribadimu.
        </p>

        {/* Reflection Cards Container */}
        <div className="space-y-6 font-sans">
          {questions.map((q, idx) => {
            const hasAnswer = Boolean(answers[q.id]?.trim());

            return (
              <div
                key={q.id}
                className="rounded-3xl bg-cream-muted border border-sage/40 p-6 sm:p-8 shadow-sm transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <label
                    htmlFor={`reflection-${q.id}`}
                    className="font-serif text-lg sm:text-xl font-bold text-chocolate leading-snug block"
                  >
                    <span className="text-cherry text-sm font-mono mr-2">0{idx + 1}.</span>
                    {q.question}
                  </label>

                  {hasAnswer && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-green-800 bg-green-50 px-2.5 py-0.5 rounded-full border border-green-200 shrink-0">
                      <span className="material-symbols-outlined text-xs">check</span>
                      <span>Terisi</span>
                    </span>
                  )}
                </div>

                {q.helperText && (
                  <p className="text-xs sm:text-sm text-chocolate/70 italic leading-relaxed mb-3">
                    {q.helperText}
                  </p>
                )}

                <textarea
                  id={`reflection-${q.id}`}
                  rows={3}
                  value={answers[q.id] || ''}
                  onChange={(e) => handleTextChange(q.id, e.target.value)}
                  onBlur={handleBlur}
                  placeholder={q.placeholder}
                  className="w-full p-4 rounded-xl bg-cream text-chocolate placeholder:text-chocolate/40 text-sm sm:text-base border border-sage/40 focus:border-cherry focus:ring-1 focus:ring-cherry focus:outline-none transition-all resize-y shadow-inner leading-relaxed"
                />
              </div>
            );
          })}

          {/* Action and Save Status Bar */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-1.5 text-chocolate/70">
              <span className="material-symbols-outlined text-base text-cherry">lock</span>
              <span>Catatan ini tersimpan aman di perambanmu dan tidak dibagikan ke publik.</span>
            </div>

            <div className="flex items-center gap-3">
              {saveStatus === 'saved' && (
                <span className="text-green-800 font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  ✓ Tersimpan
                </span>
              )}
              {saveStatus === 'saving' && (
                <span className="text-chocolate/60 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cherry animate-pulse" />
                  Menyimpan...
                </span>
              )}

              <button
                type="button"
                onClick={handleManualSave}
                className="px-5 py-2.5 rounded-full bg-cream border border-sage/50 text-chocolate hover:text-cherry font-semibold transition-colors shadow-sm"
              >
                Simpan Catatan
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

