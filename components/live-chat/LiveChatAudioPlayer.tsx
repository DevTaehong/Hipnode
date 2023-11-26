import Image from "next/image";
import { useRef, useEffect, useState } from "react";

import { playButton, timerImage, pauseButton } from "@/public/assets";
import LiveChatAudioAnimation from "./LiveChatAudioAnimation";
import { formatTime } from "@/utils";

const LiveChatAudioPlayer = ({ songUrl }: { songUrl: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [displayTime, setDisplayTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const time = formatTime(displayTime);

  useEffect(() => {
    audioRef.current = new Audio(songUrl);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [songUrl]);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement !== null) {
      const handleMetadataLoaded = () => setDisplayTime(audioElement.duration);
      const handleTimeUpdate = () => setDisplayTime(audioElement.currentTime);
      const handleAudioEnd = () => setIsPlaying(false);

      audioElement.addEventListener("loadedmetadata", handleMetadataLoaded);
      audioElement.addEventListener("timeupdate", handleTimeUpdate);
      audioElement.addEventListener("ended", () => setIsPlaying(false));

      return () => {
        audioElement.removeEventListener(
          "loadedmetadata",
          handleMetadataLoaded
        );
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
        audioElement.removeEventListener("ended", handleAudioEnd);
      };
    }
  }, []);

  const togglePlayPause = () => {
    if (audioRef.current) {
      const audioElement = audioRef.current;
      if (isPlaying) {
        audioElement.pause();
        setIsPlaying(false);
      } else {
        audioElement.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="flex-center mb-3 h-[3.125rem] w-[12rem] rounded-lg bg-red-80 px-3 py-2.5">
      <div className="flex w-full justify-between gap-5">
        <div onClick={togglePlayPause} className="cursor-pointer rounded-full">
          <Image
            src={isPlaying ? pauseButton : playButton}
            alt={isPlaying ? "Pause" : "Play"}
            height={30}
            width={30}
            className="rounded-full"
          />
        </div>
        <figure className="flex-center">
          {isPlaying ? (
            <LiveChatAudioAnimation />
          ) : (
            <Image src={timerImage} alt="timer" height={24} width={65} />
          )}
        </figure>
        <figure className="flex-center">
          <time className="semibold-14 text-white">{time}</time>
        </figure>
      </div>
    </div>
  );
};

export default LiveChatAudioPlayer;
