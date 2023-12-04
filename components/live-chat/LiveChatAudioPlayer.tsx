import { useRef, useEffect, useState } from "react";
import Image from "next/image";

import { playButton, pauseButton } from "@/public/assets";
import { formatTime } from "@/utils";

const LiveChatAudioPlayer = ({
  songUrl,
  chatPage = false,
  currentUserMessage = false,
}: {
  songUrl: string;
  chatPage?: boolean;
  currentUserMessage?: boolean;
}) => {
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
  }, [audioRef, songUrl]);

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
    <div
      className={`flex-center mb-3 h-[3.125rem] w-[12rem] rounded-lg  ${
        currentUserMessage ? "bg-red-80" : "bg-red-10"
      } px-3 py-2.5`}
    >
      <div className="flex w-full justify-between gap-5">
        <button
          type="button"
          onClick={togglePlayPause}
          className="cursor-pointer rounded-full"
        >
          <Image
            src={isPlaying ? pauseButton : playButton}
            alt={isPlaying ? "Pause" : "Play"}
            height={30}
            width={30}
            className="rounded-full"
          />
        </button>
        <figure className="flex-center">
          <div
            className={`${
              isPlaying && "liveChatAudioAnimation"
            } flex-center max-h-[0.75rem] gap-[0.25rem]`}
          >
            {Array.from({ length: 10 }, (_, index) => (
              <span
                key={index}
                className={`${
                  isPlaying ? "liveChatAudioAnimation" : "h-3"
                }  w-0.5 max-w-[2px] rounded-[1px]  ${
                  currentUserMessage ? "bg-white" : "bg-red-80"
                }`}
              />
            ))}
          </div>
        </figure>
        <figure className="flex-center">
          <time className="semibold-14 text-white">{time}</time>
        </figure>
      </div>
    </div>
  );
};

export default LiveChatAudioPlayer;
