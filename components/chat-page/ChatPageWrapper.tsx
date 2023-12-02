"use client";

import { AblyProvider } from "ably/react";
import { useEffect } from "react";

import { client } from "@/lib/ably";

import { ChatroomDetail, UserInfo } from "@/types/chatroom.index";
import useChatStore from "@/app/chatStore";
import { LiveChatPageLayout } from ".";

const ChatPageWrapper = ({
  chatrooms,
  userInfo,
}: {
  chatrooms: ChatroomDetail[];
  userInfo: UserInfo;
}) => {
  const { setUserInfo } = useChatStore();
  useEffect(() => {
    if (userInfo) {
      setUserInfo(userInfo);
    }
  }, [userInfo]);

  return (
    <AblyProvider client={client}>
      <LiveChatPageLayout chatrooms={chatrooms} />
    </AblyProvider>
  );
};

export default ChatPageWrapper;
