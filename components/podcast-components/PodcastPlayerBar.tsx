import { christopher } from "@/public/assets";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "../ui/hover-card";
import { Progress } from "../ui/progress";
import { Slider } from "../ui/slider";
import Image from "next/image";
import React from "react";
import FillIcon from "../icons/fill-icons";
import PauseIcon from "../icons/outline-icons/PauseIcon";

const PodcastPlayerBar = ({
  title,
  formattedLength,
  formattedTime,
  showPlayer,
  image,
  songUrl,
  audioRef,
  handlePlayClick,
  isPlaying,
  episodeNumber,
  cyclePlaybackSpeed,
  playbackSpeedOptions,
  playbackSpeedIndex,
  percentagePlayed,
  handleProgressClick,
  handleVolumeIconClick,
  getVolumeIcon,
  volume,
  handleVolumeChange,
}) => {
  return (
    <div
      className={`bg-light_dark-3 fixed bottom-0 flex h-[4.5rem] w-full items-center justify-between gap-2 px-5 transition duration-200 ${
        !showPlayer && "translate-y-[4.5rem]"
      }`}
    >
      <div className="min-h-[50px] min-w-[50px] ">
        <Image
          src={image || christopher}
          height={50}
          width={50}
          alt="christopher"
          className="rounded-full"
        />
      </div>

      <div className="flex w-80 flex-col items-center">
        <div className="flex gap-2">
          <audio id="podcast-audio" src={songUrl} ref={audioRef}>
            <a href={songUrl}> play song </a>
          </audio>
          <div
            onClick={handlePlayClick}
            className="flex-center cursor-pointer pl-2 pt-1"
          >
            {isPlaying ? (
              <PauseIcon fillColor="fill-sc-1 dark:fill-white" />
            ) : (
              <FillIcon.Play className="fill-sc-1 dark:fill-white" />
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sc-1_light-2 text-xs">
            #{episodeNumber} - {title}
          </p>
          <button
            onClick={cyclePlaybackSpeed}
            className="text-sc-1_light-2 text-sm"
          >
            {playbackSpeedOptions[playbackSpeedIndex]}x
          </button>
        </div>
        <div className="flex w-full max-w-[20rem] items-center gap-3">
          <p className="text-sc-1_light-2 text-xs">{formattedTime}</p>
          <Progress
            value={percentagePlayed}
            onClick={(percentage) => handleProgressClick(percentage)}
          />
          <p className="text-sc-1_light-2 text-xs">{formattedLength}</p>
        </div>
      </div>
      <div className="flex cursor-pointer gap-2">
        <HoverCard openDelay={100} closeDelay={500}>
          <HoverCardTrigger>
            <div
              className="text-sc-1_light-2 text-2xl"
              onClick={handleVolumeIconClick}
            >
              {getVolumeIcon(volume)}
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="-translate-y-4">
            <Slider
              orientation="vertical"
              defaultValue={volume}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
            />{" "}
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
};

export default PodcastPlayerBar;
