import { useState, useEffect, FormEvent, KeyboardEvent } from "react";
import { useDropzone } from "react-dropzone";
import { useChannel } from "ably/react";

import {
  API_RESULT,
  liveChatSubmission,
  loadMessages,
  useDropzoneHandler,
} from "../live-chat";
import { ChatMessage } from "@/types/chatroom.index";
import { ChatBoxHeader, ChatPageMessageList } from ".";
import HoverScreen from "../live-chat/HoverScreen";
import { useChatPageContext } from "@/app/contexts/ChatPageContext";
import LoaderComponent from "../onboarding-components/LoaderComponent";
import { ChatPageInputContext } from "@/app/contexts/ChatPageInputContext";
import ChatPageInput from "./ChatPageInput";
import useChatStore from "@/app/chatStore";
import useMediaPlayerStore from "@/app/mediaPlayerStore";

const ChatPageLiveChat = () => {
  const {
    userInfo,
    otherUser,
    defaultChatroomId,
    setMessages,
    showChatRoomList,
    isLoading,
    setIsLoading,
    setIsInputDisabled,
  } = useChatPageContext();
  const { chatroomUsers, chatroomId, setChatroomUsers, setChatroomId } =
    useChatStore();
  const { setLiveRecordingDuration } = useMediaPlayerStore();

  const [messageText, setMessageText] = useState("");
  const [droppedFile, setDroppedFile] = useState<File | File[] | null>(null);

  const { channel } = useChannel("hipnode-livechat", (message: ChatMessage) => {
    const channelId = message.data.chatroomId;
    if (channelId === chatroomId) {
      setMessages((prevMessages) => [...prevMessages.slice(-199), message]);
    }
  });

  const messageTextIsEmpty = messageText.trim().length === 0;

  const onDrop = useDropzoneHandler({
    setDroppedFile,
  });

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
  });

  useEffect(() => {
    setDroppedFile(null);
    setLiveRecordingDuration(0);
  }, [chatroomId]);

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
        console.error("An error occurred:", error);
      } finally {
        setIsInputDisabled(false);
      }
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

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      handleFormSubmission(event);
    }
  };

  const currentUser = userInfo;

  const handleFormSubmission = async (
    event:
      | FormEvent<HTMLFormElement>
      | KeyboardEvent<HTMLInputElement>
      | KeyboardEvent<HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    if (messageTextIsEmpty && !droppedFile) return;
    setIsInputDisabled(true);
    try {
      const result = await liveChatSubmission({
        event,
        messageText,
        droppedFile,
        channel,
        chatroomId,
        currentUser,
      });
      if (result === API_RESULT.SUCCESS) {
        setLiveRecordingDuration(0);
        setMessageText("");
        setDroppedFile(null);
        setIsInputDisabled(false);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setIsInputDisabled(false);
    }
  };

  if (!chatroomId) return null;

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
      }}
    >
      <section
        className={`relative flex h-full w-full md:max-w-[50%] lg:max-w-[62.5rem] ${
          showChatRoomList && "hidden md:flex"
        }`}
        {...getRootProps()}
      >
        {isDragActive && <HoverScreen />}
        <section className="relative flex w-full flex-col border-b border-l border-sc-6 dark:border-dark-2 md:dark:border-dark-3">
          <ChatBoxHeader />
          {isLoading ? (
            <div className="flex-center h-full w-full bg-light dark:bg-dark-2 md:dark:bg-dark-3">
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
