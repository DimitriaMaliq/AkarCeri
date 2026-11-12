import React from 'react';
import { ReflectionSection } from './ReflectionSection';
import type { ReflectionQuestion } from '../../data/lessonsData';

interface LessonReflectionProps {
  questions: ReflectionQuestion[];
  orderNumber?: string;
  initialAnswers?: Record<string, string>;
  onSaveAnswers?: (answers: Record<string, string>) => void;
}

export const LessonReflection: React.FC<LessonReflectionProps> = (props) => {
  return <ReflectionSection {...props} />;
};

export default LessonReflection;
