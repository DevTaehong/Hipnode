"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import usePodcastStore from "@/app/store";
import { formatPodcastDuration } from "@/utils";
import { Progress } from "../ui/progress";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "../ui/hover-card";
import { Slider } from "../ui/slider";
import FillIcon from "../icons/fill-icons";
import PauseIcon from "../icons/outline-icons/PauseIcon";
import {
  ImVolumeLow,
  ImVolumeMedium,
  ImVolumeMute2,
  ImVolumeHigh,
} from "react-icons/im";
import { christopher } from "@/public/assets";

const PodcastPlayer = () => {
  const { isPlaying, togglePlay, songUrl, setSongUrl, podcast } =
    usePodcastStore();
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [showPlayer, setShowPlayer] = useState(false);
  const [volume, setVolume] = useState([100]);
  const percentagePlayed = (currentTime / totalDuration) * 100;
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { title, image, episodeNumber } = podcast || {};

  const handlePlayCall = () => {
    const audioElement = document.getElementById(
      "podcast-audio"
    ) as HTMLAudioElement;

    if (audioElement) {
      if (isPlaying) {
        audioElement.play();
        setShowPlayer(true);
      }
    }
  };

  const handlePlayClick = () => {
    const audioElement = document.getElementById(
      "podcast-audio"
    ) as HTMLAudioElement;

    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play();
      }
      togglePlay();
    }
  };

  useEffect(() => {
    if (isPlaying) {
      handlePlayCall();
    }
  }, [isPlaying, setSongUrl]);

  useEffect(() => {
    const audioElement = document.getElementById(
      "podcast-audio"
    ) as HTMLAudioElement;

    if (audioElement) {
      audioElement.addEventListener("timeupdate", () => {
        const newTime = Math.floor(audioElement.currentTime);
        setCurrentTime(newTime);
      });

      audioElement.addEventListener("loadedmetadata", () => {
        setTotalDuration(Math.floor(audioElement.duration));
      });
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener("timeupdate", () => {});
        audioElement.removeEventListener("loadedmetadata", () => {});
      }
    };
  }, []);

  const getVolumeIcon = (volumeValues: number[]) => {
    const volumeValue = volumeValues[0];
    if (volumeValue === 0) {
      return <ImVolumeMute2 />;
    } else if (volumeValue >= 1 && volumeValue <= 33) {
      return <ImVolumeLow />;
    } else if (volumeValue > 33 && volumeValue <= 66) {
      return <ImVolumeMedium />;
    } else {
      return <ImVolumeHigh />;
    }
  };

  const handleProgressClick = (
    percentage: number | React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (audioRef.current) {
      if (typeof percentage === "number") {
        const newTime = (percentage / 100) * audioRef.current.duration;
        audioRef.current.currentTime = newTime;
      }
    }
  };

  const handleVolumeChange = (newVolume: number[]) => {
    if (audioRef.current) {
      const volumeValue = newVolume[0] / 100;
      audioRef.current.volume = volumeValue;
      setVolume(newVolume);
    }
  };

  const formattedTime = formatPodcastDuration(currentTime);
  const formattedLength = formatPodcastDuration(totalDuration);

  const handleVolumeIconClick = () => {
    if (volume[0] > 0) {
      handleVolumeChange([0]);
    } else {
      handleVolumeChange([75]);
    }
  };

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
        <div className="flex">
          <p className="text-sc-1_light-2 mt-1 text-xs">
            #{episodeNumber} - {title}
          </p>
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

export default PodcastPlayer;
