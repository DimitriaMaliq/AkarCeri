import React from 'react';
import type { Lesson, LessonSection, LessonProgressState } from '../../data/lessonsData';
import { TextSection } from './TextSection';
import { ExerciseSection } from './ExerciseSection';
import { VideoSection } from './VideoSection';
import { ChallengeSection } from './ChallengeSection';
import { QuizSection } from './QuizSection';
import { ReflectionSection } from './ReflectionSection';
import { GoalSection } from './GoalSection';

interface LessonSectionRendererProps {
  section: LessonSection;
  lesson: Lesson;
  progress: LessonProgressState;
  onMarkReadSection?: (sectionId: string) => void;
  onToggleExercise?: (completed: boolean) => void;
  onToggleVideo?: (watched: boolean) => void;
  onToggleChallenge?: (completed: boolean) => void;
  onQuizCompleted?: (score: number) => void;
  onSaveReflection?: (answers: Record<string, string>) => void;
  onCompleteGoal?: (selectedGoal: string, customGoal: string) => void;
}

export const LessonSectionRenderer: React.FC<LessonSectionRendererProps> = ({
  section,
  lesson,
  progress,
  onMarkReadSection,
  onToggleExercise,
  onToggleVideo,
  onToggleChallenge,
  onQuizCompleted,
  onSaveReflection,
  onCompleteGoal,
}) => {
  const isSectionRead = progress.completedSections?.includes(section.id) || false;

  switch (section.type) {
    case 'text':
      return (
        <TextSection
          section={section}
          isRead={isSectionRead}
          onMarkRead={onMarkReadSection}
        />
      );

    case 'exercise':
      return (
        <ExerciseSection
          section={section}
          isCompleted={progress.exerciseCompleted}
          onCompleteToggle={onToggleExercise}
        />
      );

    case 'video':
      if (!lesson.video) return null;
      return (
        <VideoSection
          video={lesson.video}
          sectionId={section.id}
          orderNumber={section.orderNumber}
          isWatched={progress.videoWatched}
          onWatchedToggle={onToggleVideo}
        />
      );

    case 'challenge':
      if (section.realLifeChoices) {
        return (
          <ChallengeSection
            sectionId={section.id}
            orderNumber={section.orderNumber}
            title={section.title}
            subtitle={section.subtitle}
            instructions={section.content?.[0]}
            realLifeChoices={section.realLifeChoices}
            isCompleted={progress.challengeCompleted}
            onCompleteToggle={onToggleChallenge}
          />
        );
      }
      if (!lesson.challenge) return null;
      return (
        <ChallengeSection
          challenge={lesson.challenge}
          sectionId={section.id}
          orderNumber={section.orderNumber}
          title={section.title}
          subtitle={section.subtitle}
          instructions={section.content?.[0]}
          isCompleted={progress.challengeCompleted}
          onCompleteToggle={onToggleChallenge}
        />
      );

    case 'quiz':
      if (!lesson.quiz || lesson.quiz.length === 0) return null;
      return (
        <QuizSection
          questions={lesson.quiz}
          sectionId={section.id}
          orderNumber={section.orderNumber}
          isCompleted={progress.quizCompleted}
          initialScore={progress.quizScore}
          onQuizCompleted={onQuizCompleted}
        />
      );

    case 'reflection':
      if (!lesson.reflectionQuestions || lesson.reflectionQuestions.length === 0) return null;
      return (
        <ReflectionSection
          questions={lesson.reflectionQuestions}
          sectionId={section.id}
          orderNumber={section.orderNumber}
          initialAnswers={progress.reflectionAnswers}
          onSaveAnswers={onSaveReflection}
        />
      );

    case 'goal':
      return (
        <GoalSection
          sectionId={section.id}
          orderNumber={section.orderNumber}
          title={lesson.speakingGoalPrompt?.title || section.title}
          subtitle={lesson.speakingGoalPrompt?.subtitle || section.subtitle}
          description={lesson.speakingGoalPrompt?.description}
          checklistItems={lesson.speakingGoalPrompt?.checklistItems}
          closingStatement={lesson.speakingGoalPrompt?.closingStatement}
          presetGoals={lesson.speakingGoalPrompt?.presetGoals}
          initialSelectedGoal={progress.selectedGoal}
          initialCustomGoal={progress.customGoal}
          isCompleted={progress.isCompleted}
          onCompleteLesson={onCompleteGoal}
        />
      );

    default:
      return null;
  }
};

