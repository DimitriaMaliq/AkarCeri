import React, { useState } from 'react';
import type { QuizQuestion } from '../../data/lessonsData';

interface QuizSectionProps {
  questions: QuizQuestion[];
  sectionId?: string;
  orderNumber?: string;
  isCompleted?: boolean;
  initialScore?: number;
  onQuizCompleted?: (score: number) => void;
  onContinueToNextSection?: () => void;
}

export const QuizSection: React.FC<QuizSectionProps> = ({
  questions,
  sectionId,
  orderNumber = '06',
  isCompleted: initialCompleted = false,
  initialScore,
  onQuizCompleted,
  onContinueToNextSection,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isFinished, setIsFinished] = useState<boolean>(initialCompleted);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  const handleSelectOption = (optionId: string) => {
    if (isChecked) return; // Cannot change after checking
    setSelectedOption(optionId);
  };

  const handleCheckAnswer = () => {
    if (!selectedOption || !currentQuestion) return;
    setIsChecked(true);

    const nextAnswers = {
      ...answers,
      [currentQuestion.id]: selectedOption,
    };
    setAnswers(nextAnswers);

    // If it's the last question, we calculate final score
    if (currentIndex === totalQuestions - 1) {
      const finalScore = questions.filter(
        (q) => (nextAnswers[q.id] || selectedOption) === q.correctAnswerId
      ).length;
      onQuizCompleted?.(finalScore);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsChecked(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsChecked(false);
    setAnswers({});
    setIsFinished(false);
  };

  // Calculate score
  const computedScore = questions.filter(
    (q) => answers[q.id] === q.correctAnswerId
  ).length;
  const displayScore = initialScore !== undefined ? initialScore : computedScore;
  const scorePercent = totalQuestions > 0 ? Math.round((displayScore / totalQuestions) * 100) : 0;

  const effectiveId = sectionId || `section-${orderNumber}`;

  return (
    <section
      id={effectiveId}
      className="scroll-mt-36 py-12 sm:py-16 border-b border-sage/30"
      aria-labelledby="quiz-heading"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="flex items-baseline justify-between gap-4 mb-2">
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-cherry/40 select-none">
              {orderNumber}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-cherry font-sans">
              Cek Pemahaman • Kuis Situasi Nyata
            </span>
          </div>

          {!isFinished && totalQuestions > 0 && (
            <div className="flex items-center gap-2 text-xs font-sans font-bold text-chocolate/80">
              <span className="px-3 py-1 rounded-full bg-cream-muted border border-sage/40">
                QUESTION 0{currentIndex + 1} / 0{totalQuestions}
              </span>
            </div>
          )}
        </div>

        <h2
          id="quiz-heading"
          className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-chocolate mb-4 leading-snug"
        >
          {isFinished ? 'Hasil Evaluasi Kuis' : 'Uji Pemahaman Pola Pikir & Respons Bicara'}
        </h2>

        {!isFinished && (
          <p className="text-base sm:text-lg text-chocolate/80 leading-relaxed mb-8 font-sans">
            Pilihlah satu tindakan paling tepat untuk menghadapi situasi gugup di bawah ini.
          </p>
        )}

        {/* Finished / Summary State Card */}
        {isFinished ? (
          <div className="rounded-3xl bg-cream-muted border border-sage/40 p-8 sm:p-12 text-center shadow-sm font-sans animate-fade-in-up">
            <div className="w-16 h-16 rounded-full bg-cherry text-cream flex items-center justify-center mx-auto mb-4 shadow-md">
              <span className="material-symbols-outlined text-3xl">task_alt</span>
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-cherry block mb-1">
              Kuis Selesai
            </span>

            <h3 className="font-serif text-3xl sm:text-4xl font-medium text-chocolate mb-2">
              QUIZ COMPLETE
            </h3>

            <div className="my-6 inline-flex flex-col items-center justify-center px-8 py-4 rounded-2xl bg-cream border border-sage/40 shadow-inner">
              <span className="text-3xl sm:text-4xl font-mono font-bold text-cherry">
                {displayScore} / {totalQuestions} benar
              </span>
              <span className="text-xs font-bold text-sage-dark uppercase tracking-wider mt-1">
                Tingkat Akurasi: {scorePercent}%
              </span>
            </div>

            <p className="text-sm sm:text-base text-chocolate/80 max-w-md mx-auto leading-relaxed mb-8">
              {displayScore === totalQuestions
                ? 'Luar biasa! Kamu memahami esensi biologis rasa gugup dan pentingnya jeda vokal dengan sangat baik.'
                : 'Bagus sekali! Evaluasi prinsip respons dan jeda pernapasan untuk terus mematangkan kesiapan bicaramu.'}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleResetQuiz}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cream border border-sage/50 text-chocolate hover:text-cherry text-xs sm:text-sm font-semibold transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-base">refresh</span>
                <span>Review / Ulangi Kuis</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (onContinueToNextSection) {
                    onContinueToNextSection();
                  } else {
                    const el = document.getElementById('section-07');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-cherry text-cream hover:bg-chocolate text-xs sm:text-sm font-semibold transition-all duration-200 shadow-md hover:-translate-y-0.5"
              >
                <span>Lanjut ke Refleksi Diri</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>
          </div>
        ) : (
          /* One Question Per Step Card */
          currentQuestion && (
            <div className="rounded-3xl bg-cream-muted border border-sage/40 p-6 sm:p-10 shadow-sm font-sans">
              {/* Question Progress Dots */}
              <div className="flex items-center gap-2 mb-4">
                {questions.map((q, idx) => (
                  <div
                    key={q.id}
                    className={`h-1.5 rounded-full transition-all duration-200 ${idx === currentIndex
                        ? 'w-8 bg-cherry'
                        : idx < currentIndex
                          ? 'w-4 bg-green-700'
                          : 'w-4 bg-sage/40'
                      }`}
                  />
                ))}
              </div>

              <span className="text-[11px] font-bold uppercase tracking-wider text-sage-dark block mb-2">
                Skenario Nyata #{currentIndex + 1}
              </span>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-chocolate mb-6 leading-snug">
                {currentQuestion.question}
              </h3>

              {/* Options */}
              <div className="space-y-3 mb-6" role="radiogroup" aria-label={currentQuestion.question}>
                {currentQuestion.options.map((opt) => {
                  const isSelected = selectedOption === opt.id;
                  const isCorrect = opt.id === currentQuestion.correctAnswerId;

                  let optionStyle =
                    'bg-cream hover:bg-cream-muted border-sage/40 text-chocolate';

                  if (isChecked) {
                    if (isCorrect) {
                      optionStyle =
                        'bg-green-50/90 border-green-600 text-green-950 font-semibold ring-1 ring-green-600';
                    } else if (isSelected && !isCorrect) {
                      optionStyle =
                        'bg-cherry/10 border-cherry text-cherry font-semibold ring-1 ring-cherry';
                    } else {
                      optionStyle = 'bg-cream/40 border-sage/20 text-chocolate/40';
                    }
                  } else if (isSelected) {
                    optionStyle =
                      'bg-cream border-cherry text-chocolate font-semibold ring-1 ring-cherry shadow-sm';
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={isChecked}
                      onClick={() => handleSelectOption(opt.id)}
                      className={`w-full text-left p-4 sm:p-5 rounded-2xl border text-xs sm:text-sm transition-all duration-200 flex items-start gap-3.5 focus-visible:ring-2 focus-visible:ring-cherry focus-visible:outline-none ${optionStyle}`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 border text-[11px] font-bold ${isChecked
                            ? isCorrect
                              ? 'bg-green-700 text-cream border-green-700'
                              : isSelected
                                ? 'bg-cherry text-cream border-cherry'
                                : 'border-sage/40 text-chocolate/40 bg-cream'
                            : isSelected
                              ? 'bg-cherry text-cream border-cherry'
                              : 'border-sage/50 text-chocolate/60 bg-cream'
                          }`}
                      >
                        {isChecked && isCorrect ? (
                          <span className="material-symbols-outlined text-xs">check</span>
                        ) : isChecked && isSelected && !isCorrect ? (
                          <span className="material-symbols-outlined text-xs">close</span>
                        ) : (
                          opt.id.slice(-1).toUpperCase()
                        )}
                      </div>
                      <span className="leading-relaxed flex-1">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback and Explanation Box after Check Answer */}
              {isChecked && (
                <div
                  className={`p-5 rounded-2xl border mb-6 text-xs sm:text-sm leading-relaxed animate-fade-in-up ${selectedOption === currentQuestion.correctAnswerId
                      ? 'bg-green-50/80 border-green-300 text-green-950'
                      : 'bg-cream border-sage/50 text-chocolate/90'
                    }`}
                >
                  <div className="flex items-center gap-2 font-bold mb-1.5">
                    <span className="material-symbols-outlined text-base text-cherry">
                      {selectedOption === currentQuestion.correctAnswerId
                        ? 'check_circle'
                        : 'info'}
                    </span>
                    <span>
                      {selectedOption === currentQuestion.correctAnswerId
                        ? 'Tepat Sekali!'
                        : 'Ulasan Pembelajaran:'}
                    </span>
                  </div>
                  <p>{currentQuestion.explanation}</p>
                </div>
              )}

              {/* Footer Action Buttons */}
              <div className="pt-4 border-t border-sage/30 flex items-center justify-between gap-3">
                <div className="text-xs text-chocolate/60">
                  {!isChecked
                    ? 'Pilih satu opsi lalu tekan Cek Jawaban.'
                    : 'Jawaban telah tersimpan.'}
                </div>

                {!isChecked ? (
                  <button
                    type="button"
                    disabled={!selectedOption}
                    onClick={handleCheckAnswer}
                    className={`inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm ${selectedOption
                        ? 'bg-cherry hover:bg-chocolate text-cream cursor-pointer'
                        : 'bg-sage/20 text-chocolate/40 cursor-not-allowed border border-sage/30'
                      }`}
                  >
                    <span>Cek Jawaban</span>
                    <span className="material-symbols-outlined text-base">check</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-cherry hover:bg-chocolate text-cream text-xs sm:text-sm font-semibold transition-all duration-200 shadow-md hover:-translate-y-0.5"
                  >
                    <span>
                      {currentIndex < totalQuestions - 1
                        ? 'Lanjut ke Pertanyaan Berikutnya'
                        : 'Lihat Hasil Kuis'}
                    </span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </button>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

