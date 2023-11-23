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

import useChatStore from "@/app/chatStore";
import { ChatMessage, MessageToSend } from "@/types/chatroom.index";
import LiveChatMessageList from "./LiveChatMessageList";
import FillIcon from "../icons/fill-icons";

const LiveChat = () => {
  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages] = useState<ChatMessage[]>([]);
  const [messageToSend, setMessageToSend] = useState<MessageToSend | null>(
    null
  );
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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
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
                  image: user?.picture || "/public/christopher.png",
                },
                attachment: message.attachment || undefined, // Convert 'null' to 'undefined'
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
      return { id: null, username: "", picture: "" };
    }
    return chatroomUsers[0];
  }, [chatroomUsers]);

  const currentUser = useMemo(
    () => ({
      id: userInfo?.id,
      username: userInfo?.username || "",
      image: userInfo?.picture || "",
    }),
    [userInfo]
  );

  useEffect(() => {
    if (messageToSend) {
      const sendChatMessage = async () => {
        const chatMessage = {
          text: messageToSend.text || "",
          user: currentUser,
          chatroomId,
          attachment: messageToSend.attachment,
        };
        if (messageToSend.userId && messageToSend.chatroomId) {
          try {
            setMessageText("");
            await channel.publish("chat-message", chatMessage);
            await createMessage({
              text: messageToSend.text || "",
              userId: messageToSend.userId,
              chatroomId: parseInt(messageToSend.chatroomId.toString()),
              attachment: messageToSend.attachment || "",
            });
          } catch (error) {
            console.error("Error sending or creating message: ", error);
          }
        }
        inputBox.current?.focus();
      };
      sendChatMessage();
      setMessageToSend(null);
    }
  }, [messageToSend, currentUser, channel, setMessageText, inputBox]);

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
      const messageToSendData = {
        text: messageContent || "attachment",
        userId: currentUser.id,
        chatroomId,
        attachment: attachmentURL || "",
      };

      setMessageToSend(messageToSendData);
    } else {
      console.log("No message content or attachment to send");
      return;
    }

    setMessageText("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevent default to avoid new line on 'Enter'
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
        <div className="flex w-full flex-col rounded-2xl border border-sc-5 p-3.5 dark:border-sc-2">
          {imagePreview && (
            <Image
              src={imagePreview}
              height={250}
              width={250}
              className="mb-3"
              alt="Image preview"
              onClick={() => {
                setImagePreview(null);
                setDroppedFile(null);
              }}
            />
          )}
          <input
            value={messageText}
            placeholder="Type here your message..."
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-light_dark-4 w-full text-sc-4 outline-none"
          />
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
