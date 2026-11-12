import React from 'react';
import { GoalSection } from './GoalSection';

interface SpeakingGoalSectionProps {
  orderNumber?: string;
  presetGoals?: string[];
  initialSelectedGoal?: string;
  initialCustomGoal?: string;
  isCompleted?: boolean;
  onCompleteModule?: (selectedGoal: string, customGoal: string) => void;
}

export const SpeakingGoalSection: React.FC<SpeakingGoalSectionProps> = ({
  orderNumber,
  presetGoals,
  initialSelectedGoal,
  initialCustomGoal,
  isCompleted,
  onCompleteModule,
}) => {
  return (
    <GoalSection
      orderNumber={orderNumber}
      presetGoals={presetGoals}
      initialSelectedGoal={initialSelectedGoal}
      initialCustomGoal={initialCustomGoal}
      isCompleted={isCompleted}
      onCompleteLesson={onCompleteModule}
    />
  );
};

export default SpeakingGoalSection;
