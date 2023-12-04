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

  const {
    getInputProps,
    open,
    droppedFile,
    setDroppedFile,
    messageText,
    setMessageText,
    handleKeyDown,
    handleFormSubmission,
    inputBox,
  } = context;

  if (
    getInputProps === undefined ||
    open === undefined ||
    droppedFile === undefined ||
    setDroppedFile === undefined ||
    messageText === undefined ||
    setMessageText === undefined ||
    handleKeyDown === undefined ||
    handleFormSubmission === undefined ||
    inputBox === undefined
  ) {
    throw new Error(
      "useChatPageInputContext must be used within a ChatPageInputContext that provides data"
    );
  }

  return {
    getInputProps,
    open,
    droppedFile,
    setDroppedFile,
    messageText,
    setMessageText,
    handleKeyDown,
    handleFormSubmission,
    inputBox,
  };
}
