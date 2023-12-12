"use client";

import {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
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
import AttachmentPreview from "./AttachmentPreview";
import {
  loadMessages,
  liveChatSubmission,
  useDropzoneHandler,
  API_RESULT,
  userTypingChange,
} from ".";
import { adjustHeight } from "@/utils";
import LiveChatInput from "./LiveChatInput";

const LiveChat = () => {
  const { showChat, chatroomUsers, chatroomId } = useChatStore();
  const path = usePathname();

  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages] = useState<ChatMessage[]>([]);
  const [droppedFile, setDroppedFile] = useState<File | File[] | null>(null);
  const [userTyping, setUserTyping] = useState<UserTyping | null>(null);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

  const typingTimeoutRef = useRef<number | null>(null);
  const inputBox = useRef<HTMLTextAreaElement>(null);

  const messageTextIsEmpty = messageText.trim().length === 0;

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
    userTypingChange({
      e,
      setMessageText,
      typingChannel,
      userInfo,
      chatroomId,
      typingTimeoutRef,
    });
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
        setMessageText("");
        setDroppedFile(null);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsInputDisabled(false);
    }
  };

  useEffect(() => {
    adjustHeight(inputBox.current);
  }, [messageText]);

  if (!chatroomId) return null;
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
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
      <LiveChatMessageList
        messages={receivedMessages}
        setDroppedFile={setDroppedFile}
      />
      <form
        onSubmit={handleFormSubmission}
        className="relative flex w-full gap-5 border-t border-sc-6 p-5
        dark:border-sc-2"
      >
        {isChatroomUserTyping && (
          <p className=" semibold-14 absolute flex translate-y-[-1.3rem] px-2 text-sc-3">
            {userTypingUsername} is typing...
          </p>
        )}
        <div className=" flex w-full flex-col gap-3 rounded-2xl border border-sc-5 p-3.5 dark:border-sc-2">
          {droppedFile && (
            <AttachmentPreview
              droppedFile={droppedFile}
              setDroppedFile={setDroppedFile}
            />
          )}
          <LiveChatInput
            open={open}
            inputBox={inputBox}
            messageText={messageText}
            handleTyping={handleTyping}
            handleKeyDown={handleKeyDown}
            isInputDisabled={isInputDisabled}
            showEmojiPicker={showEmojiPicker}
            setShowEmojiPicker={setShowEmojiPicker}
            setMessageText={setMessageText}
          />
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
