"use client";

import { AblyProvider } from "ably/react";
import { useEffect } from "react";

import useChatStore from "@/app/chatStore";
import { client } from "@/lib/ably";
import { MessageList } from ".";

const MessageListWrapper = ({ userInfo, onlineUserIds }: any) => {
  const { setUserInfo, setOnlineUsers } = useChatStore();

  useEffect(() => {
    setUserInfo(userInfo);
    setOnlineUsers(onlineUserIds);
  }, []);

  return (
    <AblyProvider client={client}>
      <MessageList />
    </AblyProvider>
  );
};

export default MessageListWrapper;
