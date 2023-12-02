import Link from "next/link";
import Image from "next/image";

import FillIcon from "../icons/fill-icons";
import LiveChatAudioPlayer from "./LiveChatAudioPlayer";
import { ChatMessage } from "@/types/chatroom.index";

const MessageAttachment = ({
  message,
  chatPage = false,
}: {
  message: ChatMessage;
  chatPage?: boolean;
}) => {
  if (!message.data.attachment) {
    return null;
  }

  const { attachmentType, attachment } = message.data;

  const imageAndVideoDims = chatPage ? 507 : 250;

  switch (attachmentType) {
    case "image":
      return (
        <Link
          href={attachment}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full cursor-pointer flex-col justify-center overflow-hidden"
        >
          <Image
            src={attachment}
            height={imageAndVideoDims}
            width={imageAndVideoDims}
            alt="Attachment"
            className={`${
              chatPage
                ? "max-h-[31.6875rem] max-w-[31.6875rem]"
                : "max-h-80 max-w-[250px]"
            } rounded-lg object-contain`}
          />
        </Link>
      );

    case "video":
      return (
        <video
          src={attachment}
          height={imageAndVideoDims}
          width={imageAndVideoDims}
          className={`${
            chatPage
              ? "max-h-[31.6875rem] max-w-[31.6875rem]"
              : "max-h-[15rem] max-w-[15rem]"
          }h-full  w-fit  rounded-lg`}
          controls
        />
      );

    case "audio":
      return <LiveChatAudioPlayer songUrl={attachment} chatPage={chatPage} />;

    case "document":
      return (
        <Link
          href={attachment}
          className={`flex-center mb-3  rounded-xl bg-red-80 ${
            chatPage ? "h-60 w-60" : "h-40 w-40"
          }`}
        >
          <FillIcon.Post className="h-10 w-10 fill-white" />
        </Link>
      );

    default:
      return null;
  }
};

export default MessageAttachment;
