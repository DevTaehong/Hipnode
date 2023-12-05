"use client";

import { ChatPageInputContextType } from "@/types/chatroom.index";
import { createContext, useContext } from "react";

export const ChatPageInputContext = createContext<
  ChatPageInputContextType | undefined
>(undefined);

export function useChatPageInputContext() {
  const context = useContext(ChatPageInputContext);

  if (!context) {
    throw new Error(
      "useChatPageInputContext must be used within a ChatPageInputContext that provides data"
    );
  }

  return context;
}
