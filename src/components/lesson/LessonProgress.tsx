import React from 'react';

interface ProgressSectionItem {
  id: string;
  orderNumber: string;
  title: string;
}

interface LessonProgressProps {
  sections: ProgressSectionItem[];
  activeSectionId?: string;
  isCompleted: boolean;
  progressPercent: number;
  completedActivitiesCount: number;
  totalActivitiesCount: number;
  quizCompleted: boolean;
  challengeCompleted: boolean;
  exerciseCompleted: boolean;
  videoWatched: boolean;
  reflectionCompleted: boolean;
  goalCompleted: boolean;
  onSectionClick?: (sectionId: string) => void;
  onMarkCompleteToggle?: () => void;
}

export const LessonProgress: React.FC<LessonProgressProps> = ({
  sections,
  activeSectionId,
  isCompleted,
  progressPercent,
  completedActivitiesCount,
  totalActivitiesCount,
  quizCompleted,
  challengeCompleted,
  exerciseCompleted,
  videoWatched,
  reflectionCompleted,
  goalCompleted,
  onSectionClick,
  onMarkCompleteToggle,
}) => {
  return (
    <div
      className="sticky top-20 z-40 bg-cream/95 backdrop-blur-md border-b border-sage/40 py-3 px-4 sm:px-6 lg:px-8 transition-all shadow-sm"
      role="region"
      aria-label="Progress Pembelajaran Modul"
    >
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Progress Bar & Status */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 text-xs font-semibold mb-1.5 font-sans">
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider font-bold text-chocolate">
                Your Progress
              </span>
              <span className="text-cherry font-bold text-sm">{progressPercent}%</span>
              {isCompleted && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-green-800 bg-green-100 px-2 py-0.5 rounded-full">
                  <span className="material-symbols-outlined text-xs">done_all</span>
                  Lesson Completed
                </span>
              )}
            </div>

            <span className="text-[11px] text-chocolate/70 font-normal">
              {completedActivitiesCount} of {totalActivitiesCount} activities completed
            </span>
          </div>

          {/* Progress Bar Track */}
          <div
            className="w-full h-2 rounded-full bg-cream-muted border border-sage/40 overflow-hidden"
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className={`h-full transition-all duration-300 ease-out ${
                isCompleted ? 'bg-green-700' : 'bg-cherry'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Milestone Quick Chips (Desktop) */}
        <div className="hidden xl:flex items-center gap-1.5 text-[11px] font-sans text-chocolate/75 shrink-0">
          <span
            className={`flex items-center gap-1 px-2 py-0.5 rounded ${
              exerciseCompleted
                ? 'bg-sage/40 text-chocolate font-bold'
                : 'bg-cream-muted text-chocolate/50 border border-sage/30'
            }`}
          >
            <span className="material-symbols-outlined text-xs">
              {exerciseCompleted ? 'check' : 'radio_button_unchecked'}
            </span>
            Vokal
          </span>

          <span
            className={`flex items-center gap-1 px-2 py-0.5 rounded ${
              videoWatched
                ? 'bg-sage/40 text-chocolate font-bold'
                : 'bg-cream-muted text-chocolate/50 border border-sage/30'
            }`}
          >
            <span className="material-symbols-outlined text-xs">
              {videoWatched ? 'check' : 'radio_button_unchecked'}
            </span>
            Video
          </span>

          <span
            className={`flex items-center gap-1 px-2 py-0.5 rounded ${
              challengeCompleted
                ? 'bg-sage/40 text-chocolate font-bold'
                : 'bg-cream-muted text-chocolate/50 border border-sage/30'
            }`}
          >
            <span className="material-symbols-outlined text-xs">
              {challengeCompleted ? 'check' : 'radio_button_unchecked'}
            </span>
            60s
          </span>

          <span
            className={`flex items-center gap-1 px-2 py-0.5 rounded ${
              quizCompleted
                ? 'bg-sage/40 text-chocolate font-bold'
                : 'bg-cream-muted text-chocolate/50 border border-sage/30'
            }`}
          >
            <span className="material-symbols-outlined text-xs">
              {quizCompleted ? 'check' : 'radio_button_unchecked'}
            </span>
            Kuis
          </span>

          <span
            className={`flex items-center gap-1 px-2 py-0.5 rounded ${
              reflectionCompleted
                ? 'bg-sage/40 text-chocolate font-bold'
                : 'bg-cream-muted text-chocolate/50 border border-sage/30'
            }`}
          >
            <span className="material-symbols-outlined text-xs">
              {reflectionCompleted ? 'check' : 'radio_button_unchecked'}
            </span>
            Refleksi
          </span>

          <span
            className={`flex items-center gap-1 px-2 py-0.5 rounded ${
              goalCompleted
                ? 'bg-sage/40 text-chocolate font-bold'
                : 'bg-cream-muted text-chocolate/50 border border-sage/30'
            }`}
          >
            <span className="material-symbols-outlined text-xs">
              {goalCompleted ? 'check' : 'radio_button_unchecked'}
            </span>
            Target
          </span>
        </div>

        {/* Right: Quick Mark Complete Toggle */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center font-sans">
          <button
            type="button"
            onClick={onMarkCompleteToggle}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 shadow-sm focus-visible:ring-2 focus-visible:ring-cherry focus-visible:outline-none ${
              isCompleted
                ? 'bg-sage/30 hover:bg-sage/50 text-chocolate border border-sage/50 font-bold'
                : 'bg-cherry hover:bg-chocolate text-cream'
            }`}
          >
            <span className="material-symbols-outlined text-base">
              {isCompleted ? 'check_circle' : 'task_alt'}
            </span>
            <span>{isCompleted ? 'Tuntas (Batal)' : 'Tandai Selesai'}</span>
          </button>
        </div>
      </div>

      {/* Horizontal Steps Navigator Bar (Desktop) */}
      <nav
        aria-label="Navigasi Tahapan Modul"
        className="hidden lg:flex items-center justify-between gap-1 max-w-4xl mx-auto pt-2.5 mt-2 border-t border-sage/25 overflow-x-auto no-scrollbar"
      >
        {sections.map((sec) => {
          const isActive = activeSectionId === sec.id;
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => onSectionClick?.(sec.id)}
              className={`px-2 py-1 rounded text-[11px] font-sans font-medium whitespace-nowrap transition-colors flex items-center gap-1 ${
                isActive
                  ? 'bg-cherry text-cream font-bold'
                  : 'text-chocolate/70 hover:text-chocolate hover:bg-sage/20'
              }`}
            >
              <span className="text-[10px] opacity-75">{sec.orderNumber}</span>
              <span className="truncate max-w-[110px]">{sec.title}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
