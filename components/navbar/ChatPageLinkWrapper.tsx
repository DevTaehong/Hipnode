"use client";

import { AblyProvider } from "ably/react";

import { client } from "@/lib/ably";
import ChatPresenceManager from "../live-chat/ChatPresenceManager";
import { BaseUserInfo } from "@/types/profile.index";

const ChatPresenceManagerWrapper = ({
  userInfo,
}: {
  userInfo: BaseUserInfo;
}) => {
  return (
    <AblyProvider client={client}>
      <ChatPresenceManager userInfo={userInfo} />
    </AblyProvider>
  );
};

export default ChatPresenceManagerWrapper;
