"use client";

import { AblyProvider } from "ably/react";
import { useEffect } from "react";

import useChatStore from "@/app/chatStore";
import MessageList from "./MessageList";
import { client } from "@/lib/ably";

const MessageListWrapper = ({ userInfo }: any) => {
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
