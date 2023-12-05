"use client";

import { ChatPageContextType } from "@/types/chatroom.index";
import { createContext, useContext } from "react";

export const ChatPageContext = createContext<ChatPageContextType | undefined>(
  undefined
);

export function useChatPageContext() {
  const context = useContext(ChatPageContext);

  if (!context) {
    throw new Error(
      "useChatPageContextType must be used within a ChatPageContextProvider that provides data"
    );
  }

  const {
    chatrooms,
    onlineUsers,
    messages,
    userInfo,
    defaultChatroomId,
    setMessages,
    otherUser,
    showChatRoomList,
    setShowChatRoomList,
    isLoading,
    setIsLoading,
  } = context;

  if (
    chatrooms === undefined ||
    onlineUsers === undefined ||
    messages === undefined ||
    userInfo === undefined ||
    setMessages === undefined ||
    showChatRoomList === undefined ||
    setShowChatRoomList === undefined ||
    isLoading === undefined ||
    setIsLoading === undefined
  ) {
    throw new Error(
      "useChatPageContextType must be used within a ChatPageContextType that provides data"
    );
  }

  return {
    chatrooms,
    onlineUsers,
    messages,
    userInfo,
    defaultChatroomId,
    setMessages,
    otherUser,
    showChatRoomList,
    setShowChatRoomList,
    isLoading,
    setIsLoading,
  };
}
