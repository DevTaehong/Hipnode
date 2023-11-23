"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import {
  createMessage,
  getMessagesForChatroom,
} from "@/lib/actions/chatroom.actions";
import Image from "next/image";
import { uploadLivechatAttachment } from "@/utils";
import { useDropzone } from "react-dropzone";
import { useChannel } from "ably/react";
import { IoClose } from "react-icons/io5";

import useChatStore from "@/app/chatStore";
import { ChatMessage } from "@/types/chatroom.index";
import LiveChatMessageList from "./LiveChatMessageList";
import FillIcon from "../icons/fill-icons";
import OutlineIcon from "../icons/outline-icons";

const LiveChat = () => {
  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages] = useState<ChatMessage[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [droppedFile, setDroppedFile] = useState<File | null>(null);
  const messageTextIsEmpty = messageText.trim().length === 0;
  const inputBox = useRef<HTMLInputElement | HTMLFormElement>(null);
  const { showChat, chatroomUsers, chatroomId } = useChatStore();

  const { channel } = useChannel("hipnode-livechat", (message: ChatMessage) => {
    const channelId = message.data.chatroomId;
    if (channelId === chatroomId) {
      setMessages((prevMessages) => [...prevMessages.slice(-199), message]);
    }
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    setDroppedFile(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
  });

  useEffect(() => {
    const loadMessages = async () => {
      setMessages([]);
      if (chatroomId !== null) {
        try {
          const messages = await getMessagesForChatroom(chatroomId);
          const transformedMessages = messages.map((message) => {
            const user = chatroomUsers.find((u) => u.id === message.userId);
            return {
              data: {
                user: {
                  id: message.userId.toString(),
                  username: user?.username || "Unknown User",
                  image: user?.image || "/public/christopher.png",
                },
                attachment: message.attachment || undefined,
                text: message.text,
              },
            };
          });
          setMessages(transformedMessages);
        } catch (error) {
          console.error("Error fetching messages for chatroom:", error);
        }
      }
    };
    loadMessages();
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

  const handleFormSubmission = async (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    event.preventDefault();

    let attachmentURL = null;
    const messageContent = messageText.trim();
    if (droppedFile) {
      try {
        const uploadResult = await uploadLivechatAttachment([droppedFile]);
        attachmentURL = uploadResult.publicURL;
        setImagePreview(null);
        setDroppedFile(null);
      } catch (error) {
        console.error("Error uploading:", error);
        return;
      }
    }

    if (attachmentURL || messageContent.length > 0) {
      const chatMessage = {
        text: messageContent || "attachment",
        user: currentUser,
        chatroomId,
        attachment: attachmentURL || "",
      };

      try {
        if (chatroomId && currentUser.id) {
          await channel.publish("chat-message", chatMessage);
          await createMessage({
            text: chatMessage.text,
            userId: currentUser.id,
            chatroomId,
            attachment: chatMessage.attachment,
          });
          setMessageText("");
          inputBox.current?.focus();
        }
      } catch (error) {
        console.error("Error sending or creating message:", error);
      }
    } else {
      console.log("No message content or attachment to send");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (!messageTextIsEmpty) {
        handleFormSubmission(event);
      }
    }
  };

  return (
    <div
      {...getRootProps()}
      className={`fixed bottom-20 right-10 h-[450px] w-[450px] flex-col items-end justify-end rounded-2xl  ${
        showChat ? "flex" : "hidden"
      } ${isDragActive ? "bg-green-100" : "bg-light_dark-4"}`}
    >
      <input {...getInputProps()} />
      <LiveChatMessageList messages={receivedMessages} />
      <form
        onSubmit={handleFormSubmission}
        className="flex w-full gap-5 px-5 pb-5"
      >
        <div className=" flex w-full flex-col rounded-2xl border border-sc-5 p-3.5 dark:border-sc-2">
          {imagePreview && (
            <div className="relative flex w-fit">
              <div className="flex-center absolute right-0 top-0 h-5 w-5 bg-white/80">
                <IoClose
                  className="cursor-pointer text-[20px]"
                  onClick={() => {
                    setImagePreview(null);
                    setDroppedFile(null);
                  }}
                />
              </div>
              <Image
                src={imagePreview}
                height={250}
                width={250}
                className="mb-3"
                alt="Image preview"
              />
            </div>
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
              className="bg-light_dark-4 w-full text-sc-4 outline-none"
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
    </div>
  );
};

export default LiveChat;
