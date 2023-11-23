"use client";

import * as Ably from "ably";
import { AblyProvider } from "ably/react";
import { useEffect, useRef } from "react";

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
  const client = useRef<Ably.Types.RealtimePromise>();

  const { id, username, image } = userInfo;

  useEffect(() => {
    if (!client.current) {
      client.current = new Ably.Realtime.Promise({
        key: process.env.NEXT_PUBLIC_ABLY_API_KEY,
        clientId: "hipnode",
      });
    }

    setUserInfo({ id, username, image });
  }, [userInfo, setUserInfo]);

  if (!client.current) {
    return null;
  }

  return (
    <AblyProvider client={client.current}>
      <MessageList />
    </AblyProvider>
  );
};

export default MessageListWrapper;
