import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { usePresence } from "ably/react";
import useChatStore from "@/app/chatStore";
import Link from "next/link";

import { ChatMessage } from "@/types/chatroom.index";
import { christopher } from "@/public/assets";
import OutlineIcon from "../icons/outline-icons";

const LiveChatMessageList = ({ messages }: { messages: ChatMessage[] }) => {
  const { chatroomUsers, setShowChat, chatroomId } = useChatStore();

  let secondUserUsername = "";
  let secondUserPicture;
  let secondUserId: number | null = null;

  if (chatroomUsers[1]) {
    secondUserUsername = chatroomUsers[1].username;
    secondUserPicture = chatroomUsers[1].image;
    secondUserId = chatroomUsers[1].id;
  }

  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const { presenceData } = usePresence("hipnode-livechat");

  const isSecondUserOnline = presenceData.some(
    (presence) => presence.data && presence.data.id === secondUserId
  );

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const onlineStatus = isSecondUserOnline ? (
    <p className="semibold-9 md:semibold-10 text-green">Online</p>
  ) : (
    <p className="semibold-9 md:semibold-10 text-slate-400">Offline</p>
  );

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
            {onlineStatus}
          </div>
        </div>
        <div className="flex cursor-pointer" onClick={() => setShowChat(false)}>
          <OutlineIcon.ArrowLargeDown className="stroke-sc-2 dark:stroke-light-2" />
        </div>
      </div>
      <div className="flex h-full w-full flex-col gap-5 overflow-y-scroll px-5 pt-5">
        {chatroomId === null ? (
          <p>Loading</p>
        ) : (
          messages.map((message: ChatMessage) => {
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
            const padding = message.data.attachment ? "p-0" : "p-3.5";
            const childPadding = message.data.attachment ? "p-3.5" : "p-0";
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
                  className={`${messageStyles.divStyles} ${padding} flex max-w-[250px] flex-col break-words rounded-lg`}
                >
                  {message.data.attachment && (
                    <Link
                      href={message.data.attachment}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full cursor-pointer flex-col justify-center overflow-hidden"
                    >
                      <Image
                        src={message.data.attachment}
                        height={250}
                        width={250}
                        alt="Attachment"
                        className="max-h-80 max-w-[250px] rounded-t-lg object-contain"
                      />
                      {/* <div className="flex-center h-4 w-full -translate-y-4 overflow-hidden bg-red-80/50 text-sm">
                        <p className="max-w-full truncate text-white">
                          {message.data.attachment}
                        </p>
                      </div> */}
                    </Link>
                  )}
                  <div className={`${childPadding} flex w-full`}>
                    <p className="semibold-16">{message.data.text}</p>
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={endOfMessagesRef} />
      </div>
    </>
  );
};

export default LiveChatMessageList;
