import React from 'react';
import { VideoSection } from './VideoSection';
import type { LessonVideo } from '../../data/lessonsData';

interface VideoLessonProps {
  video: LessonVideo;
  orderNumber?: string;
  onWatchedToggle?: (watched: boolean) => void;
  isWatched?: boolean;
}

export const VideoLesson: React.FC<VideoLessonProps> = (props) => {
  return <VideoSection {...props} />;
};

export default VideoLesson;
