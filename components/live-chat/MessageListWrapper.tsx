"use client";

import * as Ably from "ably";
import { AblyProvider } from "ably/react";

import { OnlineUserProps } from "@/types/chatroom.index";
import MessageList from "./MessageList";

const MessageListWrapper = ({
  userId,
  username,
  userImage,
}: OnlineUserProps) => {
  const client = new Ably.Realtime.Promise({
    key: process.env.NEXT_PUBLIC_ABLY_API_KEY,
    clientId: "hipnode",
  });

  return (
    <AblyProvider client={client}>
      <MessageList userId={userId} username={username} userImage={userImage} />
    </AblyProvider>
  );
};

export default MessageListWrapper;
