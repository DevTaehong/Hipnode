import Image from "next/image";

import MessageAttachment from "../live-chat/MessageAttachment";
import useChatStore from "@/app/chatStore";
import { ChatMessage } from "@/types/chatroom.index";
import { formatChatBoxDate } from "@/utils";

const ChatBoxMessage = ({ message }: { message: ChatMessage }) => {
  const {
    data: {
      user: { username, image, id },
      createdAt,
    },
  } = message;

  const chatboxDate = createdAt ? formatChatBoxDate(createdAt) : "";
  const { chatroomUsers } = useChatStore();

  const userId = chatroomUsers[0].id;
  const currentUserId = chatroomUsers[0].id;
  const messageStyles = {
    messageAlign:
      id === currentUserId
        ? "self-end flex-row-reverse"
        : "self-start flex-row",
    divStyles:
      id === currentUserId
        ? "bg-red-80 text-white self-end"
        : "bg-red-10 text-red-80",
  };
  const hasAttachment = message.data.attachment;
  const padding = hasAttachment ? "p-0" : "p-3.5";
  const childPadding = hasAttachment ? "p-3.5" : "p-0";
  const displayName = id === currentUserId ? "You" : username;

  return (
    <li
      className={`${messageStyles.messageAlign} flex w-full gap-2.5 break-words`}
      key={message.data.messageId}
    >
      {userId !== id && (
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
        <figure className="flex max-w-[400px] flex-col gap-1 break-words">
          <MessageAttachment message={message} chatPage={true} />
          <figcaption
            className={`${childPadding} ${messageStyles.divStyles} flex w-fit rounded-lg`}
          >
            <p
              className={`regular-16 ${messageStyles.divStyles} ${padding} w-fit rounded-lg`}
            >
              {message.data.text}
            </p>
          </figcaption>
        </figure>
      </div>
    </li>
  );
};

export default ChatBoxMessage;
