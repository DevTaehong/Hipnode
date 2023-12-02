import { usePresence } from "ably/react";
import { useState } from "react";

import { ChatMessage, ChatPageProps } from "@/types/chatroom.index";
import { ChatPageChatList, ChatPageLiveChat } from ".";

const LiveChatPageLayout = ({ chatrooms, userInfo }: ChatPageProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { presenceData } = usePresence("hipnode-livechat");

  const otherUser = chatrooms[0].otherUser;
  const defaultChatroomId = chatrooms[0].recentMessage.chatroomId;
  const { id, username, picture, name } = otherUser;

  const formattedOtherUser = {
    id,
    username,
    image: picture,
    name,
  };

  const onlineUserIds =
    presenceData
      ?.map((presence) => presence.data?.id)
      .filter((id) => id !== undefined) || [];

  return (
    <main className="bg-light-2_dark-2 -mt-16 flex h-screen min-h-screen w-screen justify-center pt-16">
      <section
        className="flex h-full w-full max-w-[90rem] border-x border-sc-6
dark:border-dark-4"
      >
        <ChatPageChatList
          chatrooms={chatrooms}
          onlineUsers={onlineUserIds}
          messages={messages}
          userInfo={userInfo}
        />
        <ChatPageLiveChat
          userInfo={userInfo}
          onlineUsers={onlineUserIds}
          otherUser={formattedOtherUser}
          defaultChatroomId={defaultChatroomId}
          messages={messages}
          setMessages={setMessages}
        />
      </section>
    </main>
  );
};

export default LiveChatPageLayout;
