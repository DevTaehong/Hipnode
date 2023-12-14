import Image from "next/image";

import MessageAttachment from "../live-chat/MessageAttachment";
import MessageContent from "./MessageContent";
import useChatStore from "@/app/chatStore";
import { ChatMessage } from "@/types/chatroom.index";
import { formatChatBoxDate } from "@/utils";
import { isOnlyEmoji } from "../live-chat";

const ChatBoxMessage = ({ message }: { message: ChatMessage }) => {
  const { chatroomUsers } = useChatStore();

  const {
    data: {
      user: { username, image, id },
      messageId,
      createdAt,
      text,
    },
  } = message;

  const isStringSingleEmoji = text ? isOnlyEmoji(text) : false;

  const fontSize = isStringSingleEmoji ? "text-5xl" : "regular-16 ";

  const chatboxDate = createdAt ? formatChatBoxDate(createdAt) : "";

  const currentUserId = chatroomUsers[0].id;

  const isMessageFromCurrentUser = id === currentUserId;

  const calculateDivStyles = () => {
    if (isStringSingleEmoji) {
      return `bg-none p-1 ${isMessageFromCurrentUser ? "self-end" : ""}`;
    }
    return isMessageFromCurrentUser
      ? "bg-red-80 text-white self-end rounded-l-lg p-3.5"
      : "bg-red-10 text-red-80 rounded-r-lg p-3.5";
  };

  const messageAlign = isMessageFromCurrentUser
    ? "self-end flex-row-reverse"
    : "self-start flex-row";

  const displayName = id === currentUserId ? "You" : username;

  const messageHasAttachment = message.data.attachment;

  return (
    <li
      className={`${messageAlign} flex w-full gap-2.5 break-words`}
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
      <div className="flex max-w-full flex-col gap-1.5">
        <figure className="flex w-full max-w-[31.7rem] flex-col gap-2">
          <div
            className={`flex flex-col gap-1.5 ${
              messageHasAttachment
                ? isMessageFromCurrentUser
                  ? "w-fit self-end"
                  : "w-fit"
                : "w-auto"
            }`}
          >
            <div className="flex justify-between gap-2">
              <p className="semibold-16 text-sc-2_light-2">{displayName}</p>
              <p className="semibold-16 text-sc-4">{chatboxDate}</p>
            </div>
            <MessageAttachment
              message={message}
              chatPage={true}
              isMessageFromCurrentUser={isMessageFromCurrentUser}
            />
          </div>
          {text && (
            <MessageContent
              additionalStyles={calculateDivStyles()}
              text={text}
              fontSize={fontSize}
            />
          )}
        </figure>
      </div>
    </li>
  );
};

export default ChatBoxMessage;
