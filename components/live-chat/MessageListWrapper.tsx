"use client";

import * as Ably from "ably";
import { AblyProvider } from "ably/react";
import { useEffect } from "react";

import useChatStore from "@/app/chatStore";
import MessageList from "./MessageList";

interface UserInfo {
  userInfo: {
    id: number;
    username: string;
    image: string;
  };
}

const MessageListWrapper = ({ userInfo }: UserInfo) => {
  const { setUserInfo } = useChatStore();
  const client = new Ably.Realtime.Promise({
    key: process.env.NEXT_PUBLIC_ABLY_API_KEY,
    clientId: "hipnode",
  });

  const { id, username, image } = userInfo;

  useEffect(() => {
    setUserInfo({ id, username, image });
  }, []);

  return (
    <AblyProvider client={client}>
      <MessageList />
    </AblyProvider>
  );
};

export default MessageListWrapper;
