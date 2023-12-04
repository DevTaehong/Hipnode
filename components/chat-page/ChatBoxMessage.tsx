import Image from "next/image";

import MessageAttachment from "../live-chat/MessageAttachment";
import useChatStore from "@/app/chatStore";
import { ChatMessage } from "@/types/chatroom.index";
import { formatChatBoxDate } from "@/utils";

const ChatBoxMessage = ({ message }: { message: ChatMessage }) => {
  const {
    data: {
      user: { username, image, id },
      messageId,
      createdAt,
      text,
    },
  } = message;

  const chatboxDate = createdAt ? formatChatBoxDate(createdAt) : "";
  const { chatroomUsers } = useChatStore();
  const currentUserId = chatroomUsers[0].id;
  const currentUserMessage = id === currentUserId;
  const messageStyles = {
    messageAlign: currentUserMessage
      ? "self-end flex-row-reverse"
      : "self-start flex-row",
    divStyles: currentUserMessage
      ? "bg-red-80 text-white self-end"
      : "bg-red-10 text-red-80",
  };
  const displayName = id === currentUserId ? "You" : username;

  return (
    <li
      className={`${messageStyles.messageAlign} flex w-full gap-2.5 break-words`}
      key={messageId}
    >
      {currentUserId !== id && (
        <figure className="flex h-10 max-h-[2.5rem] min-h-[2.5rem] w-10 min-w-[2.5rem] max-w-[2.5rem]">
          <Image
            src={image}
            alt={`Profile image for ${username}`}
            height={40}
            width={40}
            className="rounded-full"
          />
        </figure>
      )}
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between gap-2">
          <p className="semibold-16 text-sc-2_light-2">{displayName}</p>
          <p className="semibold-16 text-sc-4">{chatboxDate}</p>
        </div>
        <figure className="flex w-full max-w-[31.7rem] flex-col gap-2 break-words">
          <MessageAttachment
            message={message}
            chatPage={true}
            currentUserMessage={currentUserMessage}
          />
          <figcaption
            className={`${
              messageStyles.divStyles
            } regular-16 flex w-fit rounded-lg p-3.5 ${!text && "hidden"}`}
          >
            {text}
          </figcaption>
        </figure>
      </div>
    </li>
  );
};

export default ChatBoxMessage;
