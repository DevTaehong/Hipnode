"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useDropzone } from "react-dropzone";
import { useChannel } from "ably/react";

import useChatStore from "@/app/chatStore";
import { ChatMessage } from "@/types/chatroom.index";
import LiveChatMessageList from "./LiveChatMessageList";
import HoverScreen from "./HoverScreen";
import FillIcon from "../icons/fill-icons";
import OutlineIcon from "../icons/outline-icons";
import AttachmentPreview from "./AttachmentPreview";
import { loadMessages, liveChatSubmission, useDropzoneHandler } from ".";

const LiveChat = () => {
  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages] = useState<ChatMessage[]>([]);
  const [attachmentPreview, setAttachmentPreview] = useState<string | null>(
    null
  );
  const [droppedFile, setDroppedFile] = useState<File | File[] | null>(null);
  const messageTextIsEmpty = messageText.trim().length === 0;
  const [mediaType, setMediaType] = useState("");
  const inputBox = useRef<HTMLInputElement | HTMLFormElement>(null);
  const { showChat, chatroomUsers, chatroomId } = useChatStore();

  const { channel } = useChannel("hipnode-livechat", (message: ChatMessage) => {
    const channelId = message.data.chatroomId;
    if (channelId === chatroomId) {
      setMessages((prevMessages) => [...prevMessages.slice(-199), message]);
    }
  });

  const onDrop = useDropzoneHandler({
    setMediaType,
    setDroppedFile,
    setAttachmentPreview,
  });

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
  });

  useEffect(() => {
    loadMessages({ setMessages, chatroomId, chatroomUsers });
  }, [chatroomId, chatroomUsers, showChat]);

  const userInfo = useMemo(() => {
    if (!chatroomUsers || !chatroomUsers[0]) {
      return { id: null, username: "", image: "" };
    }
    return chatroomUsers[0];
  }, [chatroomUsers]);

  const currentUser = useMemo(
    () => ({
      id: userInfo?.id,
      username: userInfo?.username || "",
      image: userInfo?.image || "",
    }),
    [userInfo]
  );

  const handleFormSubmission = useCallback(
    (
      event:
        | React.FormEvent<HTMLFormElement>
        | React.KeyboardEvent<HTMLInputElement>
    ) => {
      event.preventDefault();
      if (!messageTextIsEmpty) {
        liveChatSubmission({
          event,
          messageText,
          setMessageText,
          droppedFile,
          setDroppedFile,
          setAttachmentPreview,
          setMediaType,
          mediaType,
          channel,
          chatroomId,
          inputBox,
          currentUser,
        });
      }
    },
    [
      chatroomId,
      channel,
      currentUser,
      droppedFile,
      mediaType,
      messageTextIsEmpty,
      messageText,
    ]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        handleFormSubmission(event);
      }
    },
    [handleFormSubmission]
  );

  return (
    <section
      {...getRootProps()}
      className={`bg-light_dark-4 fixed bottom-20 right-10 h-[450px] w-[450px] flex-col items-end justify-end rounded-2xl  ${
        showChat ? "flex" : "hidden"
      }`}
    >
      {isDragActive && <HoverScreen />}
      <input {...getInputProps()} />
      <LiveChatMessageList messages={receivedMessages} />
      <form
        onSubmit={(event) => handleFormSubmission(event)}
        className="flex w-full gap-5 px-5 pb-5"
      >
        <div className=" flex w-full flex-col rounded-2xl border border-sc-5 p-3.5 dark:border-sc-2">
          {attachmentPreview && (
            <AttachmentPreview
              setAttachmentPreview={setAttachmentPreview}
              setDroppedFile={setDroppedFile}
              attachmentPreview={attachmentPreview}
              mediaType={mediaType}
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
