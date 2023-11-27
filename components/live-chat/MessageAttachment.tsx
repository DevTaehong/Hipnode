import Link from "next/link";
import Image from "next/image";

import FillIcon from "../icons/fill-icons";
import LiveChatAudioPlayer from "./LiveChatAudioPlayer";
import { ChatMessage } from "@/types/chatroom.index";

const MessageAttachment = ({ message }: { message: ChatMessage }) => {
  if (!message.data.attachment) {
    return null;
  }

  const { attachmentType, attachment } = message.data;

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
            height={250}
            width={250}
            alt="Attachment"
            className="max-h-80 max-w-[250px] rounded-lg object-contain"
          />
        </Link>
      );

    case "video":
      return (
        <video
          src={attachment}
          height={250}
          width={250}
          className="h-full max-h-[15rem] w-fit max-w-[15rem] rounded-lg"
          controls
        />
      );

    case "audio":
      return <LiveChatAudioPlayer songUrl={attachment} />;

    case "document":
      return (
        <Link
          href={attachment}
          className="flex-center mb-3 h-40 w-40 rounded-xl bg-red-80"
        >
          <FillIcon.Post className="h-10 w-10 fill-white" />
        </Link>
      );

    default:
      return null;
  }
};

export default MessageAttachment;
