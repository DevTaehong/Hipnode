"use client";

import React, { useEffect, useRef, useReducer } from "react";

import usePodcastStore from "@/app/store";
import { getFromLocalStorage } from "@/utils";
import { getPodcastById } from "@/lib/actions/podcast.actions";
import * as PodcastHooks from "@/hooks/podcastHooks";
import * as PodcastComponents from "./index";
import * as podcastReducer from "./podcastReducer";

const PodcastPlayer = () => {
  const [state, dispatch] = useReducer(
    podcastReducer.reducer,
    podcastReducer.initialState
  );
  const { isPlaying, togglePlay, songUrl, setSongUrl, podcast } =
    usePodcastStore();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { id } = podcast || {};

  const handlePlayClick = () => {
    const audioElement = document.getElementById(
      "podcast-audio"
    ) as HTMLAudioElement;

    if (podcast) {
      dispatch({ type: "SET_PODCAST_USER_IMAGE", payload: podcast.image });
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
      PodcastHooks.handlePlayCall({
        podcast,
        dispatch,
        isPlaying,
      });
    }
  }, [isPlaying, setSongUrl]);

  useEffect(() => {
    const audioElement = document.getElementById(
      "podcast-audio"
    ) as HTMLAudioElement;

    if (audioElement) {
      audioElement.addEventListener("timeupdate", () => {
        const newTime = Math.floor(audioElement.currentTime);
        dispatch({ type: "SET_CURRENT_TIME", payload: newTime });
      });

      audioElement.addEventListener("loadedmetadata", () => {
        dispatch({
          type: "SET_TOTAL_DURATION",
          payload: Math.floor(audioElement.duration),
        });
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

  const handleAudioEnd = () => {
    togglePlay();
    setTimeout(() => {
      dispatch({ type: "SET_SHOW_PLAYER", payload: false });
    }, 1000);
  };

  const handleCloseClick = () => {
    dispatch({ type: "SET_SHOW_PLAYER", payload: false });
    if (isPlaying) {
      handlePlayClick();
    }
    PodcastHooks.handleStop(audioRef);
  };

  const handleVolumeIconClick = () => {
    if (state.volume[0] > 0) {
      PodcastHooks.handleVolumeChange({
        newVolume: [0],
        audioRef,
        dispatch,
      });
    } else {
      PodcastHooks.handleVolumeChange({
        newVolume: [75],
        audioRef,
        dispatch,
      });
    }
  };

  useEffect(() => {
    PodcastHooks.fetchPodcast({
      podcast,
      getFromLocalStorage,
      getPodcastById,
      setShowInfo: (value: string) =>
        dispatch({ type: "SET_SHOW_INFO", payload: value }),
      setPodcastUserImage: (value: string) =>
        dispatch({ type: "SET_PODCAST_USER_IMAGE", payload: value }),
      setShowPlayer: (value: boolean) =>
        dispatch({ type: "SET_SHOW_PLAYER", payload: value }),
      setPodcastId: (value: number) =>
        dispatch({ type: "SET_PODCAST_ID", payload: value }),
    });
    const storedState = PodcastHooks.getPodcastPlayerState();
    PodcastHooks.loadPodcastFromLocalStorage({
      storedState,
      setSongUrl,
      setCurrentTime: (time: number) =>
        dispatch({ type: "SET_CURRENT_TIME", payload: time }),
      audioRef,
    });
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      PodcastHooks.savePodcastPlayerState({
        isPlaying,
        currentTime: state.currentTime,
        songUrl,
      });
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [state.currentTime]);

  return (
    <footer
      className={`bg-light_dark-3 fixed bottom-0 flex h-[4.5rem] w-full items-center justify-between gap-2 px-5 transition duration-200 ${
        !state.showPlayer && "translate-y-[4.5rem]"
      }`}
    >
      <PodcastComponents.PodcastBarImage
        id={state.id || id}
        podcastUserImage={state.podcastUserImage}
      />
      <section className="flex w-80 flex-col items-center">
        <PodcastComponents.PodcastBarPlayButton
          songUrl={songUrl}
          audioRef={audioRef}
          handlePlayClick={handlePlayClick}
          isPlaying={isPlaying}
        />
        <PodcastComponents.PodcastSpeedButton
          showInfo={state.showInfo}
          audioRef={audioRef}
          playbackSpeedIndex={state.playbackSpeedIndex}
          dispatch={dispatch}
        />
        <PodcastComponents.PodcastProgressBar
          currentTime={state.currentTime}
          totalDuration={state.totalDuration}
          audioRef={audioRef}
        />
      </section>
      <PodcastComponents.PodcastBarVolumeControl
        handleVolumeChange={PodcastHooks.handleVolumeChange}
        handleVolumeIconClick={handleVolumeIconClick}
        handleCloseClick={handleCloseClick}
        volume={state.volume}
        audioRef={audioRef}
        dispatch={dispatch}
      />
    </footer>
  );
};

export default PodcastPlayer;
