import { useState, useEffect } from "react";

import { loadMessages } from "../live-chat";
import useChatStore from "@/app/chatStore";
import { ChatMessage, ChatPageLiveChatProps } from "@/types/chatroom.index";
import { ChatPageChatBox } from ".";

const ChatPageLiveChat = ({
  userInfo,
  onlineUsers,
  otherUser,
  defaultChatroomId,
}: ChatPageLiveChatProps) => {
  const { chatroomUsers, chatroomId, setChatroomUsers, setChatroomId } =
    useChatStore();
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const idForChatroom = chatroomId ?? defaultChatroomId;
  const usersForChatroom = chatroomUsers ?? [userInfo, otherUser];

  useEffect(() => {
    loadMessages({
      setMessages,
      chatroomId: idForChatroom,
      chatroomUsers: usersForChatroom,
    });
  }, [chatroomId, chatroomUsers]);

  useEffect(() => {
    if (chatroomId === null || !chatroomUsers.length) {
      setChatroomId(defaultChatroomId);
      setChatroomUsers([userInfo, otherUser]);
    }
  }, []);

  return (
    <section className="flex h-full w-full max-w-[62.5rem]">
      <ChatPageChatBox onlineUsers={onlineUsers} messages={messages} />
    </section>
  );
};

export default ChatPageLiveChat;
