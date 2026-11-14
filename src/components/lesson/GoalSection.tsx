import React, { useState } from 'react';

interface GoalSectionProps {
  sectionId?: string;
  orderNumber?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  checklistItems?: string[];
  closingStatement?: string;
  presetGoals?: string[];
  initialSelectedGoal?: string;
  initialCustomGoal?: string;
  isCompleted?: boolean;
  onCompleteLesson?: (selectedGoal: string, customGoal: string) => void;
}

const CUSTOM_GOAL_KEY = '__custom__';

export const GoalSection: React.FC<GoalSectionProps> = ({
  sectionId,
  orderNumber = '08',
  title,
  subtitle,
  description,
  checklistItems,
  closingStatement,
  presetGoals = [
    'Mengajukan satu pertanyaan atau tanggapan di kelas/forum minggu ini.',
    'Memperkenalkan diri kepada satu orang baru di sekolah atau komunitas.',
    'Melatih pernapasan diafragma 4-4-4 sebelum membuka presentasi kelompok.',
    'Menyisipkan jeda hening 2 detik daripada memakai filler word saat berpendapat.',
  ],
  initialSelectedGoal = '',
  initialCustomGoal = '',
  isCompleted = false,
  onCompleteLesson,
}) => {
  const isInitialCustom =
    Boolean(initialCustomGoal) ||
    (Boolean(initialSelectedGoal) && !presetGoals.includes(initialSelectedGoal));

  const [selectedGoal, setSelectedGoal] = useState<string>(() => {
    if (isInitialCustom) return CUSTOM_GOAL_KEY;
    if (initialSelectedGoal && presetGoals.includes(initialSelectedGoal)) {
      return initialSelectedGoal;
    }
    return presetGoals[0];
  });

  const [customGoalText, setCustomGoalText] = useState<string>(
    initialCustomGoal || (isInitialCustom ? initialSelectedGoal : '')
  );

  const handleSelect = (goal: string) => {
    setSelectedGoal(goal);
  };

  const handleFinish = () => {
    const finalSelected = selectedGoal === CUSTOM_GOAL_KEY ? customGoalText : selectedGoal;
    onCompleteLesson?.(finalSelected, selectedGoal === CUSTOM_GOAL_KEY ? customGoalText : '');
  };

  const effectiveId = sectionId || `section-${orderNumber}`;

  return (
    <section
      id={effectiveId}
      className="scroll-mt-36 py-12 sm:py-16 border-b border-sage/30 bg-cream"
      aria-labelledby="goal-section-heading"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="flex items-baseline gap-3 mb-2">
          <span className="font-serif text-3xl sm:text-4xl font-bold text-cherry/40 select-none">
            {orderNumber}
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-cherry font-sans">
            {subtitle || 'Aksi Nyata • Target 7 Hari'}
          </span>
        </div>

        <h2
          id="goal-section-heading"
          className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-chocolate mb-4 leading-snug"
        >
          {title || 'Your First Speaking Goal'}
        </h2>

        <p className="text-base sm:text-lg text-chocolate/85 leading-relaxed mb-8 font-sans">
          {description ||
            'Kecakapan hidup tidak bertumbuh dari hafalan teori belaka, melainkan dari keberanian mengulang satu komitmen mikro yang nyata. Tentukan target bicaramu untuk 7 hari ke depan.'}
        </p>

        {/* Completion Checklist (if provided) */}
        {checklistItems && checklistItems.length > 0 && (
          <div className="rounded-3xl bg-cream-muted border border-sage/40 p-6 sm:p-9 shadow-sm font-sans mb-8">
            <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider text-cherry">
              <span className="material-symbols-outlined text-base">task_alt</span>
              <span>Sekarang Kamu Bisa:</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {checklistItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-chocolate/85">
                  <span className="w-5 h-5 rounded-full bg-green-100 text-green-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
            {closingStatement && (
              <div className="pt-4 border-t border-sage/30">
                <p className="font-serif italic text-sm sm:text-base text-chocolate leading-relaxed">
                  &ldquo;{closingStatement}&rdquo;
                </p>
              </div>
            )}
          </div>
        )}

        {/* Goal Selection Card */}
        <div className="rounded-3xl bg-cream-muted border border-sage/40 p-6 sm:p-10 shadow-sm font-sans mb-8">
          <div className="mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-cherry block mb-1">
              Komitmen Mikro
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-chocolate">
              Pilih satu komitmen mikro untuk 7 hari ke depan:
            </h3>
          </div>

          {/* Preset Options */}
          <div className="space-y-3 mb-6" role="radiogroup" aria-label="Pilihan Target Bicara">
            {presetGoals.map((goal, idx) => {
              const isSelected = selectedGoal === goal;
              return (
                <div
                  key={idx}
                  onClick={() => handleSelect(goal)}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault();
                      handleSelect(goal);
                    }
                  }}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={0}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-4 ${
                    isSelected
                      ? 'bg-cream border-cherry shadow-sm ring-1 ring-cherry'
                      : 'bg-cream/60 border-sage/30 hover:bg-cream hover:border-sage/50'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 border transition-colors ${
                      isSelected
                        ? 'border-cherry bg-cherry text-cream'
                        : 'border-sage/50 bg-cream text-transparent'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-cream" />
                  </div>
                  <span
                    className={`text-xs sm:text-sm leading-relaxed ${
                      isSelected ? 'font-bold text-chocolate' : 'text-chocolate/85'
                    }`}
                  >
                    {goal}
                  </span>
                </div>
              );
            })}

            {/* Custom Goal Option */}
            <div
              onClick={() => handleSelect(CUSTOM_GOAL_KEY)}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  handleSelect(CUSTOM_GOAL_KEY);
                }
              }}
              role="radio"
              aria-checked={selectedGoal === CUSTOM_GOAL_KEY}
              tabIndex={0}
              className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-4 ${
                selectedGoal === CUSTOM_GOAL_KEY
                  ? 'bg-cream border-cherry shadow-sm ring-1 ring-cherry'
                  : 'bg-cream/60 border-sage/30 hover:bg-cream hover:border-sage/50'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 border transition-colors ${
                  selectedGoal === CUSTOM_GOAL_KEY
                    ? 'border-cherry bg-cherry text-cream'
                    : 'border-sage/50 bg-cream text-transparent'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-cream" />
              </div>
              <div className="flex-1 min-w-0">
                <span
                  className={`text-xs sm:text-sm leading-relaxed block ${
                    selectedGoal === CUSTOM_GOAL_KEY ? 'font-bold text-chocolate' : 'text-chocolate/85'
                  }`}
                >
                  Tentukan target bicaramu sendiri (Custom Goal)
                </span>

                {selectedGoal === CUSTOM_GOAL_KEY && (
                  <div className="mt-3" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="text"
                      value={customGoalText}
                      onChange={(e) => setCustomGoalText(e.target.value)}
                      placeholder="Tulis target bicaramu sendiri untuk minggu ini..."
                      className="w-full p-3.5 rounded-xl bg-cream text-chocolate placeholder:text-chocolate/40 text-xs sm:text-sm border border-sage/40 focus:border-cherry focus:ring-1 focus:ring-cherry focus:outline-none transition-all shadow-inner"
                      autoFocus
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="pt-6 border-t border-sage/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-chocolate/70 text-center sm:text-left">
              Menyimpan komitmen ini akan menandai modul pertamamu selesai dipelajari secara resmi.
            </p>

            <button
              type="button"
              onClick={handleFinish}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-cherry hover:bg-chocolate text-cream font-semibold text-sm transition-all duration-200 shadow-md hover:shadow hover:-translate-y-0.5"
            >
              <span className="material-symbols-outlined text-lg">check_circle</span>
              <span>{isCompleted ? 'Perbarui Komitmen Modul' : 'Simpan Target & Selesaikan Modul'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

