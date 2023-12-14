import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useChannel } from "ably/react";

import { loadMessages, useDropzoneHandler } from "../live-chat";
import { ChatMessage } from "@/types/chatroom.index";
import { ChatBoxHeader, ChatPageMessageList } from ".";
import HoverScreen from "../live-chat/HoverScreen";
import { useChatPageContext } from "@/app/contexts/ChatPageContext";
import LoaderComponent from "../onboarding-components/LoaderComponent";
import { ChatPageInputContext } from "@/app/contexts/ChatPageInputContext";
import ChatPageInput from "./ChatPageInput";
import useChatStore from "@/app/chatStore";

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

  const [droppedFile, setDroppedFile] = useState<File | File[] | null>(null);

  useChannel("hipnode-livechat", (message: ChatMessage) => {
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
    setDroppedFile(null);
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

  if (!chatroomId) return null;

  return (
    <ChatPageInputContext.Provider
      value={{
        getInputProps,
        open,
        droppedFile,
        setDroppedFile,
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
