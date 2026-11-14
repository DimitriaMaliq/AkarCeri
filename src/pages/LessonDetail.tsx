import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { PageLayout } from '../components/PageLayout';
import {
  getLessonBySlug,
  getLessonProgress,
  saveLessonProgress,
  type Lesson,
  type LessonProgressState,
} from '../data/lessonsData';
import { LessonHeader } from '../components/lesson/LessonHeader';
import { LessonProgress } from '../components/lesson/LessonProgress';
import { LessonSectionRenderer } from '../components/lesson/LessonSectionRenderer';
import { LessonCompletion } from '../components/lesson/LessonCompletion';
import { LessonNavigation } from '../components/lesson/LessonNavigation';
import { LessonSources } from '../components/lesson/LessonSources';
import EnglishYourWay from './EnglishYourWay';
import PublicSpeaking from './PublicSpeaking';

interface LessonDetailContentProps {
  slug: string;
  lesson: Lesson;
}

const TOTAL_ACTIVITIES = 6;

const LessonDetailContent: React.FC<LessonDetailContentProps> = ({ slug, lesson }) => {
  // Initialize progress state once per slug from localStorage
  const [progress, setProgress] = useState<LessonProgressState>(() =>
    getLessonProgress(slug)
  );
  const [activeSectionId, setActiveSectionId] = useState<string>('section-01');

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Section observer to update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = lesson.sections.map((sec) => ({
        id: sec.id,
        el: document.getElementById(sec.id),
      }));

      const scrollPosition = window.scrollY + 220;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        if (item.el && item.el.offsetTop <= scrollPosition) {
          setActiveSectionId(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lesson]);

  // Jump to section helper
  const handleJumpToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Activity calculation
  const hasExerciseDone = Boolean(progress.exerciseCompleted);
  const hasVideoDone = Boolean(progress.videoWatched);
  const hasChallengeDone = Boolean(progress.challengeCompleted);
  const hasQuizDone = Boolean(progress.quizCompleted);
  const reflectionCount = Object.values(progress.reflectionAnswers || {}).filter(
    (v) => v && v.trim().length > 0
  ).length;
  const hasReflectionDone =
    lesson.reflectionQuestions && lesson.reflectionQuestions.length > 0
      ? reflectionCount >= Math.min(2, lesson.reflectionQuestions.length)
      : false;
  const hasGoalDone = Boolean(progress.selectedGoal || progress.customGoal);

  let completedActivitiesCount = 0;
  if (hasExerciseDone) completedActivitiesCount++;
  if (hasVideoDone) completedActivitiesCount++;
  if (hasChallengeDone) completedActivitiesCount++;
  if (hasQuizDone) completedActivitiesCount++;
  if (hasReflectionDone) completedActivitiesCount++;
  if (hasGoalDone) completedActivitiesCount++;

  const calculatedPercent = progress.isCompleted
    ? 100
    : Math.round((completedActivitiesCount / TOTAL_ACTIVITIES) * 100);

  // Progress update handlers
  const handleMarkCompleteToggle = () => {
    const nextCompleted = !progress.isCompleted;
    const updated = saveLessonProgress(slug, {
      isCompleted: nextCompleted,
      completedAt: nextCompleted ? new Date().toISOString() : undefined,
    });
    setProgress(updated);
  };

  const handleToggleExercise = (completed: boolean) => {
    const updated = saveLessonProgress(slug, { exerciseCompleted: completed });
    setProgress(updated);
  };

  const handleToggleVideo = (watched: boolean) => {
    const updated = saveLessonProgress(slug, { videoWatched: watched });
    setProgress(updated);
  };

  const handleToggleChallenge = (completed: boolean) => {
    const updated = saveLessonProgress(slug, { challengeCompleted: completed });
    setProgress(updated);
  };

  const handleQuizCompleted = (score: number) => {
    const updated = saveLessonProgress(slug, {
      quizCompleted: true,
      quizScore: score,
    });
    setProgress(updated);
  };

  const handleSaveReflection = (answers: Record<string, string>) => {
    const updated = saveLessonProgress(slug, { reflectionAnswers: answers });
    setProgress(updated);
  };

  const handleCompleteGoal = (selectedGoal: string, customGoal: string) => {
    const updated = saveLessonProgress(slug, {
      isCompleted: true,
      completedAt: new Date().toISOString(),
      selectedGoal,
      customGoal,
    });
    setProgress(updated);
  };

  const handleMarkReadSection = (sectionId: string) => {
    const currentSections = progress.completedSections || [];
    const nextSections = currentSections.includes(sectionId)
      ? currentSections.filter((id) => id !== sectionId)
      : [...currentSections, sectionId];

    const updated = saveLessonProgress(slug, { completedSections: nextSections });
    setProgress(updated);
  };

  const isEnglishYourWay =
    lesson.pillarSlug === 'english-your-way' || lesson.pillar === 'English Your Way';

  const isPublicSpeaking =
    lesson.pillarId === 'speak-confidence' ||
    lesson.pillar === 'Public Speaking & Communication' ||
    lesson.slug === 'berani-bicara' ||
    lesson.slug === 'menyampaikan-ide';

  const backLink = isEnglishYourWay
    ? { to: '/pelajaran/english-your-way', label: 'Kembali ke English Your Way' }
    : isPublicSpeaking
    ? { to: '/pelajaran/public-speaking', label: 'Kembali ke Public Speaking & Communication' }
    : { to: '/eksplorasi', label: 'Kembali ke Eksplorasi Life Skills' };

  const prevNavigationLink = isEnglishYourWay
    ? { to: '/pelajaran/english-your-way', label: 'Kembali ke English Your Way' }
    : isPublicSpeaking
    ? lesson.slug === 'menyampaikan-ide'
      ? { to: '/pelajaran/berani-bicara', label: '← Modul 01: Berani Bicara' }
      : { to: '/pelajaran/public-speaking', label: 'Silabus Public Speaking' }
    : { to: '/eksplorasi', label: 'Eksplorasi Kurikulum' };

  const nextNavigationLink = isEnglishYourWay
    ? { to: '#', label: 'Modul 02: Speak Without Translating (Segera Hadir)', disabled: true }
    : isPublicSpeaking
    ? lesson.slug === 'berani-bicara'
      ? { to: '/pelajaran/menyampaikan-ide', label: 'Modul 02: Menyampaikan Ide →' }
      : { to: '#', label: 'Modul 03: Bicara di Depan Orang (Segera Hadir)', disabled: true }
    : { to: '/eksplorasi', label: 'Eksplorasi Lainnya' };

  const completionParentLink = isEnglishYourWay
    ? { to: '/pelajaran/english-your-way', label: 'Kembali ke English Your Way' }
    : isPublicSpeaking
    ? { to: '/pelajaran/public-speaking', label: 'Kembali ke Silabus Public Speaking' }
    : undefined;

  const completionNextSlug =
    lesson.slug === 'berani-bicara' ? 'menyampaikan-ide' : undefined;

  const completionNextTitle = isEnglishYourWay
    ? 'Modul 02: Speak Without Translating'
    : isPublicSpeaking
    ? lesson.slug === 'berani-bicara'
      ? 'Modul 02: Menyampaikan Ide'
      : 'Modul 03: Bicara di Depan Orang'
    : 'Modul Berikutnya';

  const currentModuleIndex =
    lesson.slug === 'menyampaikan-ide' ? 2 : 1;

  const totalModules = isPublicSpeaking ? 4 : isEnglishYourWay ? 6 : 6;

  return (
    <>
      {/* 1. Lesson Header */}
      <LessonHeader
        lesson={lesson}
        backLink={backLink}
        isCompleted={progress.isCompleted}
        progressPercent={calculatedPercent}
        completedActivitiesCount={completedActivitiesCount}
        totalActivitiesCount={TOTAL_ACTIVITIES}
        onStartClick={() => handleJumpToSection('section-01')}
      />

      {/* 2. Visual Sticky Progress Tracker */}
      <LessonProgress
        sections={lesson.sections.map((s) => ({
          id: s.id,
          orderNumber: s.orderNumber,
          title: s.title,
        }))}
        activeSectionId={activeSectionId}
        isCompleted={progress.isCompleted}
        progressPercent={calculatedPercent}
        completedActivitiesCount={completedActivitiesCount}
        totalActivitiesCount={TOTAL_ACTIVITIES}
        quizCompleted={hasQuizDone}
        challengeCompleted={hasChallengeDone}
        exerciseCompleted={hasExerciseDone}
        videoWatched={hasVideoDone}
        reflectionCompleted={hasReflectionDone}
        goalCompleted={hasGoalDone}
        onSectionClick={handleJumpToSection}
        onMarkCompleteToggle={handleMarkCompleteToggle}
      />

      {/* 3. Main Dynamic Section Renderer */}
      <main className="bg-cream px-4 sm:px-6 lg:px-8" role="main">
        {lesson.sections.map((sec) => (
          <LessonSectionRenderer
            key={sec.id}
            section={sec}
            lesson={lesson}
            progress={progress}
            onMarkReadSection={handleMarkReadSection}
            onToggleExercise={handleToggleExercise}
            onToggleVideo={handleToggleVideo}
            onToggleChallenge={handleToggleChallenge}
            onQuizCompleted={handleQuizCompleted}
            onSaveReflection={handleSaveReflection}
            onCompleteGoal={handleCompleteGoal}
          />
        ))}

        {/* 4. Lesson Completion Celebration Panel */}
        {progress.isCompleted && (
          <LessonCompletion
            lesson={lesson}
            nextModuleSlug={completionNextSlug}
            nextModuleTitle={completionNextTitle}
            parentPillarLink={completionParentLink}
          />
        )}

        {/* 5. Sources & References Section */}
        <LessonSources sources={lesson.sources} />

        {/* 6. Lesson Navigation (← Previous | Lesson 0X / 0Y | Next →) */}
        <LessonNavigation
          currentModuleIndex={currentModuleIndex}
          totalModules={totalModules}
          prevLink={prevNavigationLink}
          nextLink={nextNavigationLink}
        />

        {/* 7. Peer Support / PIK-R Integration Callout */}
        <section className="py-14 sm:py-20 border-t border-sage/30 bg-cream">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-3xl bg-cream-muted border border-sage/40 p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 mb-2 font-sans">
                  <span className="material-symbols-outlined text-cherry text-base">pin_drop</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-sage-dark">
                    Jejaring Konseling Sebaya Kota Cimahi
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-chocolate mb-2">
                  Latihan Bicara di Ruang Nyata yang Aman
                </h3>
                <p className="text-sm text-chocolate/75 leading-relaxed font-sans">
                  Pusat Informasi dan Konseling Remaja (PIK-R) siap menjadi kawan latihan bicaramu tanpa rasa cemas dihakimi. Temukan pos terdekat di sekitarmu.
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
      </main>
    </>
  );
};

interface LessonDetailProps {
  initialSlug?: string;
}

export const LessonDetail: React.FC<LessonDetailProps> = ({ initialSlug }) => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();

  // Extract last segment of pathname if slug param is missing
  const pathParts = location.pathname.split('/').filter(Boolean);
  const derivedFromPath = pathParts.length > 0 ? pathParts[pathParts.length - 1] : undefined;

  const activeSlug =
    initialSlug ||
    slug ||
    (derivedFromPath && derivedFromPath !== 'pelajaran' && derivedFromPath !== 'lessons'
      ? derivedFromPath
      : 'berani-bicara');

  if (activeSlug === 'english-your-way') {
    return <EnglishYourWay />;
  }

  if (activeSlug === 'public-speaking' || activeSlug === 'speak-confidence') {
    return <PublicSpeaking />;
  }

  const lesson = getLessonBySlug(activeSlug);

  // If lesson is not found (or placeholder modules from Explore)
  if (!lesson) {
    const formattedTitle = activeSlug
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());

    return (
      <PageLayout title={`${formattedTitle} — AKAR CERI`}>
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-sage/30 bg-cream font-sans">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/eksplorasi"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-cherry hover:text-chocolate transition-colors mb-6 group"
            >
              <span className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-1">
                arrow_back
              </span>
              <span>Kembali ke Eksplorasi Life Skills</span>
            </Link>

            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-cherry" />
              <span className="text-[11px] font-bold text-cherry tracking-widest uppercase">
                Modul Pembelajaran
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl font-medium text-chocolate leading-tight mb-4">
              {formattedTitle}
            </h1>

            <p className="text-base sm:text-lg text-chocolate/75 leading-relaxed max-w-xl">
              Modul ini sedang disiapkan oleh tim kurikulum AKAR CERI. Coba modul percontohan pertama kami yang sudah aktif sepenuhnya:
            </p>
          </div>
        </section>

        <section className="py-16 bg-cream px-4 sm:px-6 lg:px-8 font-sans">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-3xl bg-cream-muted border-2 border-dashed border-sage/50 p-8 sm:p-12 text-center">
              <span className="material-symbols-outlined text-5xl text-cherry mb-4">
                record_voice_over
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-sage-dark block mb-1">
                Modul Aktif Unggulan
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-chocolate mb-3">
                Modul 01: Berani Bicara
              </h2>
              <p className="text-sm text-chocolate/75 max-w-md mx-auto leading-relaxed mb-6">
                Pelajari biologi gugup, tonton teknik vokal Julian Treasure (TED), ikuti tantangan 60 detik, kuis pemahaman, dan refleksi diri.
              </p>
              <Link
                to="/pelajaran/berani-bicara"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-cherry text-cream text-sm font-semibold hover:bg-chocolate transition-all shadow-md hover:-translate-y-0.5"
              >
                <span>Buka Modul Berani Bicara</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>
      </PageLayout>
    );
  }

  // Keyed child component guarantees fresh state per slug without setState in useEffect
  return (
    <PageLayout title={`${lesson.title} — ${lesson.moduleNumber}`}>
      <LessonDetailContent key={activeSlug} slug={activeSlug} lesson={lesson} />
    </PageLayout>
  );
};

export default LessonDetail;
