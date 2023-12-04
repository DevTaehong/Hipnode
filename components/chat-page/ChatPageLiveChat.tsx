import { useState, useEffect, useRef, FormEvent, KeyboardEvent } from "react";
import { useDropzone } from "react-dropzone";
import { useChannel } from "ably/react";

import {
  API_RESULT,
  liveChatSubmission,
  loadMessages,
  useDropzoneHandler,
} from "../live-chat";
import useChatStore from "@/app/chatStore";
import { ChatMessage } from "@/types/chatroom.index";
import { ChatBoxHeader, ChatPageMessageList } from ".";
import HoverScreen from "../live-chat/HoverScreen";
import { useChatPageContext } from "@/app/contexts/ChatPageContext";
import OnboardingLoader from "../onboarding-components/OnboardingLoader";
import { ChatPageInputContext } from "@/app/contexts/ChatPageInputContext";
import ChatPageInput from "./ChatPageInput";

const ChatPageLiveChat = () => {
  const { userInfo, otherUser, defaultChatroomId, setMessages } =
    useChatPageContext();

  const [messageText, setMessageText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [droppedFile, setDroppedFile] = useState<File | File[] | null>(null);
  const inputBox = useRef<HTMLInputElement>(null);
  const messageTextIsEmpty = messageText.trim().length === 0;
  const { chatroomUsers, chatroomId, setChatroomUsers, setChatroomId } =
    useChatStore();

  const { channel } = useChannel("hipnode-livechat", (message: ChatMessage) => {
    const channelId = message.data.chatroomId;
    if (channelId === chatroomId) {
      setMessages((prevMessages) => [...prevMessages.slice(-199), message]);
    }
  });

  const onDrop = useDropzoneHandler({
    setDroppedFile,
  });

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
  });

  useEffect(() => {
    setIsLoading(true);
    loadMessages({
      setIsLoading,
      setMessages,
      chatroomId,
      chatroomUsers,
    });
  }, [chatroomId, chatroomUsers]);

  useEffect(() => {
    if (chatroomId === null || !chatroomUsers.length) {
      setChatroomId(defaultChatroomId);
      setChatroomUsers([userInfo, otherUser]);
    }
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      handleFormSubmission(event);
    }
  };

  const currentUser = userInfo;

  const handleFormSubmission = async (
    event: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    if (!messageTextIsEmpty || droppedFile) {
      try {
        const result = await liveChatSubmission({
          event,
          messageText,
          droppedFile,
          channel,
          chatroomId,
          inputBox,
          currentUser,
        });
        if (result === API_RESULT.SUCCESS) {
          setMessageText("");
          setDroppedFile(null);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  return (
    <ChatPageInputContext.Provider
      value={{
        getInputProps,
        open,
        droppedFile,
        setDroppedFile,
        messageText,
        setMessageText,
        handleKeyDown,
        handleFormSubmission,
        inputBox,
      }}
    >
      <section
        className="relative flex h-full w-full max-w-[62.5rem]"
        {...getRootProps()}
      >
        {isDragActive && <HoverScreen />}
        <section className="flex w-full flex-col border-b border-l border-sc-6 dark:border-dark-4">
          <ChatBoxHeader />
          {isLoading ? (
            <div className="flex-center bg-light_dark-4 h-full w-full">
              <OnboardingLoader />
            </div>
          ) : (
            <ChatPageMessageList />
          )}
          <ChatPageInput />
        </section>
      </section>
    </ChatPageInputContext.Provider>
  );
};

export default ChatPageLiveChat;
