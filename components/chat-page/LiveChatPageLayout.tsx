import { usePresence } from "ably/react";
import React, { useState, useEffect, useMemo } from "react";

import { ChatPageContext } from "@/app/contexts/ChatPageContext";
import { ChatMessage, ChatPageProps } from "@/types/chatroom.index";
import { ChatPageChatList, ChatPageLiveChat } from ".";
import useChatStore from "@/app/chatStore";

const LiveChatPageLayout = ({ chatrooms, userInfo }: ChatPageProps) => {
  const { setShowChat } = useChatStore();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [showChatRoomList, setShowChatRoomList] = useState(false);

  const { presenceData } = usePresence("hipnode-livechat");

  useEffect(() => {
    const handleResize = () => {
      setShowChatRoomList(window.innerWidth > 767);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setShowChat(false);
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

  // const handleDeleteClick = async ({
  //   messageUUID,
  //   setMessages,
  // }: {
  //   messageUUID: string;
  //   setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  // }) => {
  //   try {
  //     setMessages((prevMessages) =>
  //       prevMessages.filter(
  //         (message) => message.data.messageUUID !== messageUUID
  //       )
  //     );
  //     await deleteMessage(messageUUID);
  //   } catch (error) {
  //     console.error("Error deleting message:", error);
  //   }
  // };

  // const handleEditClick = async ({
  //   messageUUID,
  //   text,
  // }: {
  //   messageUUID: string;
  //   text: string;
  // }) => {
  //   try {
  //     await editMessage({ messageUUID, text });
  //   } catch (error) {
  //     console.error("Error deleting message:", error);
  //   }
  // };

  const onlineUsers = useMemo(() => {
    return (
      presenceData
        ?.map((presence) => presence.data?.id)
        .filter((id) => id !== undefined) || []
    );
  }, [presenceData]);

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
          className="flex h-full w-full max-w-[90rem] flex-col border-x border-sc-6 dark:border-dark-2 md:flex-row
md:dark:border-dark-3"
        >
          <ChatPageChatList />
          <ChatPageLiveChat />
        </section>
      </main>
    </ChatPageContext.Provider>
  );
};

export default LiveChatPageLayout;
