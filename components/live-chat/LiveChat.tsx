"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  createMessage,
  getMessagesForChatroom,
} from "@/lib/actions/chatroom.actions";
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
  const messageTextIsEmpty = messageText.trim().length === 0;
  const inputBox = useRef<HTMLInputElement>(null);
  const { showChat, chatroomUsers, chatroomId } = useChatStore();

  const { channel } = useChannel("chat-demo", (message: ChatMessage) => {
    const channelId = message.data.chatroomId;
    if (channelId === chatroomId) {
      setMessages((prevMessages) => [...prevMessages.slice(-199), message]);
    }
  });

  useEffect(() => {
    const loadMessages = async () => {
      if (chatroomId !== null) {
        setMessages([]);

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
          text: messageToSend.text,
          user: currentUser,
          chatroomId,
        };
        if (messageToSend.userId && messageToSend.chatroomId) {
          try {
            await channel.publish("chat-message", chatMessage);
            await createMessage({
              text: messageToSend.text,
              userId: messageToSend.userId,
              chatroomId: parseInt(messageToSend.chatroomId.toString()),
            });
            setMessageText("");
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

  const handleFormSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessageText("");
    if (messageText.trim().length > 0) {
      setMessageToSend({
        text: messageText,
        userId: currentUser.id,
        chatroomId,
      });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !messageTextIsEmpty) {
      setMessageText("");
      event.preventDefault();
      setMessageToSend({
        text: messageText,
        userId: currentUser.id,
        chatroomId,
      });
    }
  };

  return (
    <div
      className={`bg-light_dark-4 fixed bottom-10 right-10 h-[450px] w-[450px] flex-col items-end justify-end rounded-2xl bg-white ${
        showChat ? "flex" : "hidden"
      }`}
    >
      <LiveChatMessageList messages={receivedMessages} />
      <form
        onSubmit={handleFormSubmission}
        className="flex w-full gap-5 px-5 pb-5"
      >
        <div className="w-full rounded-2xl border border-sc-5 p-3.5 dark:border-sc-2">
          <input
            ref={inputBox}
            value={messageText}
            placeholder="Type here your message..."
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-light_dark-4 w-full text-sc-4 outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={messageTextIsEmpty}
          className="h-fit cursor-pointer self-center"
        >
          <FillIcon.Send className="fill-sc-2 dark:fill-light-2" />
        </button>
      </form>
    </div>
  );
};

export default LiveChat;
