"use client";

import { useEffect, useRef, useReducer } from "react";

import usePodcastStore from "@/app/podcastStore";
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
    if (podcast) {
      dispatch({ type: "SET_PODCAST_USER_IMAGE", payload: podcast.image });
    }
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      togglePlay();
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      PodcastHooks.handlePlayCall({
        podcast,
        dispatch,
        isPlaying,
        audioRef,
        state,
      });
    }
  }, [isPlaying]);

  useEffect(() => {
    const audioElement = PodcastHooks.getAudioElement();

    const handleTimeUpdate = () => {
      const newTime = Math.floor(audioElement.currentTime);
      dispatch({ type: "SET_CURRENT_TIME", payload: newTime });
    };

    const handleLoadedMetadata = () => {
      dispatch({
        type: "SET_TOTAL_DURATION",
        payload: Math.floor(audioElement.duration),
      });
    };

    if (audioElement) {
      audioElement.addEventListener("timeupdate", handleTimeUpdate);
      audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
      audioElement.addEventListener("ended", handleAudioEnd);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
        audioElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
        audioElement.removeEventListener("ended", handleAudioEnd);
      }
    };
  }, []);

  const handleAudioEnd = () => {
    dispatch({ type: "RESET_PLAYER_SETTINGS" });
    togglePlay();
    PodcastHooks.handleStop(audioRef);
  };

  const handleCloseClick = () => {
    dispatch({ type: "RESET_PLAYER_SETTINGS" });
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
      dispatch,
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
      className={`bg-light_dark-3 fixed bottom-16 flex w-full items-center justify-between gap-2 px-5 py-1 transition duration-200 md:bottom-0 md:h-[4.5rem] md:py-0 ${
        !state.showPlayer && "translate-y-[4.5rem]"
      }`}
    >
      <PodcastComponents.PodcastBarImage
        id={state.id || id}
        podcastUserImage={state.podcastUserImage}
      />
      <section className="flex w-80 flex-col items-center self-center">
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
