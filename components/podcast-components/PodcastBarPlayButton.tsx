import { IoIosPlay } from "react-icons/io";
import { IoPause } from "react-icons/io5";

import { PodcastBarPlayButtonProps } from "@/types/podcast.index";

const renderIcon = (isPlaying: boolean) => {
  if (isPlaying) {
    return (
      <p className="fill-sc-1 text-lg md:text-2xl dark:fill-white">
        <IoPause />
      </p>
    );
  }
  return (
    <p className="fill-sc-1 text-lg md:text-2xl dark:fill-white">
      <IoIosPlay />
    </p>
  );
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
      <div onClick={handlePlayClick} className="flex-center cursor-pointer">
        {renderIcon(isPlaying)}
      </div>
    </div>
  );
};

export default PodcastBarPlayButton;
