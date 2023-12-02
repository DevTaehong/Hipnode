"use client";

import { AblyProvider } from "ably/react";
import { useEffect } from "react";

import useChatStore from "@/app/chatStore";
import MessageList from "./MessageList";
import { client } from "@/lib/ably";

interface UserInfo {
  userInfo: {
    id: number;
    username: string;
    image: string;
    name: string;
  };
}

const MessageListWrapper = ({ userInfo }: UserInfo) => {
  const { setUserInfo } = useChatStore();

  useEffect(() => {
    setUserInfo(userInfo);
  }, []);

  return (
    <AblyProvider client={client}>
      <MessageList />
    </AblyProvider>
  );
};

export default MessageListWrapper;
