"use client";

import { AblyProvider } from "ably/react";

import { client } from "@/lib/ably";
import { ChatPageLink } from "../live-chat";
import { ChatPageLinkProps } from "@/types/searchbar.index";

const ChatPageLinkWrapper = ({
  userChatrooms,
  userInfo,
}: ChatPageLinkProps) => {
  return (
    <AblyProvider client={client}>
      <ChatPageLink userInfo={userInfo} userChatrooms={userChatrooms} />
    </AblyProvider>
  );
};

export default ChatPageLinkWrapper;
