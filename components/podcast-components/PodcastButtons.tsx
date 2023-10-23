"use client";

import { useState, useRef, useEffect, MouseEvent } from "react";
import { Share2Icon } from "../icons/outline-icons";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";

import FillIcon from "../icons/fill-icons";
import PauseIcon from "../icons/outline-icons/PauseIcon";
import CustomButton from "../CustomButton";
import { formatPodcastDuration } from "@/utils";

const PodcastButtons = ({ url }: { url: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioDuration, setAudioDuration] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<string>("00:00");
  const [currentPlaybackPercentage, setCurrentPlaybackPercentage] =
    useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleProgressClick = (percentage: number | MouseEvent) => {
    if (audioRef.current) {
      if (typeof percentage === "number") {
        const newTime = (percentage / 100) * audioRef.current.duration;
        audioRef.current.currentTime = newTime;
      }
    }
  };

  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement) {
      audioElement.addEventListener("loadedmetadata", () => {
        const audioDuration = formatPodcastDuration(audioElement.duration);
        setAudioDuration(audioDuration);
      });

      audioElement.addEventListener("timeupdate", () => {
        const currentPlaybackTime = formatPodcastDuration(
          audioElement.currentTime
        );
        setCurrentTime(currentPlaybackTime);

        const percentage =
          (audioElement.currentTime / audioElement.duration) * 100;
        setCurrentPlaybackPercentage(percentage);
      });
    }
  }, []);

  const handleButtonClick = () => {
    const audioElement = audioRef.current;

    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const icon = isPlaying ? PauseIcon : FillIcon.Play;
  return (
    <>
      <div className="mb-2.5 flex w-full items-center gap-5 md:mb-4">
        <Progress
          value={currentPlaybackPercentage}
          onClick={(percentage) => handleProgressClick(percentage)}
        />
        <p className="regular-10 md:semibold-14 whitespace-nowrap text-sc-2 dark:text-light-2">
          {currentTime} {audioDuration && " | " + audioDuration}
        </p>
      </div>
      <div className="flex w-full items-center gap-3.5 md:gap-5">
        <audio ref={audioRef}>
          <source src={url} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <CustomButton
          label={isPlaying ? "Pause" : "Play"}
          icon={icon}
          className="semibold-14 md:regular-16 items-end rounded-[1.25rem] bg-blue px-4 py-2 text-light"
          onClick={handleButtonClick}
        />
        <Button
          size="icon"
          className="rounded-full border border-sc-2 dark:border-sc-3"
        >
          <Share2Icon />
        </Button>
      </div>
    </>
  );
};

export default PodcastButtons;
