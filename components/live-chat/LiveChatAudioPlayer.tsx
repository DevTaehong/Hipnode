import Image from "next/image";

import { playButton, timerImage, pauseButton } from "@/public/assets";
import LiveChatAudioAnimation from "./LiveChatAudioAnimation";
import { formatTime } from "@/utils";
import { LiveChatAudioPlayerProps } from "@/types/chatroom.index";

const LiveChatAudioPlayer = ({
  displayTime,
  isPlaying,
  togglePlayPause,
}: LiveChatAudioPlayerProps) => {
  const time = formatTime(displayTime);

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
