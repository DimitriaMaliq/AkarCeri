import React from 'react';
import { QuizSection } from './QuizSection';
import type { QuizQuestion } from '../../data/lessonsData';

interface LessonQuizProps {
  questions: QuizQuestion[];
  orderNumber?: string;
  onQuizCompleted?: (score: number) => void;
  isCompleted?: boolean;
}

export const LessonQuiz: React.FC<LessonQuizProps> = (props) => {
  return <QuizSection {...props} />;
};

export default LessonQuiz;
