import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { usePresence } from "ably/react";

import useChatStore from "@/app/chatStore";
import { ChatMessage } from "@/types/chatroom.index";
import { christopher } from "@/public/assets";
import OutlineIcon from "../icons/outline-icons";
import LiveChatMessage from "./LiveChatMessage";

const LiveChatMessageList = React.memo(
  ({ messages }: { messages: ChatMessage[] }) => {
    const { chatroomUsers, setShowChat, chatroomId } = useChatStore();

    const [secondUser] = chatroomUsers.slice(1, 2);
    const {
      username: secondUserUsername = "",
      image: secondUserPicture = christopher,
      id: secondUserId = null,
    } = secondUser ?? {};

    const endOfMessagesRef = useRef<HTMLDivElement>(null);

    const { presenceData } = usePresence("hipnode-livechat");

    const isSecondUserOnline = presenceData.some(
      (presence) => presence.data && presence.data.id === secondUserId
    );

    useEffect(() => {
      if (endOfMessagesRef.current) {
        endOfMessagesRef.current.scrollIntoView();
      }
    }, [messages]);

    const onlineStatus = isSecondUserOnline ? (
      <p className="semibold-9 md:semibold-10 text-green">Online</p>
    ) : (
      <p className="semibold-9 md:semibold-10 text-slate-400">Offline</p>
    );

    return (
      <>
        <section className="flex w-full items-center justify-between border-b border-sc-6 p-4 dark:border-sc-2">
          <figure className="flex items-center gap-2.5">
            <Image
              src={secondUserPicture}
              alt={`image of ${secondUserUsername}`}
              height={40}
              width={40}
              className="h-10 w-10 shrink-0 rounded-full"
            />
            <figcaption className="flex flex-col">
              <p className="base-14 md:base-18 text-sc-2_light-2">
                {secondUserUsername}
              </p>
              {onlineStatus}
            </figcaption>
          </figure>
          <div
            className="flex cursor-pointer"
            onClick={() => setShowChat(false)}
          >
            <OutlineIcon.ArrowLargeDown className="stroke-sc-2 dark:stroke-light-2" />
          </div>
        </section>
        <ul className="flex h-full w-full flex-col gap-5 overflow-y-scroll px-5 pt-5">
          {chatroomId === null ? (
            <p>Loading</p>
          ) : (
            messages.map((message: ChatMessage) => (
              <LiveChatMessage key={message.data.messageId} message={message} />
            ))
          )}
          <div ref={endOfMessagesRef} className="mt-1" />
        </ul>
      </>
    );
  }
);

LiveChatMessageList.displayName = "LiveChatMessageList";

export default LiveChatMessageList;