import React, { useState, useEffect } from 'react';
import type { LessonSection } from '../../data/lessonsData';

interface ExerciseItem {
  id: string;
  name: string;
  instruction: string;
  badge?: string;
}

interface ExerciseSectionProps {
  section: LessonSection;
  isCompleted?: boolean;
  onCompleteToggle?: (completed: boolean) => void;
}

export const ExerciseSection: React.FC<ExerciseSectionProps> = ({
  section,
  isCompleted = false,
  onCompleteToggle,
}) => {
  // ── 1. SENTENCE STARTERS EXERCISE (Section 02) ─────────────────────────────
  const starters = section.sentenceStarters;
  const [completedStarters, setCompletedStarters] = useState<Record<string, string>>({});
  const [activeStarter, setActiveStarter] = useState<string | null>(null);
  const [currentInput, setCurrentInput] = useState<string>('');

  const handleSaveStarterInput = (starter: string) => {
    if (!currentInput.trim()) return;
    const next = { ...completedStarters, [starter]: currentInput.trim() };
    setCompletedStarters(next);
    setCurrentInput('');
    setActiveStarter(null);
    if (Object.keys(next).length >= 3 && !isCompleted) {
      onCompleteToggle?.(true);
    }
  };

  // ── 2. EXPRESSIONS CHUNKS EXERCISE (Section 03) ───────────────────────────
  const expressionCats = section.expressionCategories;
  const [activeCatIndex, setActiveCatIndex] = useState<number>(0);
  const [expandedExpId, setExpandedExpId] = useState<string | null>(null);
  const [practicedExpIds, setPracticedExpIds] = useState<string[]>([]);

  const togglePracticedExp = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPracticedExpIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      if (next.length >= 6 && !isCompleted) {
        onCompleteToggle?.(true);
      }
      return next;
    });
  };

  // ── 3. LISTEN → NOTICE → REPEAT EXERCISE (Section 05) ──────────────────────
  const listenRepeatSteps = section.listenRepeatSteps;
  const [activeRepeatPhraseIndex, setActiveRepeatPhraseIndex] = useState<number>(0);
  const [activeStepNumber, setActiveStepNumber] = useState<number>(1);
  const [practicedRepeatIds, setPracticedRepeatIds] = useState<number[]>([]);

  const handleAdvanceStep = (phraseIndex: number) => {
    if (activeStepNumber < 4) {
      setActiveStepNumber((prev) => prev + 1);
    } else {
      // Completed all 4 steps for this phrase
      setPracticedRepeatIds((prev) => (prev.includes(phraseIndex) ? prev : [...prev, phraseIndex]));
      setActiveStepNumber(1);
      if (phraseIndex < (listenRepeatSteps?.length || 1) - 1) {
        setActiveRepeatPhraseIndex(phraseIndex + 1);
      } else if (!isCompleted) {
        onCompleteToggle?.(true);
      }
    }
  };

  // ── 4. ONE SENTENCE MESSAGE EXERCISE (Module 02 Section 02) ─────────────────
  const oneSentenceEx = section.oneSentenceExercise;
  const [selectedTopic, setSelectedTopic] = useState<string>(() =>
    oneSentenceEx?.topics[0] || 'Media Sosial'
  );
  const [oneSentenceInput, setOneSentenceInput] = useState<string>('');
  const [savedOneSentence, setSavedOneSentence] = useState<string>('');
  const [showInspiration, setShowInspiration] = useState<boolean>(false);

  const handleSaveOneSentence = () => {
    if (!oneSentenceInput.trim()) return;
    setSavedOneSentence(oneSentenceInput.trim());
    if (!isCompleted) {
      onCompleteToggle?.(true);
    }
  };

  // ── 5. IDEA ORDERING EXERCISE (Module 02 Section 03) ────────────────────────
  const ideaOrderingEx = section.ideaOrderingExercise;
  const [orderedItems, setOrderedItems] = useState(() =>
    ideaOrderingEx ? [...ideaOrderingEx.items] : []
  );
  const [orderChecked, setOrderChecked] = useState<boolean>(false);
  const [isOrderCorrect, setIsOrderCorrect] = useState<boolean>(false);

  const moveOrderedItem = (index: number, direction: 'up' | 'down') => {
    if (orderChecked) setOrderChecked(false);
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= orderedItems.length) return;
    const next = [...orderedItems];
    const temp = next[index];
    next[index] = next[targetIndex];
    next[targetIndex] = temp;
    setOrderedItems(next);
  };

  const checkIdeaOrder = () => {
    const isCorrect = orderedItems.every(
      (item, idx) => item.expectedOrder === idx + 1
    );
    setIsOrderCorrect(isCorrect);
    setOrderChecked(true);
    if (isCorrect && !isCompleted) {
      onCompleteToggle?.(true);
    }
  };

  // ── 6. SIMPLIFY EXERCISE (Module 02 Section 04) ─────────────────────────────
  const simplifyEx = section.simplifyExercise;
  const [selectedSimplifyId, setSelectedSimplifyId] = useState<string | null>(null);
  const [customSimplifyInput, setCustomSimplifyInput] = useState<string>('');
  const [savedCustomSimplify, setSavedCustomSimplify] = useState<string>('');

  const handleSelectSimplifyOption = (optId: string) => {
    setSelectedSimplifyId(optId);
    const opt = simplifyEx?.options.find((o) => o.id === optId);
    if (opt?.isBest && !isCompleted) {
      onCompleteToggle?.(true);
    }
  };

  const handleSaveCustomSimplify = () => {
    if (!customSimplifyInput.trim()) return;
    setSavedCustomSimplify(customSimplifyInput.trim());
    if (!isCompleted) {
      onCompleteToggle?.(true);
    }
  };

  // ── 7. RAPID STRUCTURE EXERCISE (Module 02 Section 07) ──────────────────────
  const rapidEx = section.rapidStructureExercise;
  const [rapidTimerSeconds, setRapidTimerSeconds] = useState<number>(
    rapidEx?.preparationSeconds || 30
  );
  const [isRapidTimerRunning, setIsRapidTimerRunning] = useState<boolean>(false);
  const [rapidPoint, setRapidPoint] = useState<string>('');
  const [rapidReason, setRapidReason] = useState<string>('');
  const [rapidExample, setRapidExample] = useState<string>('');
  const [showSampleRapid, setShowSampleRapid] = useState<boolean>(false);
  const [isRapidSaved, setIsRapidSaved] = useState<boolean>(false);

  useEffect(() => {
    if (!isRapidTimerRunning) return;
    const timer = window.setInterval(() => {
      setRapidTimerSeconds((prev) => {
        if (prev <= 1) {
          setIsRapidTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [isRapidTimerRunning]);

  const handleSaveRapidStructure = () => {
    if (!rapidPoint.trim() && !rapidReason.trim() && !rapidExample.trim()) return;
    setIsRapidSaved(true);
    if (!isCompleted) {
      onCompleteToggle?.(true);
    }
  };

  // ── 8. FALLBACK VOCAL TOOLKIT (Module 01 Public Speaking) ───────────────────
  const defaultExercises: ExerciseItem[] = [
    {
      id: 'rahang',
      name: 'Pelemasan Rahang',
      instruction:
        'Buka mulut lebar-lebar dengan santai, gerakkan rahang perlahan ke kiri dan kanan untuk melepaskan ketegangan otot leher dan pangkal rahang.',
      badge: '30 Detik',
    },
    {
      id: 'lip-trill',
      name: 'Lip Trill (Motor Roll)',
      instruction:
        'Rapatkan bibir santai, tiupkan udara hingga bibir bergetar ("brrr") meluncur dari nada rendah ke tinggi. Ini menghangatkan pita suara tanpa regangan berlebih.',
      badge: '45 Detik',
    },
    {
      id: 'artikulasi',
      name: 'Artikulasi Tajam T-P-K-S',
      instruction:
        'Ucapkan konsonan tegas "T - P - K - S" berulang dengan ketukan ritmis yang teratur. Latihan ini mengaktifkan kelenturan lidah, bibir, dan langit-langit mulut.',
      badge: '30 Detik',
    },
    {
      id: 'pause',
      name: 'The Power of the Pause',
      instruction:
        'Latih jeda hening 1–2 detik setelah satu kalimat utuh sebelum lanjut kalimat berikutnya. Sadari bahwa hening terdengar tenang dan berwibawa, bukan canggung.',
      badge: 'Teknik Inti',
    },
  ];

  const [checkedVocalIds, setCheckedVocalIds] = useState<string[]>(() =>
    isCompleted ? defaultExercises.map((e) => e.id) : []
  );

  const toggleVocalExercise = (id: string) => {
    setCheckedVocalIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      if (next.length === defaultExercises.length && !isCompleted) {
        onCompleteToggle?.(true);
      }
      return next;
    });
  };

  const hasDedicatedExercise =
    Boolean(starters) ||
    Boolean(expressionCats) ||
    Boolean(listenRepeatSteps) ||
    Boolean(oneSentenceEx) ||
    Boolean(ideaOrderingEx) ||
    Boolean(simplifyEx) ||
    Boolean(rapidEx);

  return (
    <section
      id={section.id}
      className="scroll-mt-36 py-12 sm:py-16 border-b border-sage/30"
      aria-labelledby={`exercise-heading-${section.id}`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="flex items-baseline gap-3 mb-2">
          <span className="font-serif text-3xl sm:text-4xl font-bold text-cherry/40 select-none">
            {section.orderNumber}
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-cherry font-sans">
            {section.subtitle || 'Praktik Langsung (Interactive Exercise)'}
          </span>
        </div>

        <h2
          id={`exercise-heading-${section.id}`}
          className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-chocolate mb-4 leading-snug"
        >
          {section.title}
        </h2>

        {/* Lead Content */}
        {section.content && section.content.length > 0 && (
          <div className="space-y-3 text-base sm:text-lg text-chocolate/85 leading-relaxed font-sans mb-8">
            {section.content.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        )}

        {/* ── VARIANT A: SENTENCE STARTERS (Section 02) ──────────────────────── */}
        {starters && (
          <div className="rounded-3xl bg-cream-muted border border-sage/40 p-6 sm:p-9 shadow-sm font-sans mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-sage/30">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-cherry block mb-1">
                  Pola Kalimat Siap Pakai
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-chocolate">
                  Interactive Sentence Starters
                </h3>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cream border border-sage/40 text-chocolate/80">
                {Object.keys(completedStarters).length} dari {starters.length} Kalimat Terisi
              </span>
            </div>

            <p className="text-xs sm:text-sm text-chocolate/75 mb-6 leading-relaxed">
              Pilih pola di bawah ini dan lengkapi dengan faktamu sendiri. Ucapkan kalimat jadinya dengan lantang.
            </p>

            <div className="space-y-3 mb-6">
              {starters.map((item, idx) => {
                const userCompletion = completedStarters[item.starter];
                const isEditing = activeStarter === item.starter;

                return (
                  <div
                    key={idx}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                      userCompletion
                        ? 'bg-cream border-green-600/40 shadow-sm'
                        : isEditing
                        ? 'bg-cream border-cherry shadow-sm ring-1 ring-cherry'
                        : 'bg-cream/60 border-sage/35 hover:bg-cream'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            userCompletion
                              ? 'bg-green-700 text-cream'
                              : 'bg-sage/30 text-chocolate'
                          }`}
                        >
                          {userCompletion ? '✓' : idx + 1}
                        </span>
                        <span className="font-mono text-sm sm:text-base font-bold text-chocolate">
                          {item.starter}
                        </span>
                      </div>

                      {!isEditing && (
                        <button
                          type="button"
                          onClick={() => {
                            setActiveStarter(item.starter);
                            setCurrentInput(userCompletion || '');
                          }}
                          className="text-xs font-semibold text-cherry hover:text-chocolate px-3 py-1 rounded-full bg-cream-muted border border-sage/30 hover:border-cherry transition-colors"
                        >
                          {userCompletion ? 'Edit Isian' : '+ Lengkapi'}
                        </button>
                      )}
                    </div>

                    {userCompletion && !isEditing && (
                      <div className="mt-2.5 pt-2 border-t border-sage/20 pl-9">
                        <p className="text-sm font-semibold text-green-950">
                          &ldquo;{item.starter} {userCompletion}&rdquo;
                        </p>
                        <p className="text-[11px] text-chocolate/60 mt-0.5">
                          Contoh: {item.example}
                        </p>
                      </div>
                    )}

                    {isEditing && (
                      <div className="mt-3 pl-9">
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            value={currentInput}
                            onChange={(e) => setCurrentInput(e.target.value)}
                            placeholder={`Lengkapi "${item.starter} ..."`}
                            className="flex-1 p-3 rounded-xl bg-cream border border-sage/50 text-xs sm:text-sm focus:border-cherry focus:ring-1 focus:ring-cherry focus:outline-none"
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleSaveStarterInput(item.starter);
                            }}
                          />
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleSaveStarterInput(item.starter)}
                              className="px-4 py-2.5 rounded-xl bg-cherry text-cream text-xs font-semibold hover:bg-chocolate transition-colors"
                            >
                              Simpan
                            </button>
                            <button
                              type="button"
                              onClick={() => setActiveStarter(null)}
                              className="px-3 py-2.5 rounded-xl bg-cream border border-sage/30 text-xs text-chocolate/70 hover:text-chocolate"
                            >
                              Batal
                            </button>
                          </div>
                        </div>
                        <p className="text-[11px] text-chocolate/60 mt-2 italic">
                          Contoh inspirasi: {item.example}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Speaking Intro Live Card */}
            {Object.keys(completedStarters).length > 0 && (
              <div className="p-5 rounded-2xl bg-cream border border-sage/40 mb-6 animate-fade-in-up">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-cherry">
                  <span className="material-symbols-outlined text-base">record_voice_over</span>
                  <span>Draft Perkenalan Dirimu:</span>
                </div>
                <p className="font-serif italic text-base sm:text-lg text-chocolate leading-relaxed">
                  &ldquo;
                  {Object.entries(completedStarters)
                    .map(([starter, val]) => `${starter} ${val}`)
                    .join('. ')}
                  .&rdquo;
                </p>
              </div>
            )}

            {/* Completion Button */}
            <div className="pt-4 border-t border-sage/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-chocolate/65">
                {Object.keys(completedStarters).length >= 3
                  ? '✓ Mantap! Kamu sudah menyiapkan modal berbicara pertamamu.'
                  : 'Lengkapi minimal 3 pola kalimat di atas untuk menuntaskan latihan ini.'}
              </p>
              <button
                type="button"
                onClick={() => onCompleteToggle?.(!isCompleted)}
                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isCompleted
                    ? 'bg-sage/40 text-chocolate border border-sage/60 font-bold'
                    : 'bg-cherry hover:bg-chocolate text-cream'
                }`}
              >
                {isCompleted ? 'Latihan Selesai (Ulangi)' : 'Tandai Latihan Selesai'}
              </button>
            </div>
          </div>
        )}

        {/* ── VARIANT B: EXPRESSION CATEGORIES (Section 03) ─────────────────── */}
        {expressionCats && (
          <div className="rounded-3xl bg-cream-muted border border-sage/40 p-6 sm:p-9 shadow-sm font-sans mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-sage/30">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-cherry block mb-1">
                  Spoken English In Chunks
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-chocolate">
                  Interactive Expression Cards
                </h3>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cream border border-sage/40 text-chocolate/80">
                {practicedExpIds.length} Ungkapan Dilatih
              </span>
            </div>

            {/* Category Navigation Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6 border-b border-sage/25">
              {expressionCats.map((cat, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveCatIndex(idx)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    activeCatIndex === idx
                      ? 'bg-cherry text-cream shadow-sm'
                      : 'bg-cream text-chocolate/70 hover:text-chocolate hover:bg-cream-muted border border-sage/35'
                  }`}
                >
                  {cat.categoryName}
                </button>
              ))}
            </div>

            {/* Active Category Expression Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {expressionCats[activeCatIndex]?.expressions.map((exp) => {
                const isExpanded = expandedExpId === exp.id;
                const isPracticed = practicedExpIds.includes(exp.id);

                return (
                  <div
                    key={exp.id}
                    onClick={() => setExpandedExpId(isExpanded ? null : exp.id)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isExpanded
                        ? 'bg-cream border-cherry shadow-md ring-1 ring-cherry'
                        : isPracticed
                        ? 'bg-cream border-green-600/40 shadow-sm'
                        : 'bg-cream/70 border-sage/40 hover:bg-cream hover:border-sage/60'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-serif text-lg sm:text-xl font-bold text-chocolate">
                          {exp.phrase}
                        </h4>
                        <button
                          type="button"
                          onClick={(e) => togglePracticedExp(exp.id, e)}
                          className={`w-6 h-6 rounded-md flex items-center justify-center border text-xs shrink-0 transition-colors ${
                            isPracticed
                              ? 'bg-green-700 text-cream border-green-700'
                              : 'border-sage/50 bg-cream text-chocolate/30 hover:text-cherry'
                          }`}
                          title={isPracticed ? 'Sudah dilatih' : 'Tandai sudah diucapkan'}
                        >
                          ✓
                        </button>
                      </div>

                      <p className="text-xs text-cherry font-semibold mb-2">
                        {exp.meaning}
                      </p>

                      {isExpanded && (
                        <div className="mt-3 pt-3 border-t border-sage/30 text-xs space-y-2 animate-fade-in-up">
                          <div>
                            <span className="font-bold text-chocolate/60 uppercase text-[10px] block">
                              Konteks Pemakaian:
                            </span>
                            <p className="text-chocolate/80 mt-0.5">{exp.exampleContext}</p>
                          </div>
                          <div>
                            <span className="font-bold text-chocolate/60 uppercase text-[10px] block">
                              Pronunciation Hint:
                            </span>
                            <p className="font-mono text-chocolate/90 bg-sage/20 px-2 py-1 rounded inline-block mt-0.5">
                              {exp.pronunciationHint}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-3 pt-2 text-[11px] text-chocolate/50 flex items-center justify-between">
                      <span>{isExpanded ? 'Tutup rincian' : 'Klik untuk rincian & pelafalan'}</span>
                      <span className="material-symbols-outlined text-sm">
                        {isExpanded ? 'expand_less' : 'expand_more'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Footer */}
            <div className="pt-4 border-t border-sage/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-chocolate/65">
                {practicedExpIds.length >= 4
                  ? '✓ Bagus! Kamu sudah melatih beberapa ungkapan percakapan sehari-hari.'
                  : 'Klik pada kartu ungkapan untuk melihat rincian pelafalan dan tandai setelah mengucapkannya.'}
              </p>
              <button
                type="button"
                onClick={() => onCompleteToggle?.(!isCompleted)}
                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isCompleted
                    ? 'bg-sage/40 text-chocolate border border-sage/60 font-bold'
                    : 'bg-cherry hover:bg-chocolate text-cream'
                }`}
              >
                {isCompleted ? 'Latihan Selesai (Ulangi)' : 'Tandai Latihan Selesai'}
              </button>
            </div>
          </div>
        )}

        {/* ── VARIANT C: LISTEN → NOTICE → REPEAT (Section 05) ───────────────── */}
        {listenRepeatSteps && (
          <div className="rounded-3xl bg-cream-muted border border-sage/40 p-6 sm:p-9 shadow-sm font-sans mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-sage/30">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-cherry block mb-1">
                  Muscle Memory &amp; Rhythm
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-chocolate">
                  Speaking Practice: 4-Step Cycle
                </h3>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cream border border-sage/40 text-chocolate/80">
                {practicedRepeatIds.length} dari {listenRepeatSteps.length} Frasa Dikuasai
              </span>
            </div>

            {/* Active Phrase Selector */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6 border-b border-sage/20">
              {listenRepeatSteps.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setActiveRepeatPhraseIndex(idx);
                    setActiveStepNumber(1);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    activeRepeatPhraseIndex === idx
                      ? 'bg-cherry text-cream shadow-sm'
                      : practicedRepeatIds.includes(idx)
                      ? 'bg-cream text-green-900 border border-green-500/40 font-bold'
                      : 'bg-cream text-chocolate/70 border border-sage/30'
                  }`}
                >
                  {practicedRepeatIds.includes(idx) && <span>✓</span>}
                  <span>Frasa 0{idx + 1}</span>
                </button>
              ))}
            </div>

            {/* Interactive 4-Step Cycle Card */}
            {listenRepeatSteps[activeRepeatPhraseIndex] && (
              <div className="p-6 rounded-2xl bg-cream border border-sage/40 mb-6">
                <div className="text-center mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-sage-dark block mb-2">
                    Frasa Latihan #{activeRepeatPhraseIndex + 1}
                  </span>
                  <h4 className="font-serif text-2xl sm:text-3xl font-bold text-chocolate mb-2">
                    {activeStepNumber === 4 ? '(Ucapkan tanpa melihat teks)' : `"${listenRepeatSteps[activeRepeatPhraseIndex].phrase}"`}
                  </h4>
                  {activeStepNumber !== 4 && (
                    <p className="font-mono text-xs sm:text-sm text-cherry font-semibold">
                      {listenRepeatSteps[activeRepeatPhraseIndex].phoneticHint}
                    </p>
                  )}
                  <p className="text-xs text-chocolate/70 mt-2 max-w-md mx-auto">
                    {listenRepeatSteps[activeRepeatPhraseIndex].context}
                  </p>
                </div>

                {/* Step Indicators */}
                <div className="grid grid-cols-4 gap-2 mb-6">
                  {[
                    { num: 1, label: '01 Listen', desc: 'Dengar ritme' },
                    { num: 2, label: '02 Notice', desc: 'Cermati intonasi' },
                    { num: 3, label: '03 Repeat', desc: 'Ucapkan bersuara' },
                    { num: 4, label: '04 Blind', desc: 'Ucapkan tanpa teks' },
                  ].map((st) => (
                    <div
                      key={st.num}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        activeStepNumber === st.num
                          ? 'bg-cherry text-cream border-cherry shadow-sm'
                          : activeStepNumber > st.num
                          ? 'bg-green-50 text-green-900 border-green-300 font-bold'
                          : 'bg-cream-muted text-chocolate/50 border-sage/30'
                      }`}
                    >
                      <span className="text-[11px] font-bold block">{st.label}</span>
                      <span className="text-[10px] hidden sm:block opacity-80">{st.desc}</span>
                    </div>
                  ))}
                </div>

                {/* Cycle Action Button */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => handleAdvanceStep(activeRepeatPhraseIndex)}
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-cherry hover:bg-chocolate text-cream font-semibold text-xs sm:text-sm transition-all shadow-md hover:-translate-y-0.5"
                  >
                    <span>
                      {activeStepNumber < 4
                        ? `Lanjut ke Step 0${activeStepNumber + 1}`
                        : 'Selesai & Lanjut Frasa Berikutnya'}
                    </span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}

            {/* Action Footer */}
            <div className="pt-4 border-t border-sage/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-chocolate/65">
                Ulangi setiap kalimat 3–4 kali hingga mulutmu merasa terbiasa dengan ritmenya.
              </p>
              <button
                type="button"
                onClick={() => onCompleteToggle?.(!isCompleted)}
                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isCompleted
                    ? 'bg-sage/40 text-chocolate border border-sage/60 font-bold'
                    : 'bg-cherry hover:bg-chocolate text-cream'
                }`}
              >
                {isCompleted ? 'Latihan Selesai (Ulangi)' : 'Tandai Latihan Selesai'}
              </button>
            </div>
          </div>
        )}

        {/* ── VARIANT E: ONE SENTENCE MESSAGE (Module 02 Section 02) ─────────── */}
        {oneSentenceEx && (
          <div className="rounded-3xl bg-cream-muted border border-sage/40 p-6 sm:p-9 shadow-sm font-sans mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-sage/30">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-cherry block mb-1">
                  Topic vs Main Message
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-chocolate">
                  One Sentence Message Builder
                </h3>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cream border border-sage/40 text-chocolate/80">
                {savedOneSentence ? '✓ Pesan Tersimpan' : 'Pilih Topik & Rangkai'}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-chocolate/75 mb-4 leading-relaxed">
              {oneSentenceEx.prompt}
            </p>

            {/* Topic selector pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {oneSentenceEx.topics.map((topic) => {
                const isSelected = selectedTopic === topic;
                return (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => setSelectedTopic(topic)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-cherry text-cream shadow-sm ring-1 ring-cherry'
                        : 'bg-cream text-chocolate/75 hover:text-chocolate border border-sage/40 hover:bg-cream-muted'
                    }`}
                  >
                    {topic}
                  </button>
                );
              })}
            </div>

            {/* Main Message Input Area */}
            <div className="p-5 sm:p-6 rounded-2xl bg-cream border border-sage/40 mb-6">
              <label htmlFor="one-sentence-input" className="block text-xs font-bold text-chocolate/70 mb-2">
                Kalau orang hanya mengingat SATU hal dari perkataanmu tentang <span className="text-cherry font-extrabold">&ldquo;{selectedTopic}&rdquo;</span>, apa yang ingin kamu tinggalkan?
              </label>
              <textarea
                id="one-sentence-input"
                rows={3}
                value={oneSentenceInput}
                onChange={(e) => setOneSentenceInput(e.target.value)}
                placeholder={`Tuliskan satu pesan utamamu tentang ${selectedTopic}... (1 kalimat padat)`}
                className="w-full p-3.5 rounded-xl bg-cream-muted/50 border border-sage/50 text-xs sm:text-sm text-chocolate focus:border-cherry focus:ring-1 focus:ring-cherry focus:outline-none leading-relaxed resize-none mb-3"
              />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setShowInspiration(!showInspiration)}
                  className="text-xs font-semibold text-cherry hover:text-chocolate transition-colors inline-flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">lightbulb</span>
                  <span>{showInspiration ? 'Tutup Contoh Inspirasi' : 'Lihat Contoh Inspirasi'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveOneSentence}
                  className="px-5 py-2.5 rounded-xl bg-cherry hover:bg-chocolate text-cream text-xs font-semibold transition-all shadow-sm"
                >
                  Simpan Pesan Utama
                </button>
              </div>

              {showInspiration && (
                <div className="mt-4 p-4 rounded-xl bg-cream-muted border border-sage/35 text-xs text-chocolate/80 space-y-1 animate-fade-in-up">
                  <span className="font-bold text-cherry uppercase text-[10px] block">Contoh Perbandingan:</span>
                  <p><strong className="text-chocolate">Topik:</strong> {oneSentenceEx.sampleTopic}</p>
                  <p><strong className="text-chocolate">Pesan Utama:</strong> &ldquo;{oneSentenceEx.sampleMessage}&rdquo;</p>
                </div>
              )}
            </div>

            {/* Live Saved Message Card */}
            {savedOneSentence && (
              <div className="p-5 rounded-2xl bg-cream border-l-4 border-cherry border-y border-r border-sage/40 mb-6 animate-fade-in-up">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cherry block mb-1">
                  Pesan Inti yang Kamu Tinggalkan ({selectedTopic}):
                </span>
                <p className="font-serif italic text-base sm:text-lg text-chocolate font-medium leading-relaxed">
                  &ldquo;{savedOneSentence}&rdquo;
                </p>
                <p className="text-[11px] text-green-900 font-medium mt-2 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-green-700">check_circle</span>
                  <span>Hebat! Pesan utamamu sudah tajam dan siap dijadikan jangkar bicaramu.</span>
                </p>
              </div>
            )}

            {/* Action Footer */}
            <div className="pt-4 border-t border-sage/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-chocolate/65">
                {savedOneSentence
                  ? '✓ Pesan utama tersimpan. Lanjutkan ke langkah merapikan pikiran.'
                  : 'Rangkai satu kalimat pesan utama di atas dan klik simpan.'}
              </p>
              <button
                type="button"
                onClick={() => onCompleteToggle?.(!isCompleted)}
                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isCompleted
                    ? 'bg-sage/40 text-chocolate border border-sage/60 font-bold'
                    : 'bg-cherry hover:bg-chocolate text-cream'
                }`}
              >
                {isCompleted ? 'Latihan Selesai (Ulangi)' : 'Tandai Latihan Selesai'}
              </button>
            </div>
          </div>
        )}

        {/* ── VARIANT F: IDEA ORDERING EXERCISE (Module 02 Section 03) ───────── */}
        {ideaOrderingEx && (
          <div className="rounded-3xl bg-cream-muted border border-sage/40 p-6 sm:p-9 shadow-sm font-sans mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-sage/30">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-cherry block mb-1">
                  Formula Point → Reason → Example
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-chocolate">
                  {ideaOrderingEx.title}
                </h3>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cream border border-sage/40 text-chocolate/80">
                {isOrderCorrect ? '✓ Urutan Runtut' : 'Susun 3 Kalimat'}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-chocolate/75 mb-6 leading-relaxed">
              {ideaOrderingEx.instruction}
            </p>

            {/* Reorderable Items List */}
            <div className="space-y-3 mb-6">
              {orderedItems.map((item, idx) => {
                const targetSlotName =
                  idx === 0
                    ? 'Point (Gagasan Utama)'
                    : idx === 1
                    ? 'Reason (Alasan Kuat)'
                    : 'Example (Contoh Konkret)';

                return (
                  <div
                    key={item.id}
                    className="p-4 sm:p-5 rounded-2xl bg-cream border border-sage/40 shadow-sm transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3.5 flex-1 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-cherry text-cream flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        0{idx + 1}
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-sage-dark block mb-0.5">
                          Posisi #{idx + 1}: {targetSlotName}
                        </span>
                        <p className="text-xs sm:text-sm font-medium text-chocolate leading-relaxed">
                          &ldquo;{item.text}&rdquo;
                        </p>
                      </div>
                    </div>

                    {/* Move controls */}
                    <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                      <button
                        type="button"
                        onClick={() => moveOrderedItem(idx, 'up')}
                        disabled={idx === 0}
                        aria-label={`Pindahkan posisi #${idx + 1} ke atas`}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center border text-xs transition-colors ${
                          idx === 0
                            ? 'opacity-30 border-sage/30 text-chocolate/30 cursor-not-allowed'
                            : 'border-sage/40 bg-cream text-chocolate hover:text-cherry hover:border-cherry'
                        }`}
                      >
                        <span className="material-symbols-outlined text-base">arrow_upward</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => moveOrderedItem(idx, 'down')}
                        disabled={idx === orderedItems.length - 1}
                        aria-label={`Pindahkan posisi #${idx + 1} ke bawah`}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center border text-xs transition-colors ${
                          idx === orderedItems.length - 1
                            ? 'opacity-30 border-sage/30 text-chocolate/30 cursor-not-allowed'
                            : 'border-sage/40 bg-cream text-chocolate hover:text-cherry hover:border-cherry'
                        }`}
                      >
                        <span className="material-symbols-outlined text-base">arrow_downward</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Check Order Button */}
            <div className="flex items-center justify-between gap-3 mb-6">
              <span className="text-xs text-chocolate/60">
                Gunakan tombol panah di samping setiap kalimat untuk menukar posisinya.
              </span>
              <button
                type="button"
                onClick={checkIdeaOrder}
                className="px-6 py-2.5 rounded-xl bg-chocolate hover:bg-cherry text-cream text-xs font-semibold transition-all shadow-sm shrink-0"
              >
                Periksa Urutan
              </button>
            </div>

            {/* Feedback Result */}
            {orderChecked && (
              <div
                className={`p-5 rounded-2xl border text-xs sm:text-sm leading-relaxed mb-6 animate-fade-in-up ${
                  isOrderCorrect
                    ? 'bg-green-50/90 border-green-600/40 text-green-950 font-medium'
                    : 'bg-cherry/10 border-cherry/40 text-chocolate'
                }`}
              >
                <div className="flex items-center gap-2 font-bold mb-2">
                  <span className="material-symbols-outlined text-base text-cherry">
                    {isOrderCorrect ? 'check_circle' : 'info'}
                  </span>
                  <span>{isOrderCorrect ? 'Urutan Sempurna! (Point → Reason → Example)' : 'Urutan Belum Tepat'}</span>
                </div>
                <p className="leading-relaxed">{ideaOrderingEx.explanation}</p>
              </div>
            )}

            {/* Action Footer */}
            <div className="pt-4 border-t border-sage/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-chocolate/65">
                {isOrderCorrect
                  ? '✓ Kamu sudah menguasai alur penyampaian 3 langkah.'
                  : 'Susun urutan dengan benar lalu klik Periksa Urutan.'}
              </p>
              <button
                type="button"
                onClick={() => onCompleteToggle?.(!isCompleted)}
                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isCompleted
                    ? 'bg-sage/40 text-chocolate border border-sage/60 font-bold'
                    : 'bg-cherry hover:bg-chocolate text-cream'
                }`}
              >
                {isCompleted ? 'Latihan Selesai (Ulangi)' : 'Tandai Latihan Selesai'}
              </button>
            </div>
          </div>
        )}

        {/* ── VARIANT G: SIMPLIFY EXERCISE (Module 02 Section 04) ─────────────── */}
        {simplifyEx && (
          <div className="rounded-3xl bg-cream-muted border border-sage/40 p-6 sm:p-9 shadow-sm font-sans mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-sage/30">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-cherry block mb-1">
                  Seni Menyederhanakan
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-chocolate">
                  Exercise: Sederhanakan Bahasa
                </h3>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cream border border-sage/40 text-chocolate/80">
                {selectedSimplifyId || savedCustomSimplify ? '✓ Sudah Dicoba' : 'Pilih / Tulis Sendiri'}
              </span>
            </div>

            {/* Complex Statement Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-cream border-l-4 border-chocolate border-y border-r border-sage/40 mb-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-chocolate/60 block mb-1">
                Kalimat Asli (Rumit & Kaku):
              </span>
              <p className="font-serif italic text-sm sm:text-base text-chocolate leading-relaxed">
                &ldquo;{simplifyEx.originalComplex}&rdquo;
              </p>
            </div>

            <p className="text-xs sm:text-sm text-chocolate/75 mb-4 leading-relaxed">
              {simplifyEx.prompt}
            </p>

            {/* Guided Options */}
            <div className="space-y-3 mb-6">
              {simplifyEx.options.map((opt) => {
                const isSelected = selectedSimplifyId === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectSimplifyOption(opt.id)}
                    className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 ${
                      isSelected
                        ? opt.isBest
                          ? 'bg-green-50/90 border-green-600 text-green-950 font-medium ring-1 ring-green-600'
                          : 'bg-cherry/10 border-cherry text-chocolate font-medium ring-1 ring-cherry'
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
                    <div className="flex-1 min-w-0">
                      <span className="leading-relaxed block">&ldquo;{opt.text}&rdquo;</span>
                      {isSelected && (
                        <p className={`text-xs mt-2 pt-2 border-t font-sans ${
                          opt.isBest ? 'border-green-300 text-green-900' : 'border-cherry/30 text-cherry'
                        }`}>
                          {opt.feedback}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Optional Custom Input */}
            <div className="p-4 sm:p-5 rounded-2xl bg-cream border border-sage/35 mb-6">
              <label htmlFor="custom-simplify-input" className="block text-xs font-bold text-chocolate/80 mb-2">
                Atau, coba tuliskan versimu sendiri kepada teman:
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  id="custom-simplify-input"
                  type="text"
                  value={customSimplifyInput}
                  onChange={(e) => setCustomSimplifyInput(e.target.value)}
                  placeholder="Contoh: Teknologi bikin kita gampang nyari bahan belajar..."
                  className="flex-1 p-3 rounded-xl bg-cream-muted/50 border border-sage/40 text-xs sm:text-sm focus:border-cherry focus:ring-1 focus:ring-cherry focus:outline-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveCustomSimplify();
                  }}
                />
                <button
                  type="button"
                  onClick={handleSaveCustomSimplify}
                  className="px-5 py-2.5 rounded-xl bg-cherry text-cream text-xs font-semibold hover:bg-chocolate transition-colors"
                >
                  Simpan Versimu
                </button>
              </div>
              {savedCustomSimplify && (
                <p className="text-xs text-green-900 mt-2 font-medium">
                  ✓ Versi kustommu tersimpan: &ldquo;{savedCustomSimplify}&rdquo;
                </p>
              )}
            </div>

            {/* Action Footer */}
            <div className="pt-4 border-t border-sage/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-chocolate/65">
                Pilih opsi di atas atau tuliskan versimu sendiri untuk menuntaskan latihan ini.
              </p>
              <button
                type="button"
                onClick={() => onCompleteToggle?.(!isCompleted)}
                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isCompleted
                    ? 'bg-sage/40 text-chocolate border border-sage/60 font-bold'
                    : 'bg-cherry hover:bg-chocolate text-cream'
                }`}
              >
                {isCompleted ? 'Latihan Selesai (Ulangi)' : 'Tandai Latihan Selesai'}
              </button>
            </div>
          </div>
        )}

        {/* ── VARIANT H: RAPID STRUCTURE EXERCISE (Module 02 Section 07) ──────── */}
        {rapidEx && (
          <div className="rounded-3xl bg-cream-muted border border-sage/40 p-6 sm:p-9 shadow-sm font-sans mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-sage/30">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-cherry block mb-1">
                  Persiapan Cepat 30 Detik
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-chocolate">
                  Practice — Susun Ide dalam 30 Detik
                </h3>
              </div>
              {/* 30-Second Countdown Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream border border-sage/40 text-xs font-mono font-bold text-cherry">
                <span className="material-symbols-outlined text-sm">timer</span>
                <span>00:{String(rapidTimerSeconds).padStart(2, '0')}</span>
              </div>
            </div>

            {/* Topic Callout */}
            <div className="p-4 sm:p-5 rounded-2xl bg-cream border border-sage/40 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-sage-dark block mb-0.5">
                  Topik Latihan Spontan:
                </span>
                <h4 className="font-serif text-lg sm:text-xl font-bold text-chocolate">
                  &ldquo;{rapidEx.topic}&rdquo;
                </h4>
              </div>

              {/* Timer Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsRapidTimerRunning(!isRapidTimerRunning)}
                  className="px-4 py-2 rounded-xl bg-cherry text-cream text-xs font-semibold hover:bg-chocolate transition-colors inline-flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">
                    {isRapidTimerRunning ? 'pause' : 'play_arrow'}
                  </span>
                  <span>{isRapidTimerRunning ? 'Jeda Timer' : 'Mulai 30s'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsRapidTimerRunning(false);
                    setRapidTimerSeconds(rapidEx.preparationSeconds || 30);
                  }}
                  className="px-3 py-2 rounded-xl bg-cream border border-sage/30 text-xs text-chocolate/70 hover:text-chocolate"
                  title="Reset Timer"
                >
                  <span className="material-symbols-outlined text-sm">replay</span>
                </button>
              </div>
            </div>

            {/* 3-Box Structure Builder */}
            <div className="space-y-4 mb-6">
              {/* Box 1: Point */}
              <div className="p-4 sm:p-5 rounded-2xl bg-cream border border-sage/40">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-5 h-5 rounded-full bg-cherry text-cream text-[10px] font-bold flex items-center justify-center">
                    P
                  </span>
                  <label htmlFor="rapid-point" className="text-xs font-bold text-chocolate uppercase tracking-wider">
                    POINT: {rapidEx.pointPrompt}
                  </label>
                </div>
                <input
                  id="rapid-point"
                  type="text"
                  value={rapidPoint}
                  onChange={(e) => setRapidPoint(e.target.value)}
                  placeholder="Contoh: Mengatur waktu memberi remaja kebebasan lebih banyak, bukan sebaliknya..."
                  className="w-full p-3 rounded-xl bg-cream-muted/50 border border-sage/40 text-xs sm:text-sm focus:border-cherry focus:ring-1 focus:ring-cherry focus:outline-none"
                />
              </div>

              {/* Box 2: Reason */}
              <div className="p-4 sm:p-5 rounded-2xl bg-cream border border-sage/40">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-5 h-5 rounded-full bg-cherry text-cream text-[10px] font-bold flex items-center justify-center">
                    R
                  </span>
                  <label htmlFor="rapid-reason" className="text-xs font-bold text-chocolate uppercase tracking-wider">
                    REASON: {rapidEx.reasonPrompt}
                  </label>
                </div>
                <input
                  id="rapid-reason"
                  type="text"
                  value={rapidReason}
                  onChange={(e) => setRapidReason(e.target.value)}
                  placeholder="Contoh: Karena saat kita tahu kapan harus fokus belajar, kita bisa main tanpa rasa bersalah..."
                  className="w-full p-3 rounded-xl bg-cream-muted/50 border border-sage/40 text-xs sm:text-sm focus:border-cherry focus:ring-1 focus:ring-cherry focus:outline-none"
                />
              </div>

              {/* Box 3: Example */}
              <div className="p-4 sm:p-5 rounded-2xl bg-cream border border-sage/40">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-5 h-5 rounded-full bg-cherry text-cream text-[10px] font-bold flex items-center justify-center">
                    E
                  </span>
                  <label htmlFor="rapid-example" className="text-xs font-bold text-chocolate uppercase tracking-wider">
                    EXAMPLE: {rapidEx.examplePrompt}
                  </label>
                </div>
                <input
                  id="rapid-example"
                  type="text"
                  value={rapidExample}
                  onChange={(e) => setRapidExample(e.target.value)}
                  placeholder="Contoh: Misalnya, selesaikan tugas 1 jam setelah sampai rumah, lalu malam harinya santai..."
                  className="w-full p-3 rounded-xl bg-cream-muted/50 border border-sage/40 text-xs sm:text-sm focus:border-cherry focus:ring-1 focus:ring-cherry focus:outline-none"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <button
                type="button"
                onClick={() => setShowSampleRapid(!showSampleRapid)}
                className="text-xs font-semibold text-cherry hover:text-chocolate transition-colors inline-flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">lightbulb</span>
                <span>{showSampleRapid ? 'Tutup Contoh Inspirasi' : 'Lihat Contoh Kerangka'}</span>
              </button>

              <button
                type="button"
                onClick={handleSaveRapidStructure}
                className="px-6 py-2.5 rounded-xl bg-cherry hover:bg-chocolate text-cream text-xs font-semibold transition-all shadow-sm"
              >
                Simpan &amp; Latih Bersuara
              </button>
            </div>

            {/* Sample Structure Box */}
            {showSampleRapid && rapidEx.sampleStructure && (
              <div className="p-5 rounded-2xl bg-cream border border-sage/40 mb-6 text-xs text-chocolate/85 space-y-2 animate-fade-in-up">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cherry block mb-1">
                  Inspirasi Jawaban Cepat (30 Detik):
                </span>
                <p><strong>[P] Point:</strong> {rapidEx.sampleStructure.point}</p>
                <p><strong>[R] Reason:</strong> {rapidEx.sampleStructure.reason}</p>
                <p><strong>[E] Example:</strong> {rapidEx.sampleStructure.example}</p>
              </div>
            )}

            {/* Unified Speech Live Preview */}
            {isRapidSaved && (
              <div className="p-5 sm:p-6 rounded-2xl bg-cream border-l-4 border-cherry border-y border-r border-sage/40 mb-6 animate-fade-in-up">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cherry block mb-1.5">
                  Draft Ucapan 30 Detikmu (Bicarakan Bersuara Sekarang):
                </span>
                <p className="font-serif italic text-base sm:text-lg text-chocolate leading-relaxed">
                  &ldquo;{rapidPoint} {rapidReason} {rapidExample}&rdquo;
                </p>
                <p className="text-[11px] text-green-900 font-medium mt-3 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-green-700">task_alt</span>
                  <span>Hebat! Tarik napas diafragma, lalu ucapkan kalimat di atas dengan tenang.</span>
                </p>
              </div>
            )}

            {/* Action Footer */}
            <div className="pt-4 border-t border-sage/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-chocolate/65">
                {isRapidSaved
                  ? '✓ Kerangka 30 detik siap dipraktikkan.'
                  : 'Isi ketiga poin di atas lalu simpan untuk latihan berbicara.'}
              </p>
              <button
                type="button"
                onClick={() => onCompleteToggle?.(!isCompleted)}
                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isCompleted
                    ? 'bg-sage/40 text-chocolate border border-sage/60 font-bold'
                    : 'bg-cherry hover:bg-chocolate text-cream'
                }`}
              >
                {isCompleted ? 'Latihan Selesai (Ulangi)' : 'Tandai Latihan Selesai'}
              </button>
            </div>
          </div>
        )}

        {/* ── VARIANT D: VOCAL TOOLKIT FALLBACK (Module 01 Public Speaking) ─── */}
        {!hasDedicatedExercise && (
          <div className="rounded-3xl bg-cream-muted border border-sage/40 p-6 sm:p-9 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-sage/30 font-sans">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-cherry block mb-1">
                  Latihan Praktik Mandiri
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-chocolate">
                  Vocal Toolkit
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-chocolate/70">
                <span className="px-3 py-1 rounded-full bg-cream border border-sage/40">
                  {checkedVocalIds.length} dari {defaultExercises.length} Latihan Dicoba
                </span>
              </div>
            </div>

            {/* Interactive Checklist */}
            <div className="space-y-3.5 mb-8 font-sans">
              {defaultExercises.map((item) => {
                const isChecked = checkedVocalIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleVocalExercise(item.id)}
                    onKeyDown={(e) => {
                      if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        toggleVocalExercise(item.id);
                      }
                    }}
                    role="checkbox"
                    aria-checked={isChecked}
                    tabIndex={0}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-4 ${
                      isChecked
                        ? 'bg-cream border-cherry/50 shadow-sm'
                        : 'bg-cream/60 border-sage/30 hover:bg-cream hover:border-sage/50'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border transition-all ${
                        isChecked
                          ? 'bg-cherry text-cream border-cherry'
                          : 'border-chocolate/30 bg-cream text-transparent'
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm font-bold">check</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <h4
                          className={`text-sm sm:text-base font-bold transition-colors ${
                            isChecked ? 'text-cherry' : 'text-chocolate'
                          }`}
                        >
                          {item.name}
                        </h4>
                        {item.badge && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sage/20 border border-sage/40 text-chocolate/70">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-chocolate/75 leading-relaxed">
                        {item.instruction}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Footer */}
            <div className="pt-4 border-t border-sage/30 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
              <p className="text-xs text-chocolate/65 text-center sm:text-left">
                {isCompleted || checkedVocalIds.length === defaultExercises.length
                  ? '✓ Rangkaian pemanasan vokal telah kamu selesaikan.'
                  : 'Cobalah setiap teknik vokal ini selama 1–2 menit sebelum berbicara.'}
              </p>
              <button
                type="button"
                onClick={() => onCompleteToggle?.(!isCompleted)}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm ${
                  isCompleted
                    ? 'bg-sage/40 text-chocolate border border-sage/60 font-bold'
                    : 'bg-cherry hover:bg-chocolate text-cream'
                }`}
              >
                <span className="material-symbols-outlined text-base">
                  {isCompleted ? 'check_circle' : 'task_alt'}
                </span>
                <span>{isCompleted ? 'Latihan Selesai (Ulangi)' : 'Tandai Latihan Selesai'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
