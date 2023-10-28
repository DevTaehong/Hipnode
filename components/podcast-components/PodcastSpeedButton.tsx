import React from "react";

import { cyclePlaybackSpeed } from "@/hooks/podcastHooks";
import { Action } from "./podcastReducer";

interface PodcastSpeedButtonProps {
  showInfo: string;
  audioRef: React.RefObject<HTMLAudioElement>;
  playbackSpeedIndex: number;
  dispatch: React.Dispatch<Action>;
}
const PodcastSpeedButton = ({
  showInfo,
  audioRef,
  playbackSpeedIndex,
  dispatch,
}: PodcastSpeedButtonProps) => {
  const playbackSpeedOptions = [0.75, 1.0, 1.25, 1.5, 1.75, 2.0];

  const handlePlaybackSpeedCycle = () => {
    const newIndex = cyclePlaybackSpeed({ audioRef, playbackSpeedIndex });
    dispatch({ type: "SET_PLAYBACK_SPEED_INDEX", payload: newIndex });
  };

  return (
    <div className="flex items-center gap-2">
      {!showInfo.includes("undefined") && (
        <p className="text-sc-1_light-2 text-xs">{showInfo}</p>
      )}
      <button
        onClick={handlePlaybackSpeedCycle}
        className="text-sc-1_light-2 text-sm"
      >
        {playbackSpeedOptions[playbackSpeedIndex]}x
      </button>
    </div>
  );
};

export default PodcastSpeedButton;
