import React, { useState, useEffect } from 'react';
import type { Challenge, RealLifeChoice } from '../../data/lessonsData';

interface ChallengeSectionProps {
  challenge?: Challenge;
  realLifeChoices?: RealLifeChoice[];
  title?: string;
  subtitle?: string;
  instructions?: string;
  sectionId?: string;
  orderNumber?: string;
  isCompleted?: boolean;
  onCompleteToggle?: (completed: boolean) => void;
}

type TimerState = 'READY' | 'RUNNING' | 'PAUSED' | 'TIME_UP' | 'COMPLETED';

export const ChallengeSection: React.FC<ChallengeSectionProps> = ({
  challenge,
  realLifeChoices,
  title,
  subtitle,
  instructions,
  sectionId,
  orderNumber = '05',
  isCompleted: initialCompleted = false,
  onCompleteToggle,
}) => {
  const effectiveTitle = title || challenge?.title || 'Tantangan Mikro';
  const effectiveSubtitle = subtitle || challenge?.subtitle || 'Latihan Praktik Spontan';
  const effectiveInstructions = instructions || challenge?.instructions || 'Ikuti panduan tantangan di bawah ini.';
  const effectiveDuration = challenge?.durationSeconds || 60;
  const effectiveSectionId = sectionId || (challenge ? `section-${orderNumber}` : 'section-challenge');

  const [completed, setCompleted] = useState(initialCompleted);

  // Timer State for standard challenge
  const [timeLeft, setTimeLeft] = useState(effectiveDuration);
  const [timerState, setTimerState] = useState<TimerState>(() =>
    initialCompleted ? 'COMPLETED' : 'READY'
  );
  const [completedSteps, setCompletedSteps] = useState<number[]>(() =>
    initialCompleted && challenge ? challenge.steps.map((s) => s.step) : []
  );

  // State for Real Life Choices (Section 08)
  const [selectedRealLifeChoice, setSelectedRealLifeChoice] = useState<string | null>(null);

  useEffect(() => {
    if (timerState !== 'RUNNING') return;

    const intervalId = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setTimerState('TIME_UP');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [timerState]);

  const handleStartPause = () => {
    if (timerState === 'READY' || timerState === 'PAUSED') {
      setTimerState('RUNNING');
    } else if (timerState === 'RUNNING') {
      setTimerState('PAUSED');
    } else if (timerState === 'TIME_UP' || timerState === 'COMPLETED') {
      setTimeLeft(effectiveDuration);
      setTimerState('RUNNING');
    }
  };

  const handleReset = () => {
    setTimerState('READY');
    setTimeLeft(effectiveDuration);
  };

  const toggleStep = (stepNumber: number) => {
    if (!challenge) return;
    setCompletedSteps((prev) => {
      const next = prev.includes(stepNumber)
        ? prev.filter((s) => s !== stepNumber)
        : [...prev, stepNumber];

      if (next.length === challenge.steps.length && !completed) {
        setCompleted(true);
        setTimerState('COMPLETED');
        onCompleteToggle?.(true);
      }
      return next;
    });
  };

  const handleCompleteChallengeToggle = () => {
    const nextState = !completed;
    setCompleted(nextState);
    if (nextState) {
      setTimerState('COMPLETED');
      if (challenge) {
        setCompletedSteps(challenge.steps.map((s) => s.step));
      }
    } else {
      setTimerState('READY');
      setTimeLeft(effectiveDuration);
    }
    onCompleteToggle?.(nextState);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const timerPercentage = Math.round(
    ((effectiveDuration - timeLeft) / effectiveDuration) * 100
  );

  return (
    <section
      id={effectiveSectionId}
      className="scroll-mt-36 py-12 sm:py-16 border-b border-sage/30"
      aria-labelledby={`challenge-heading-${effectiveSectionId}`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="flex items-baseline justify-between gap-4 mb-2">
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-cherry/40 select-none">
              {orderNumber}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-cherry font-sans">
              Tantangan Nyata • {effectiveSubtitle}
            </span>
          </div>

          {!realLifeChoices && challenge && (
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-muted border border-sage/40 text-xs font-semibold text-chocolate/80 font-sans">
              <span className="w-2 h-2 rounded-full bg-cherry" />
              <span>Target Waktu: {effectiveDuration} Detik</span>
            </div>
          )}
        </div>

        <h2
          id={`challenge-heading-${effectiveSectionId}`}
          className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-chocolate mb-4 leading-snug"
        >
          {effectiveTitle}
        </h2>

        <p className="text-base sm:text-lg text-chocolate/85 leading-relaxed mb-8 font-sans">
          {effectiveInstructions}
        </p>

        {/* ── VARIANT 1: REAL-LIFE CHOICES (Section 08: English in Real Life) ── */}
        {realLifeChoices ? (
          <div className="rounded-3xl bg-cream-muted border border-sage/40 p-6 sm:p-9 shadow-sm font-sans mb-8">
            <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-sage/30">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-chocolate">
                Pilih Satu Misi untuk Hari Ini / Besok:
              </h3>
              <span className="text-xs font-semibold text-chocolate/70">
                Pilih salah satu yang paling menantang &amp; aman bagimu
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {realLifeChoices.map((c) => {
                const isSelected = selectedRealLifeChoice === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => setSelectedRealLifeChoice(c.id)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-cream border-cherry shadow-md ring-1 ring-cherry'
                        : 'bg-cream/70 border-sage/40 hover:bg-cream hover:border-sage/60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sage/20 text-chocolate border border-sage/35">
                          {c.code}
                        </span>
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center border text-[11px] font-bold ${
                            isSelected
                              ? 'bg-cherry text-cream border-cherry'
                              : 'border-sage/50 bg-cream text-transparent'
                          }`}
                        >
                          ✓
                        </div>
                      </div>
                      <h4 className="font-serif text-base sm:text-lg font-bold text-chocolate mb-2">
                        {c.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-chocolate/75 leading-relaxed">
                        {c.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-sage/20 text-xs text-cherry font-semibold flex items-center gap-1">
                      <span>{isSelected ? '✓ Misi Terpilih' : 'Klik untuk Memilih Misi'}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Footer */}
            <div className="pt-4 border-t border-sage/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-chocolate/65">
                {completed
                  ? '✓ Misi nyata telah kamu pilih dan tercatat dalam komitmen belajarmu.'
                  : 'Pilih salah satu tantangan di atas lalu konfirmasikan komitmenmu.'}
              </p>
              <button
                type="button"
                onClick={handleCompleteChallengeToggle}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full font-semibold text-xs sm:text-sm transition-all duration-200 shadow-sm ${
                  completed
                    ? 'bg-sage/40 text-chocolate border border-sage/50 font-bold'
                    : 'bg-cherry hover:bg-chocolate text-cream'
                }`}
              >
                <span className="material-symbols-outlined text-base">
                  {completed ? 'check_circle' : 'task_alt'}
                </span>
                <span>{completed ? 'Tantangan Tercatat (Perbarui)' : 'Komitmen Jalankan Tantangan'}</span>
              </button>
            </div>
          </div>
        ) : (
          /* ── VARIANT 2: TIMED STEP CHALLENGE (Section 07 / Module 01 Public Speaking) ── */
          challenge && (
            <div className="rounded-3xl bg-cream-muted border border-sage/40 p-6 sm:p-10 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
                {/* Interactive Timer Widget */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 sm:p-7 rounded-2xl bg-cream border border-sage/40 shadow-sm text-center">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        timerState === 'RUNNING'
                          ? 'bg-cherry animate-pulse'
                          : timerState === 'COMPLETED'
                          ? 'bg-green-600'
                          : 'bg-chocolate/40'
                      }`}
                    />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-sage-dark font-sans">
                      {timerState === 'RUNNING'
                        ? 'Waktu Berjalan...'
                        : timerState === 'PAUSED'
                        ? 'Jeda Sementara'
                        : timerState === 'TIME_UP'
                        ? "Time's Up!"
                        : timerState === 'COMPLETED'
                        ? 'Tantangan Tuntas'
                        : 'Siap Dimulai (Ready)'}
                    </span>
                  </div>

                  {/* Digital Countdown Timer */}
                  <div
                    className={`font-mono text-5xl sm:text-6xl font-bold tracking-tight my-2 ${
                      timeLeft <= 10 && timerState === 'RUNNING'
                        ? 'text-cherry animate-pulse'
                        : timerState === 'COMPLETED'
                        ? 'text-green-800'
                        : 'text-chocolate'
                    }`}
                    aria-live="polite"
                  >
                    {formattedTime}
                  </div>

                  {/* Progress Bar Track */}
                  <div
                    className="w-full h-2 rounded-full bg-cream-muted border border-sage/30 overflow-hidden my-3"
                    role="progressbar"
                    aria-valuenow={timerPercentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className={`h-full transition-all duration-300 ${
                        timerState === 'COMPLETED' ? 'bg-green-700' : 'bg-cherry'
                      }`}
                      style={{ width: `${timerPercentage}%` }}
                    />
                  </div>

                  {/* Timer Controls */}
                  <div className="flex items-center gap-2.5 mt-2 font-sans">
                    <button
                      type="button"
                      onClick={handleStartPause}
                      className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-cherry hover:bg-chocolate text-cream font-semibold text-xs sm:text-sm transition-all duration-200 shadow-sm"
                    >
                      <span className="material-symbols-outlined text-base">
                        {timerState === 'RUNNING'
                          ? 'pause'
                          : timerState === 'PAUSED'
                          ? 'play_arrow'
                          : timerState === 'TIME_UP' || timerState === 'COMPLETED'
                          ? 'replay'
                          : 'play_arrow'}
                      </span>
                      <span>
                        {timerState === 'RUNNING'
                          ? 'Jeda'
                          : timerState === 'PAUSED'
                          ? 'Lanjut Bicara'
                          : timerState === 'TIME_UP'
                          ? 'Ulangi Timer'
                          : timerState === 'COMPLETED'
                          ? 'Latih Ulang'
                          : 'Mulai Bicara (Start)'}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="p-2.5 rounded-full bg-cream hover:bg-sage/20 text-chocolate/70 hover:text-chocolate border border-sage/40 transition-colors"
                      aria-label="Atur ulang pengatur waktu"
                      title="Atur Ulang"
                    >
                      <span className="material-symbols-outlined text-base">restart_alt</span>
                    </button>
                  </div>

                  {timerState === 'TIME_UP' && (
                    <div className="mt-3 p-2 rounded-lg bg-cherry/10 border border-cherry/20 text-xs font-semibold text-cherry font-sans">
                      Waktu {effectiveDuration} detik selesai! Cek apakah poin di samping tersampaikan.
                    </div>
                  )}
                </div>

                {/* Checklist of Steps */}
                <div className="lg:col-span-7 font-sans">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-chocolate">
                      Panduan Alur Berbicara:
                    </h3>
                    <span className="text-xs text-chocolate/60">
                      {completedSteps.length} dari {challenge.steps.length} terpenuhi
                    </span>
                  </div>

                  <div className="space-y-3">
                    {challenge.steps.map((st) => {
                      const isChecked = completedSteps.includes(st.step);
                      return (
                        <div
                          key={st.step}
                          onClick={() => toggleStep(st.step)}
                          onKeyDown={(e) => {
                            if (e.key === ' ' || e.key === 'Enter') {
                              e.preventDefault();
                              toggleStep(st.step);
                            }
                          }}
                          role="checkbox"
                          aria-checked={isChecked}
                          tabIndex={0}
                          className={`p-3.5 sm:p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-start gap-3.5 ${
                            isChecked
                              ? 'bg-cream border-cherry/40 shadow-sm'
                              : 'bg-cream/60 border-sage/30 hover:bg-cream'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                              isChecked
                                ? 'bg-cherry text-cream'
                                : 'border border-chocolate/30 bg-cream text-transparent'
                            }`}
                          >
                            <span className="material-symbols-outlined text-xs">check</span>
                          </div>
                          <div className="min-w-0">
                            <p
                              className={`text-xs sm:text-sm font-bold ${
                                isChecked ? 'text-cherry' : 'text-chocolate'
                              }`}
                            >
                              Langkah {st.step}: {st.instruction}
                            </p>
                            {st.detail && (
                              <p className="text-xs text-chocolate/70 mt-0.5 leading-relaxed italic">
                                {st.detail}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Completion Status & Action Button */}
              <div className="pt-6 border-t border-sage/30 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
                <div>
                  {completed ? (
                    <div className="flex items-center gap-2 text-green-900 font-semibold text-xs sm:text-sm">
                      <span className="material-symbols-outlined text-base text-green-700">
                        check_circle
                      </span>
                      <span>{challenge.completionNote || '✓ Challenge Completed'}</span>
                    </div>
                  ) : (
                    <p className="text-xs text-chocolate/70 text-center sm:text-left">
                      Lakukan simulasi berbicara ini secara mandiri, lalu tandai selesai.
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleCompleteChallengeToggle}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-xs sm:text-sm transition-all duration-200 shadow-sm ${
                    completed
                      ? 'bg-sage/40 text-chocolate border border-sage/50 font-bold'
                      : 'bg-cherry hover:bg-chocolate text-cream'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">
                    {completed ? 'check_circle' : 'task_alt'}
                  </span>
                  <span>{completed ? 'Tantangan Sudah Selesai' : 'Tandai Tantangan Selesai'}</span>
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default ChallengeSection;
