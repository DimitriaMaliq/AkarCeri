import React from 'react';
import { LessonHeader } from './LessonHeader';
import type { Lesson } from '../../data/lessonsData';

interface LessonHeroProps {
  lesson: Lesson;
  isCompleted?: boolean;
  progressPercent?: number;
  completedActivitiesCount?: number;
  totalActivitiesCount?: number;
  onStartClick?: () => void;
}

export const LessonHero: React.FC<LessonHeroProps> = (props) => {
  return <LessonHeader {...props} />;
};

export default LessonHero;
