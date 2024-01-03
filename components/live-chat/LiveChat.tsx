"use client";

import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useChannel } from "ably/react";
import { usePathname } from "next/navigation";

import useChatStore from "@/app/chatStore";
import { ChatMessage } from "@/types/chatroom.index";
import { loadMessages, useDropzoneHandler } from "../../utils/chat-functions";
import { HoverScreen, LiveChatMessageList, LiveChatForm } from ".";

const LiveChat = () => {
  const { showChat, chatroomUsers, chatroomId } = useChatStore();
  const path = usePathname();

  const [receivedMessages, setMessages] = useState<ChatMessage[]>([]);
  const [droppedFile, setDroppedFile] = useState<File | File[] | null>(null);

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
      setMessages([]);
      try {
        const response = await loadMessages({
          chatroomId,
          chatroomUsers,
        });
        if (response !== null && response && response.messages) {
          setMessages(response.messages);
        }
      } catch (error) {
        console.error("Failed to load messages:", error);
      }
    };
    fetchMessages();
  }, [chatroomId, chatroomUsers, showChat]);

  if (!chatroomId) return null;

  return (
    <section
      {...getRootProps()}
      className={`bg-light_dark-4 fixed bottom-20 right-0 h-[450px] w-full max-w-[450px] flex-col items-end justify-end rounded-2xl md:right-10  ${
        showChat ? "flex" : "hidden"
      } ${path === "/chat" ? "hidden" : "flex"}`}
    >
      {isDragActive && <HoverScreen />}
      <input {...getInputProps()} />
      <LiveChatMessageList
        messages={receivedMessages}
        setMessages={setMessages}
        setDroppedFile={setDroppedFile}
      />
      <LiveChatForm
        droppedFile={droppedFile}
        setDroppedFile={setDroppedFile}
        channel={channel}
        open={open}
      />
    </section>
  );
};

export default LiveChat;
