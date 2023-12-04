import Link from "next/link";
import Image from "next/image";

import FillIcon from "../icons/fill-icons";
import LiveChatAudioPlayer from "./LiveChatAudioPlayer";
import { MessageAttachmentProps } from "@/types/chatroom.index";

const MessageAttachment = ({
  message,
  chatPage = false,
  currentUserMessage = false,
}: MessageAttachmentProps) => {
  if (!message.data.attachment) {
    return null;
  }

  const { attachmentType, attachment } = message.data;

  const imageAndVideoHeight = chatPage ? 600 : 250;
  const imageAndVideoWidth = chatPage ? 600 : 300;

  switch (attachmentType) {
    case "image":
      return (
        <Link
          href={attachment}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-fit cursor-pointer flex-col justify-center overflow-hidden"
        >
          <Image
            src={attachment}
            height={imageAndVideoHeight}
            width={imageAndVideoWidth}
            alt="Attachment"
            className={`${
              chatPage
                ? "max-h-[37.5rem] max-w-[31.6875rem]"
                : "max-h-80 max-w-[250px]"
            } w-full rounded-lg object-contain`}
          />
        </Link>
      );

    case "video":
      return (
        <video
          src={attachment}
          height={imageAndVideoHeight}
          width={imageAndVideoWidth}
          className={`${
            chatPage
              ? "max-h-[37.5rem] max-w-[37.5rem]"
              : "max-h-[15rem] max-w-[15rem]"
          }h-full w-full rounded-lg`}
          controls
        />
      );

    case "audio":
      return (
        <LiveChatAudioPlayer
          songUrl={attachment}
          currentUserMessage={currentUserMessage}
        />
      );

    case "document":
      return (
        <Link
          href={attachment}
          className={`flex-center mb-3  rounded-xl ${
            chatPage ? "h-60 w-60" : "h-40 w-40"
          } ${currentUserMessage ? "bg-red-80" : "bg-red-10"}`}
        >
          <FillIcon.Post
            className={`h-10 w-10 ${
              currentUserMessage ? "fill-white" : "fill-red-80"
            }`}
          />
        </Link>
      );

    default:
      return null;
  }
};

export default MessageAttachment;
