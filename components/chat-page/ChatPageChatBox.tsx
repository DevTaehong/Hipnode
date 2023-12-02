import useChatStore from "@/app/chatStore";

import { ChatPageChatBoxProps } from "@/types/chatroom.index";
import { ChatBoxHeader, ChatPageMessageList } from ".";

const ChatPageChatBox = ({ onlineUsers, messages }: ChatPageChatBoxProps) => {
  const { chatroomUsers } = useChatStore();
  const otherUser = chatroomUsers[1];

  if (!otherUser) return null;

  const isOtherUserOnline = onlineUsers
    ? onlineUsers.includes(otherUser.id)
    : false;

  return (
    <section className="flex w-full flex-col border-b border-l border-sc-6 dark:border-dark-4">
      <ChatBoxHeader otherUser={otherUser} isUserOnline={isOtherUserOnline} />
      <ChatPageMessageList messages={messages} />
    </section>
  );
};

export default ChatPageChatBox;
