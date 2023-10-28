import React from "react";

import { formatPodcastDuration } from "@/utils";
import { Progress } from "../ui/progress";

const handleProgressClick = (
  audioRef: any,
  percentage: number | React.MouseEvent<HTMLDivElement, MouseEvent>
) => {
  if (audioRef.current) {
    if (typeof percentage === "number") {
      const newTime = (percentage / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
    }
  }
};

interface PodcastProgressBarProps {
  currentTime: number;
  totalDuration: number;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const PodcastProgressBar = ({
  currentTime,
  totalDuration,
  audioRef,
}: PodcastProgressBarProps) => {
  const percentagePlayed = (currentTime / totalDuration) * 100;
  const formattedTime = formatPodcastDuration(currentTime);
  const formattedLength = formatPodcastDuration(totalDuration);

  return (
    <div className="flex w-full max-w-[20rem] items-center gap-3">
      <p className="text-sc-1_light-2 text-xs">{formattedTime}</p>
      <Progress
        value={percentagePlayed}
        onClick={(percentage) => handleProgressClick(audioRef, percentage)}
      />
      <p className="text-sc-1_light-2 text-xs">{formattedLength}</p>
    </div>
  );
};

export default PodcastProgressBar;
