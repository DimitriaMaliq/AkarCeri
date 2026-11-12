import React from 'react';
import { ChallengeSection } from './ChallengeSection';
import type { Challenge } from '../../data/lessonsData';

interface LessonChallengeProps {
  challenge: Challenge;
  orderNumber?: string;
  isCompleted?: boolean;
  onCompleteToggle?: (completed: boolean) => void;
}

export const LessonChallenge: React.FC<LessonChallengeProps> = (props) => {
  return <ChallengeSection {...props} />;
};

export default LessonChallenge;
