import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { CiFolderOn } from "react-icons/ci";

import FillIcon from "../icons/fill-icons";
import LiveChatAudioPlayer from "./LiveChatAudioPlayer";
import { ImagePreviewProps } from "@/types/chatroom.index";

const ImagePreview = ({
  setImagePreview,
  setDroppedFile,
  imagePreview,
  mediaType,
}: ImagePreviewProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [displayTime, setDisplayTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (mediaType === "audio") {
      audioRef.current = new Audio(imagePreview);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [imagePreview, mediaType]);

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
    <figure className="relative flex w-fit">
      <button
        className={`flex-center absolute right-0 top-0 h-5 w-5 bg-white/80 ${
          mediaType === "audio" ? "-right-5 -top-3" : "right-0 top-0"
        }`}
      >
        <IoClose
          className="z-10 cursor-pointer text-[20px]"
          onClick={() => {
            setImagePreview(null);
            setDroppedFile(null);
            setIsPlaying(false);
          }}
        />
      </button>
      {mediaType === "image" && (
        <Image
          src={imagePreview}
          height={250}
          width={250}
          className="mb-3"
          alt="Image preview"
        />
      )}
      {mediaType === "video" && (
        <video
          src={imagePreview}
          height={250}
          width={250}
          className="mb-3 h-full max-h-[15rem] w-fit max-w-[18rem]"
          controls
        />
      )}
      {mediaType === "audio" && (
        <LiveChatAudioPlayer
          displayTime={displayTime}
          togglePlayPause={togglePlayPause}
          isPlaying={isPlaying}
        />
      )}
      {mediaType === "document" && (
        <div className="flex-center mb-3 h-40 w-40 rounded-xl bg-red-60">
          <FillIcon.Post className="h-10 w-10 fill-white" />
        </div>
      )}
      {mediaType === "folder" && (
        <div className="flex-center mb-3 h-40 w-40 rounded-xl bg-red-60">
          <CiFolderOn className="text-[50px] text-white" />
        </div>
      )}
    </figure>
  );
};

export default ImagePreview;
