"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { createMessage } from "@/lib/actions/chatroom.actions";
import { useChannel } from "ably/react";
import useChatStore from "@/app/chatStore";
import { ChatMessage, MessageToSend } from "@/types/chatroom.index";

const LiveChat = () => {
  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages] = useState<ChatMessage[]>([]);
  const [messageToSend, setMessageToSend] = useState<MessageToSend | null>(
    null
  );
  const messageTextIsEmpty = messageText.trim().length === 0;
  const inputBox = useRef<HTMLTextAreaElement>(null);
  const messageEnd = useRef<HTMLDivElement>(null);
  const { showChat, setShowChat, chatroomUsers, chatroomId } = useChatStore();

  const { channel } = useChannel("chat-demo", (message: ChatMessage) => {
    setMessages((prevMessages) => [...prevMessages.slice(-199), message]);
  });

  const userInfo = useMemo(() => {
    if (!chatroomUsers || !chatroomUsers[1]) {
      return { id: null, username: "", picture: "" };
    }
    return chatroomUsers[1];
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
    if (messageText.trim().length > 0) {
      setMessageToSend({
        text: messageText,
        userId: currentUser.id,
        chatroomId,
      });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !messageTextIsEmpty) {
      event.preventDefault();
      setMessageToSend({
        text: messageText,
        userId: currentUser.id,
        chatroomId,
      });
      setMessageText("");
    }
  };

  return (
    <div
      className={`fixed bottom-10 right-10 h-[450px] w-[450px] flex-col items-end justify-end bg-white ${
        showChat ? "flex" : "hidden"
      }`}
    >
      <div className="flex w-full flex-col">
        {receivedMessages.map((message) => message.data.text)}
        <div ref={messageEnd} />
      </div>
      <form onSubmit={handleFormSubmission} className="flex h-20 w-80">
        <textarea
          ref={inputBox}
          value={messageText}
          placeholder="Type a message..."
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="h-10 w-40"
        ></textarea>
        <button
          type="submit"
          className="bg-red-500"
          disabled={messageTextIsEmpty}
        >
          Send
        </button>
        <button onClick={() => setShowChat(false)}>Close</button>
      </form>
    </div>
  );
};

export default LiveChat;
