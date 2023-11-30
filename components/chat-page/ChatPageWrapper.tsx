"use client";

import { AblyProvider } from "ably/react";

import { client } from "@/lib/ably";
import LiveChatPageLayout from "./LiveChatPageLayout";
import { ChatroomDetail } from "@/types/chatroom.index";

const ChatPageWrapper = ({ chatrooms }: { chatrooms: ChatroomDetail[] }) => {
  return (
    <AblyProvider client={client}>
      <LiveChatPageLayout chatrooms={chatrooms} />
    </AblyProvider>
  );
};

export default ChatPageWrapper;
