import { useState, useEffect } from "react";

import { loadMessages } from "../live-chat";
import useChatStore from "@/app/chatStore";
import { ChatMessage } from "@/types/chatroom.index";
import { ChatPageChatBox } from ".";

const ChatPageLiveChat = ({ onlineUsers }: { onlineUsers: number[] }) => {
  const { chatroomUsers, chatroomId } = useChatStore();
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    loadMessages({ setMessages, chatroomId, chatroomUsers });
  }, [chatroomId, chatroomUsers]);

  return (
    <section className="flex h-full w-full max-w-[62.5rem]">
      <ChatPageChatBox onlineUsers={onlineUsers} messages={messages} />
    </section>
  );
};

export default ChatPageLiveChat;
