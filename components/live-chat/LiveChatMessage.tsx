import Image from "next/image";

import MessageAttachment from "./MessageAttachment";
import useChatStore from "@/app/chatStore";
import { ChatMessage } from "@/types/chatroom.index";

const LiveChatMessage = ({ message }: { message: ChatMessage }) => {
  const { chatroomUsers } = useChatStore();
  const {
    user: { id, image, username },
    text,
  } = message.data;
  const currentUserId = chatroomUsers[0].id;
  const messageStyles = {
    messageAlign:
      id === currentUserId
        ? "self-end flex-row-reverse"
        : "self-start flex-row",
    divStyles:
      id === currentUserId ? "bg-red-80 text-white" : "bg-red-10 text-red-80",
  };
  return (
    <li
      className={`${messageStyles.messageAlign} flex w-full gap-2.5 break-words`}
      key={id}
    >
      <figure className="flex h-10 max-h-[2.5rem] min-h-[2.5rem] w-10 min-w-[2.5rem] max-w-[2.5rem]">
        <Image
          src={image}
          alt={`Profile image for ${username}`}
          height={40}
          width={40}
          className="rounded-full"
        />
      </figure>
      <figure className="flex w-fit max-w-[250px] flex-col gap-2 break-words">
        <MessageAttachment message={message} />
        <figcaption
          className={`${
            messageStyles.divStyles
          } semibold-16 flex w-full rounded-lg p-3.5 ${!text && "hidden"}`}
        >
          {text}
        </figcaption>
      </figure>
    </li>
  );
};

export default LiveChatMessage;
