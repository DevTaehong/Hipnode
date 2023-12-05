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
import LoaderComponent from "../onboarding-components/LoaderComponent";
import { ChatPageInputContext } from "@/app/contexts/ChatPageInputContext";
import ChatPageInput from "./ChatPageInput";

const ChatPageLiveChat = () => {
  const {
    userInfo,
    otherUser,
    defaultChatroomId,
    setMessages,
    showChatRoomList,
    isLoading,
    setIsLoading,
  } = useChatPageContext();

  const [messageText, setMessageText] = useState("");
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
    const fetchMessages = async () => {
      setIsLoading(true);
      try {
        const response = await loadMessages({
          chatroomId,
          chatroomUsers,
        });
        if (response) {
          setMessages(response.messages);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to load messages:", error);
      }
      //  finally {
      //   setIsLoading(false);
      // }
    };
    fetchMessages();
  }, [chatroomId, chatroomUsers]);

  useEffect(() => {
    if (chatroomId === null || !chatroomUsers.length) {
      setIsLoading(false);
      setChatroomId(defaultChatroomId ?? null);
      if (otherUser) setChatroomUsers([userInfo, otherUser]);
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
    if (messageTextIsEmpty && !droppedFile) return;
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
        className={`relative flex h-full w-full max-w-[62.5rem] ${
          showChatRoomList && "hidden md:flex"
        }`}
        {...getRootProps()}
      >
        {isDragActive && <HoverScreen />}
        <section className="flex w-full flex-col border-b border-l border-sc-6 dark:border-dark-4">
          <ChatBoxHeader />
          {isLoading ? (
            <div className="flex-center bg-light_dark-4 h-full w-full">
              <LoaderComponent />
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
