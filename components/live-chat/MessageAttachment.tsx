import Link from "next/link";
import Image from "next/image";

import FillIcon from "../icons/fill-icons";
import LiveChatAudioPlayer from "./LiveChatAudioPlayer";
import { ChatMessage } from "@/types/chatroom.index";

const MessageAttachment = ({ message }: { message: ChatMessage }) => {
  if (!message.data.attachment) {
    return null;
  }
  const { attachmentType } = message.data;
  const attachmentUrl = message.data.attachment;

  if (attachmentType === "image") {
    return (
      <Link
        href={attachmentUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full cursor-pointer flex-col justify-center overflow-hidden"
      >
        <Image
          src={attachmentUrl}
          height={250}
          width={250}
          alt="Attachment"
          className="max-h-80 max-w-[250px] rounded-lg object-contain"
        />
      </Link>
    );
  } else if (attachmentType === "video") {
    return (
      <video
        src={attachmentUrl}
        height={250}
        width={250}
        className="h-full max-h-[15rem] w-fit max-w-[15rem] rounded-lg"
        controls
      />
    );
  } else if (attachmentType === "audio") {
    return <LiveChatAudioPlayer songUrl={attachmentUrl} />;
  } else if (attachmentType === "document") {
    return (
      <Link
        href={attachmentUrl}
        className="flex-center mb-3 h-40 w-40 rounded-xl bg-red-80"
      >
        <FillIcon.Post className="h-10 w-10 fill-white" />
      </Link>
    );
  }
};

export default MessageAttachment;
