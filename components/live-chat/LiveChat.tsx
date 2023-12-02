"use client";

import React, { useState, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useChannel } from "ably/react";
import { usePathname } from "next/navigation";

import useChatStore from "@/app/chatStore";
import { ChatMessage } from "@/types/chatroom.index";
import LiveChatMessageList from "./LiveChatMessageList";
import HoverScreen from "./HoverScreen";
import FillIcon from "../icons/fill-icons";
import OutlineIcon from "../icons/outline-icons";
import AttachmentPreview from "./AttachmentPreview";
import {
  loadMessages,
  liveChatSubmission,
  useDropzoneHandler,
  API_RESULT,
} from ".";

const LiveChat = () => {
  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages] = useState<ChatMessage[]>([]);
  const [droppedFile, setDroppedFile] = useState<File | File[] | null>(null);
  const messageTextIsEmpty = messageText.trim().length === 0;
  const inputBox = useRef<HTMLInputElement | HTMLFormElement>(null);
  const { showChat, chatroomUsers, chatroomId } = useChatStore();
  const path = usePathname();

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
    loadMessages({ setMessages, chatroomId, chatroomUsers });
  }, [chatroomId, chatroomUsers, showChat]);

  useEffect(() => {
    setMessageText("");
  }, [chatroomId]);

  const userInfo = chatroomUsers?.[0] || { id: null, username: "", image: "" };
  const currentUser = userInfo;

  const handleFormSubmission = async (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    if (!messageTextIsEmpty) {
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      handleFormSubmission(event);
    }
  };

  return (
    <section
      {...getRootProps()}
      className={`bg-light_dark-4 fixed bottom-20 right-10 h-[450px] w-[450px] flex-col items-end justify-end rounded-2xl  ${
        showChat ? "flex" : "hidden"
      } ${path === "/chat" ? "hidden" : "flex"}`}
    >
      {isDragActive && <HoverScreen />}
      <input {...getInputProps()} />
      <LiveChatMessageList messages={receivedMessages} />
      <form
        onSubmit={handleFormSubmission}
        className="flex w-full gap-5 px-5 pb-5"
      >
        <div className=" flex w-full flex-col rounded-2xl border border-sc-5 p-3.5 dark:border-sc-2">
          {droppedFile && (
            <AttachmentPreview
              droppedFile={droppedFile}
              setDroppedFile={setDroppedFile}
            />
          )}
          <div className="flex gap-1">
            <button className="flex-center" type="button" onClick={open}>
              <OutlineIcon.Link />
            </button>
            <input
              value={messageText}
              placeholder="Type here your message..."
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-light_dark-4 z-10 w-full text-sc-4 outline-none"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={messageTextIsEmpty || chatroomId === null}
          className="h-fit cursor-pointer self-center"
          onClick={() => handleFormSubmission}
        >
          <FillIcon.Send className="fill-sc-2 dark:fill-light-2" />
        </button>
      </form>
    </section>
  );
};

export default LiveChat;
