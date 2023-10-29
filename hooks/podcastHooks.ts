import { RefObject } from "react";

import {
  savePodcastTypeProps,
  FetchPodcastProps,
  LoadPodcastProps,
  HandlePlayCallProps,
  HandleVolumeChangeProps,
  CyclePlaybackSpeedProps,
} from "@/types/podcast.index";

export const handleStop = (audioRef: RefObject<HTMLAudioElement>) => {
  if (audioRef?.current) {
    audioRef.current.currentTime = 0;
    audioRef.current.playbackRate = 1;
  }
};

export const cyclePlaybackSpeed = ({
  audioRef,
  playbackSpeedIndex,
}: CyclePlaybackSpeedProps) => {
  const playbackSpeedOptions = [0.75, 1.0, 1.25, 1.5];
  const newIndex = (playbackSpeedIndex + 1) % playbackSpeedOptions.length;
  if (audioRef && audioRef.current) {
    audioRef.current.playbackRate = playbackSpeedOptions[newIndex];
  }
  return newIndex;
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

export const fetchPodcast = async ({
  podcast,
  getFromLocalStorage,
  getPodcastById,
  dispatch,
}: FetchPodcastProps) => {
  if (podcast === null) {
    const podcastId = getFromLocalStorage("selectedPodcastId");
    const isSongPlaying = getFromLocalStorage("podcastPlayerState");
    if (podcastId) {
      const podcastUpdated = await getPodcastById(Number(podcastId));
      if (podcastUpdated) {
        dispatch({ type: "INITIALISE_PODCAST", payload: podcastUpdated });
        if (isSongPlaying.isPlaying) {
          dispatch({ type: "SET_SHOW_PLAYER", payload: true });
        }
      }
    }
  }
};

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
      dispatch({
        type: "UPDATE_PODCAST_INFO",
        payload: {
          image: podcast.image,
          showInfo: `#${podcast.episodeNumber} - ${podcast.title}`,
        },
      });
    }
    if (isPlaying) {
      audioElement.play();
      dispatch({ type: "SET_SHOW_PLAYER", payload: true });
    } else {
      dispatch({ type: "SET_PLAYBACK_SPEED_INDEX", payload: 1 });
    }
  }
};

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
