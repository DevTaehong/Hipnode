import React, { useEffect, useRef } from "react";
import Image from "next/image";
import useChatStore from "@/app/chatStore";
import { ChatMessage } from "@/types/chatroom.index";
import { christopher } from "@/public/assets";
import OutlineIcon from "../icons/outline-icons";

const LiveChatMessageList = ({ messages }: { messages: ChatMessage[] }) => {
  const { chatroomUsers, setShowChat } = useChatStore();

  let secondUserUsername = "";
  let secondUserPicture;

  if (chatroomUsers[1]) {
    secondUserUsername = chatroomUsers[1].username;
    secondUserPicture = chatroomUsers[1].picture;
  }

  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <div className="flex w-full items-center justify-between border-b border-sc-6 p-4 dark:border-sc-2">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10">
            <Image
              src={secondUserPicture || christopher}
              alt={`image of ${secondUserUsername}`}
              height={40}
              width={40}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <p className="base-14 md:base-18 text-sc-2_light-2">
              {secondUserUsername}
            </p>
            <p className="semibold-9 md:semibold-10 text-green">Online</p>
          </div>
        </div>
        <div className="flex cursor-pointer" onClick={() => setShowChat(false)}>
          <OutlineIcon.ArrowLargeDown className="stroke-sc-2 dark:stroke-light-2" />
        </div>
      </div>
      <div className="flex h-full w-full flex-col gap-5 overflow-y-scroll p-5">
        {messages.map((message: ChatMessage) => {
          const messageId = parseInt(message.data.user.id);
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
          return (
            <div
              className={`${messageStyles.messageAlign} flex w-full gap-2.5 break-words`}
              key={message.data.text}
            >
              <div className="flex h-10 max-h-[2.5rem] min-h-[2.5rem] w-10 min-w-[2.5rem] max-w-[2.5rem]">
                <Image
                  src={imageSrc}
                  alt={`Profile image for ${imageAlt}`}
                  height={40}
                  width={40}
                  className="rounded-full"
                />
              </div>
              <div
                className={`${messageStyles.divStyles} flex-center semibold-16 break-words rounded-lg p-3.5`}
              >
                <p>{message.data.text}</p>
              </div>
            </div>
          );
        })}
        <div ref={endOfMessagesRef} />
      </div>
    </>
  );
};

export default LiveChatMessageList;
