"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import usePodcastStore from "@/app/store";
import { formatPodcastDuration, getFromLocalStorage } from "@/utils";
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
  ImCross,
} from "react-icons/im";
import { christopher } from "@/public/assets";
import { getPodcastById } from "@/lib/actions/podcast.actions";

const PodcastPlayer = () => {
  const { isPlaying, togglePlay, songUrl, setSongUrl, podcast } =
    usePodcastStore();
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [showPlayer, setShowPlayer] = useState(false);
  const [showInfo, setShowInfo] = useState("");
  const [volume, setVolume] = useState([100]);
  const [podcastUserImage, setPodcastUserImage] = useState("");
  const [playbackSpeedIndex, setPlaybackSpeedIndex] = useState(1);
  const percentagePlayed = (currentTime / totalDuration) * 100;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { title, episodeNumber, id } = podcast || {};

  const handlePlayCall = () => {
    const audioElement = document.getElementById(
      "podcast-audio"
    ) as HTMLAudioElement;

    if (audioElement) {
      if (podcast !== null) {
        setPodcastUserImage(podcast.image);
        setShowInfo("#" + episodeNumber + " - " + title);
      }
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

    if (podcast) {
      setPodcastUserImage(podcast.image);
    }

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

      audioElement.addEventListener("ended", handleAudioEnd);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener("timeupdate", () => {});
        audioElement.removeEventListener("loadedmetadata", () => {});
        audioElement.removeEventListener("ended", handleAudioEnd);
      }
    };
  }, []);

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const handleAudioEnd = () => {
    togglePlay();
    setTimeout(() => {
      setShowPlayer(false);
    }, 1000);
  };

  const handleCloseClick = () => {
    setShowPlayer(false);
    handlePlayClick();
    handleStop();
  };

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

  const playbackSpeedOptions = [0.75, 1.0, 1.25, 1.5, 1.75, 2.0];

  const cyclePlaybackSpeed = () => {
    const nextIndex = (playbackSpeedIndex + 1) % playbackSpeedOptions.length;

    setPlaybackSpeedIndex(nextIndex);

    const newSpeed = playbackSpeedOptions[nextIndex];
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
    }
  };

  type savePodcastTypeProps = {
    isPlaying: boolean;
    currentTime: any;
    songUrl: string | undefined;
  };

  const savePodcastPlayerState = ({
    isPlaying,
    currentTime,
    songUrl,
  }: savePodcastTypeProps) => {
    try {
      const state = {
        isPlaying,
        currentTime,
        songUrl,
      };
      localStorage.setItem("podcastPlayerState", JSON.stringify(state));
    } catch (error) {
      console.error("Error saving podcast player state:", error);
    }
  };

  const getPodcastPlayerState = () => {
    const storedState = localStorage.getItem("podcastPlayerState");
    try {
      return storedState ? JSON.parse(storedState) : null;
    } catch (error) {
      console.error("Error parsing podcast player state:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchPodcast = async () => {
      if (podcast === null) {
        const podcastId = getFromLocalStorage("selectedPodcastId");
        if (podcastId) {
          const podcastUpdated = await getPodcastById(podcastId);
          if (podcastUpdated) {
            const { title, episodeNumber } = podcastUpdated;
            setShowInfo("#" + episodeNumber + " - " + title);
            setPodcastUserImage(podcastUpdated.image);
          }
        }
      }
    };

    fetchPodcast();

    const storedState = getPodcastPlayerState();
    const loadPodcastFromLocalStorage = () => {
      if (storedState) {
        const { currentTime, songUrl } = storedState;
        setSongUrl(songUrl);
        if (currentTime > 0) {
          setCurrentTime(currentTime);
          setShowPlayer(true);
        }
        if (audioRef.current && Number.isFinite(storedState.currentTime)) {
          audioRef.current.currentTime = storedState.currentTime;
        }
      }
    };

    loadPodcastFromLocalStorage();
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      savePodcastPlayerState({ isPlaying, currentTime, songUrl });
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [currentTime]);

  return (
    <div
      className={`bg-light_dark-3 fixed bottom-0 flex h-[4.5rem] w-full items-center justify-between gap-2 px-5 transition duration-200 ${
        !showPlayer && "translate-y-[4.5rem]"
      }`}
    >
      <Link href={`/podcasts/${id}`} className="min-h-[50px] min-w-[50px] ">
        <Image
          src={podcastUserImage || christopher}
          height={50}
          width={50}
          alt="christopher"
          className="rounded-full"
        />
      </Link>

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
          {!showInfo.includes("undefined") && (
            <p className="text-sc-1_light-2 text-xs">{showInfo}</p>
          )}
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
      <div className="flex cursor-pointer gap-3">
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
        <div
          className="text-sc-1_light-2 flex items-center"
          onClick={handleCloseClick}
        >
          <ImCross />
        </div>
      </div>
    </div>
  );
};

export default PodcastPlayer;
