"use client";

import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  useMemo,
} from "react";
import { useDropzone } from "react-dropzone";
import { useChannel } from "ably/react";
import { usePathname } from "next/navigation";

import useChatStore from "@/app/chatStore";
import { ChatMessage, UserTyping } from "@/types/chatroom.index";
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
import { adjustHeight } from "@/utils";

const LiveChat = () => {
  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages] = useState<ChatMessage[]>([]);
  const [droppedFile, setDroppedFile] = useState<File | File[] | null>(null);
  const [userTyping, setUserTyping] = useState<UserTyping | null>(null);

  const typingTimeoutRef = useRef<number | null>(null);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const messageTextIsEmpty = messageText.trim().length === 0;
  const inputBox = useRef<HTMLTextAreaElement>(null);
  const { showChat, chatroomUsers, chatroomId } = useChatStore();
  const path = usePathname();

  const { channel } = useChannel("hipnode-livechat", (message: ChatMessage) => {
    const channelId = message.data.chatroomId;
    if (channelId === chatroomId) {
      setMessages((prevMessages) => [...prevMessages.slice(-199), message]);
    }
  });

  const { channel: typingChannel } = useChannel(
    "hipnode-livechat-typing-status",
    (message) => {
      setUserTyping(message.data);
    }
  );

  const userInfo = chatroomUsers[0] ?? null;

  const handleTyping = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newMessageText = e.target.value;
    setMessageText(newMessageText);
    adjustHeight(e.target);

    if (channel) {
      typingChannel.publish("typing-status", {
        isTyping: true,
        userId: userInfo.id,
        username: userInfo.username,
        chatroomId,
      });
    }

    if (typingTimeoutRef.current !== null) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = window.setTimeout(() => {
      typingChannel.publish("typing-status", {
        isTyping: false,
        userId: userInfo.id,
        username: userInfo.username,
        chatroomId,
      });
    }, 1000);
  };

  const isChatroomUserTyping = useMemo(() => {
    if (!userTyping) return false;
    return (
      userTyping.isTyping &&
      userTyping.chatroomId === chatroomId &&
      userTyping.userId !== userInfo.id
    );
  }, [userTyping, chatroomId, userInfo]);

  const userTypingUsername = userTyping?.username;

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
        if (response) {
          setMessages(response.messages);
        }
      } catch (error) {
        console.error("Failed to load messages:", error);
      }
    };
    fetchMessages();
  }, [chatroomId, chatroomUsers, showChat]);

  useEffect(() => {
    setMessageText("");
  }, [chatroomId]);

  useEffect(() => {
    if (!isInputDisabled) {
      inputBox.current?.focus();
    }
  }, [isInputDisabled]);

  const currentUser = chatroomUsers?.[0] ?? {
    id: null,
    username: "",
    image: "",
  };

  const handleFormSubmission = async (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
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
        setMessageText("");
        setDroppedFile(null);
        setIsInputDisabled(false);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setIsInputDisabled(false);
    }
  };

  useEffect(() => {
    adjustHeight(inputBox.current);
  }, [messageText]);

  if (!chatroomId) return null;
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      handleFormSubmission(event);
    }
  };

  return (
    <section
      {...getRootProps()}
      className={`bg-light_dark-4 fixed bottom-20 right-0 h-[450px] w-full max-w-[450px] flex-col items-end justify-end rounded-2xl md:right-10  ${
        showChat ? "flex" : "hidden"
      } ${path === "/chat" ? "hidden" : "flex"}`}
    >
      {isDragActive && <HoverScreen />}
      <input {...getInputProps()} />
      <LiveChatMessageList messages={receivedMessages} />
      <form
        onSubmit={handleFormSubmission}
        className="relative flex w-full gap-5 border-t border-sc-6 p-5
        dark:border-sc-2"
      >
        {isChatroomUserTyping && (
          <p className=" semibold-14 bg-light_dark-4 absolute flex translate-y-[-1.3rem] px-2 text-sc-3">
            {userTypingUsername} is typing...
          </p>
        )}
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
            <textarea
              ref={inputBox}
              value={messageText}
              placeholder="Type here your message..."
              onChange={(e) => {
                handleTyping(e);
              }}
              onKeyDown={handleKeyDown}
              disabled={isInputDisabled}
              className="bg-light_dark-4 z-10 h-6 w-full resize-none text-sc-4 outline-none"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={
            (messageTextIsEmpty && chatroomId === null) || isInputDisabled
          }
          className="h-fit cursor-pointer self-center"
        >
          <FillIcon.Send className="fill-sc-2 dark:fill-light-2" />
        </button>
      </form>
    </section>
  );
};

export default LiveChat;
