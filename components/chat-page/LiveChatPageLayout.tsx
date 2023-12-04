import { usePresence } from "ably/react";
import { useState } from "react";

import { ChatPageContext } from "@/app/contexts/ChatPageContext";
import { ChatMessage, ChatPageProps } from "@/types/chatroom.index";
import { ChatPageChatList, ChatPageLiveChat } from ".";

const LiveChatPageLayout = ({ chatrooms, userInfo }: ChatPageProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { presenceData } = usePresence("hipnode-livechat");

  const secondUser = chatrooms[0].otherUser;
  const defaultChatroomId = chatrooms[0].recentMessage.chatroomId;
  const { id, username, picture, name } = secondUser;

  const otherUser = {
    id,
    username,
    image: picture,
    name,
  };

  const onlineUsers =
    presenceData
      ?.map((presence) => presence.data?.id)
      .filter((id) => id !== undefined) || [];

  return (
    <ChatPageContext.Provider
      value={{
        chatrooms,
        onlineUsers,
        messages,
        userInfo,
        defaultChatroomId,
        setMessages,
        otherUser,
      }}
    >
      <main className="bg-light-2_dark-2 -mt-16 flex h-screen min-h-screen w-screen justify-center pt-16">
        <section
          className="flex h-full w-full max-w-[90rem] flex-col border-x border-sc-6 dark:border-dark-4
md:flex-row"
        >
          <ChatPageChatList />
          <ChatPageLiveChat />
        </section>
      </main>
    </ChatPageContext.Provider>
  );
};

export default LiveChatPageLayout;
