import { usePresence } from "ably/react";
import { useState, useEffect } from "react";

import { ChatPageContext } from "@/app/contexts/ChatPageContext";
import { ChatMessage, ChatPageProps } from "@/types/chatroom.index";
import { ChatPageChatList, ChatPageLiveChat } from ".";

const LiveChatPageLayout = ({ chatrooms, userInfo }: ChatPageProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const { presenceData } = usePresence("hipnode-livechat");
  const [showChatRoomList, setShowChatRoomList] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowChatRoomList(window.innerWidth > 767);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let secondUser;
  let defaultChatroomId;
  let otherUser;

  if (chatrooms.length > 0 && chatrooms[0].recentMessage) {
    secondUser = chatrooms[0].otherUser;
    defaultChatroomId = chatrooms[0].recentMessage.chatroomId;
    otherUser = {
      id: secondUser.id,
      username: secondUser.username,
      image: secondUser.picture,
      name: secondUser.name,
    };
  }

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
        showChatRoomList,
        setShowChatRoomList,
        isLoading,
        setIsLoading,
        isInputDisabled,
        setIsInputDisabled,
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
