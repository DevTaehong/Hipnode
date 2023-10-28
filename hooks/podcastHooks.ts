import React from "react";

import { Action } from "@/components/podcast-components/podcastReducer";
import { IPodcast, savePodcastTypeProps } from "@/types/podcast.index";

export const handleStop = (audioRef: React.RefObject<HTMLAudioElement>) => {
  if (audioRef?.current) {
    audioRef.current.currentTime = 0;
  }
};

export const cyclePlaybackSpeed = ({
  audioRef,
  playbackSpeedIndex,
}: {
  audioRef: React.RefObject<HTMLAudioElement>;
  playbackSpeedIndex: number;
}) => {
  const playbackSpeedOptions = [0.75, 1.0, 1.25, 1.5, 1.75, 2.0];
  const newIndex = (playbackSpeedIndex + 1) % playbackSpeedOptions.length;
  if (audioRef && audioRef.current) {
    audioRef.current.playbackRate = playbackSpeedOptions[newIndex];
  }
  return newIndex;
};

interface handleProgressClickProps {
  percentage: number | React.MouseEvent<HTMLDivElement, MouseEvent>;
  audioRef: any;
}

export const handleProgressClick = ({
  percentage,
  audioRef,
}: handleProgressClickProps) => {
  if (audioRef.current) {
    if (typeof percentage === "number") {
      const newTime = (percentage / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
    }
  }
};

export const getPodcastPlayerState = () => {
  const storedState = localStorage.getItem("podcastPlayerState");
  try {
    return storedState ? JSON.parse(storedState) : null;
  } catch (error) {
    console.error("Error parsing podcast player state:", error);
    return null;
  }
};

interface PodcastPlayerState {
  isPlaying: boolean;
  currentTime: number;
  songUrl: string;
}

interface FetchPodcastProps {
  podcast: IPodcast | null;
  getFromLocalStorage: (key: string) => PodcastPlayerState;
  getPodcastById: (id: number) => Promise<IPodcast | null>;
  setPodcastId: (id: number) => void;
  setShowInfo: (info: string) => void;
  setPodcastUserImage: (image: string) => void;
  setShowPlayer: (show: boolean) => void;
}

export const fetchPodcast = async ({
  podcast,
  getFromLocalStorage,
  getPodcastById,
  setPodcastId,
  setShowInfo,
  setPodcastUserImage,
  setShowPlayer,
}: FetchPodcastProps) => {
  if (podcast === null) {
    const podcastId = getFromLocalStorage("selectedPodcastId");
    const isSongPlaying = getFromLocalStorage("podcastPlayerState");
    if (podcastId) {
      const podcastUpdated = await getPodcastById(Number(podcastId));
      if (podcastUpdated) {
        const { title, episodeNumber, image, id } = podcastUpdated;
        console.log(typeof id);
        setShowInfo("#" + episodeNumber + " - " + title);
        setPodcastUserImage(image);
        setPodcastId(id);
        if (isSongPlaying.isPlaying) {
          setShowPlayer(true);
        }
      }
    }
  }
};

interface LoadPodcastProps {
  storedState: PodcastPlayerState | null;
  setSongUrl: (url: string) => void;
  setCurrentTime: (time: number) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

export const loadPodcastFromLocalStorage = ({
  storedState,
  setSongUrl,
  setCurrentTime,
  audioRef,
}: LoadPodcastProps) => {
  if (storedState) {
    const { currentTime, songUrl } = storedState;
    setSongUrl(songUrl);
    if (currentTime > 0) {
      setCurrentTime(currentTime);
    }
    if (audioRef.current && Number.isFinite(storedState.currentTime)) {
      audioRef.current.currentTime = storedState.currentTime;
    }
  }
};

export const savePodcastPlayerState = ({
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

interface HandlePlayCallProps {
  podcast: IPodcast | null;
  dispatch: React.Dispatch<Action>;
  isPlaying: boolean;
}

export const handlePlayCall = ({
  podcast,
  dispatch,
  isPlaying,
}: HandlePlayCallProps) => {
  const audioElement = document.getElementById(
    "podcast-audio"
  ) as HTMLAudioElement;
  if (audioElement) {
    if (podcast !== null) {
      dispatch({ type: "SET_PODCAST_USER_IMAGE", payload: podcast.image });
      dispatch({
        type: "SET_SHOW_INFO",
        payload: "#" + podcast.episodeNumber + " - " + podcast.title,
      });
    }
    if (isPlaying) {
      audioElement.play();
      dispatch({ type: "SET_SHOW_PLAYER", payload: true });
    }
  }
};

interface HandleVolumeChangeProps {
  newVolume: number[];
  audioRef: React.RefObject<HTMLAudioElement>;
  dispatch: React.Dispatch<Action>;
}

export const handleVolumeChange = ({
  newVolume,
  audioRef,
  dispatch,
}: HandleVolumeChangeProps) => {
  if (audioRef.current) {
    const volumeValue = newVolume[0] / 100;
    audioRef.current.volume = volumeValue;
    dispatch({ type: "SET_VOLUME", payload: newVolume });
  }
};
