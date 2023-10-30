import FillIcon from "../icons/fill-icons";
import PauseIcon from "../icons/outline-icons/PauseIcon";
import { PodcastBarPlayButtonProps } from "@/types/podcast.index";

const renderIcon = (isPlaying: boolean) => {
  if (isPlaying) {
    return <PauseIcon className="fill-sc-1 dark:fill-white" />;
  }
  return <FillIcon.Play className="fill-sc-1 dark:fill-white" />;
};

const PodcastBarPlayButton = ({
  songUrl,
  audioRef,
  handlePlayClick,
  isPlaying,
}: PodcastBarPlayButtonProps) => {
  return (
    <div className="flex gap-2">
      <audio id="podcast-audio" src={songUrl} ref={audioRef}>
        <a href={songUrl}> play song </a>
      </audio>
      <div
        onClick={handlePlayClick}
        className="flex-center cursor-pointer pl-2 pt-1"
      >
        {renderIcon(isPlaying)}
      </div>
    </div>
  );
};

export default PodcastBarPlayButton;
