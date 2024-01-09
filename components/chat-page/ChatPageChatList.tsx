import { useEffect, useState } from "react";
import { useChannel } from "ably/react";

import { useChatPageContext } from "@/app/contexts/ChatPageContext";
import { ChatPageSearchBar, ChatroomListItem } from ".";
import { getUserChatrooms } from "@/lib/actions/chatroom.actions";
import { ChatMessage } from "@/types/chatroom.index";
import OutlineIcon from "../icons/outline-icons";

const ChatPageChatList = () => {
  const {
    chatrooms,
    messages,
    userInfo,
    showChatRoomList,
    setShowChatRoomList,
  } = useChatPageContext();

  const [chatroomsList, setChatroomsList] = useState(chatrooms);
  const [recentMessage, setRecentMessage] = useState<String | null>(null);

  useChannel("hipnode-livechat", (message: ChatMessage) => {
    const chatroomExists = chatroomsList.find(
      (chatroom) => chatroom.id === message.data.chatroomId
    );
    if (chatroomExists) {
      setRecentMessage(message.data.text);
    }
  });

  useEffect(() => {
    const fetchChatrooms = async () => {
      const chatrooms = await getUserChatrooms(userInfo.id);
      setChatroomsList(chatrooms);
    };
    fetchChatrooms();
  }, [messages, recentMessage]);

  return (
    <section className="flex h-fit w-full flex-col bg-light dark:bg-dark-2 md:h-full md:max-w-[27.5rem]">
      <div className="p-4 md:p-6">
        <p className="bold-18 text-sc-2_light">Messages</p>
      </div>
      <ChatPageSearchBar />
      {chatroomsList.length === 0 && (
        <div className="mt-5 flex flex-col items-center gap-3">
          <p className="self-center text-lg text-sc-4">
            Search to start a new chat
          </p>
          <OutlineIcon.Search className="h-8 w-8 stroke-sc-4" />
        </div>
      )}
      {showChatRoomList && (
        <ul className="flex w-full flex-col overflow-scroll md:h-screen">
          {chatroomsList.map((chatroom) =>
            chatroom.recentMessage ? (
              <ChatroomListItem
                key={chatroom.id}
                chatroom={chatroom}
                setShowChatRoomList={setShowChatRoomList}
              />
            ) : null
          )}
        </ul>
      )}
    </section>
  );
};

export default ChatPageChatList;
