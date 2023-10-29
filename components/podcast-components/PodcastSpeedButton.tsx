import { cyclePlaybackSpeed } from "@/hooks/podcastHooks";
import {
  PodcastSpeedButtonProps,
  playbackSpeedOptions,
} from "@/types/podcast.index";

const PodcastSpeedButton = ({
  showInfo,
  audioRef,
  playbackSpeedIndex,
  dispatch,
}: PodcastSpeedButtonProps) => {
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
