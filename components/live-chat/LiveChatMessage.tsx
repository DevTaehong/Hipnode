import React from "react";
import Image from "next/image";

import MessageAttachment from "./MessageAttachment";
import useChatStore from "@/app/chatStore";
import { ChatMessage } from "@/types/chatroom.index";

const LiveChatMessage = ({ message }: { message: ChatMessage }) => {
  const { chatroomUsers } = useChatStore();
  const messageId = message.data.user.id;
  const imageSrc = message.data.user.image;
  const imageAlt = message.data.user.username;
  const currentUserId = chatroomUsers[0].id;
  const messageStyles = {
    messageAlign:
      messageId === currentUserId
        ? "self-end flex-row-reverse"
        : "self-start flex-row",
    divStyles:
      messageId === currentUserId
        ? "bg-red-80 text-white"
        : "bg-red-10 text-red-80",
  };
  const padding = message.data.attachment ? "p-0" : "p-3.5";
  const childPadding = message.data.attachment ? "p-3.5" : "p-0";
  return (
    <li
      className={`${messageStyles.messageAlign} flex w-full gap-2.5 break-words`}
      key={message.data.messageId}
    >
      <figure className="flex h-10 max-h-[2.5rem] min-h-[2.5rem] w-10 min-w-[2.5rem] max-w-[2.5rem]">
        <Image
          src={imageSrc}
          alt={`Profile image for ${imageAlt}`}
          height={40}
          width={40}
          className="rounded-full"
        />
      </figure>
      <figure className="flex max-w-[250px] flex-col gap-1 break-words">
        <MessageAttachment message={message} />
        <figcaption
          className={`${childPadding} ${messageStyles.divStyles} flex w-full rounded-lg`}
        >
          <p
            className={`semibold-16 ${messageStyles.divStyles} ${padding} rounded-lg`}
          >
            {message.data.text}
          </p>
        </figcaption>
      </figure>
    </li>
  );
};

export default LiveChatMessage;
