import { useEffect, useRef } from "react";

import { ChatMessage } from "@/types/chatroom.index";
import { ChatBoxMessage } from ".";
import { useChatPageContext } from "@/app/contexts/ChatPageContext";

const ChatPageMessageList = () => {
  const { messages } = useChatPageContext();
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView();
    }
  }, [messages]);

  return (
    <ul className="bg-light_dark-4 flex h-full w-full flex-col gap-4 overflow-scroll p-4 md:p-8">
      {messages &&
        messages.map((message: ChatMessage) => (
          <ChatBoxMessage key={message.data.messageId} message={message} />
        ))}
      <div ref={endOfMessagesRef} className="bottom-0 mt-1" />
    </ul>
  );
};

export default ChatPageMessageList;
