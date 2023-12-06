import { useEffect, useState } from "react";

import { useChatPageContext } from "@/app/contexts/ChatPageContext";
import OutlineIcon from "../icons/outline-icons";
import { ChatPageSearchBar, ChatroomListItem } from ".";
import { getUserChatrooms } from "@/lib/actions/chatroom.actions";

const ChatPageChatList = () => {
  const {
    chatrooms,
    messages,
    userInfo,
    showChatRoomList,
    setShowChatRoomList,
  } = useChatPageContext();
  const [chatroomsList, setChatroomsList] = useState(chatrooms);

  useEffect(() => {
    const fetchChatrooms = async () => {
      const chatrooms = await getUserChatrooms(userInfo.id);
      setChatroomsList(chatrooms);
    };
    fetchChatrooms();
  }, [messages]);

  return (
    <section className="flex h-fit w-full flex-col bg-light dark:bg-dark-2 md:h-full md:max-w-[27.5rem]">
      <div className="p-4 md:p-6">
        <p className="bold-18 text-sc-2_light">Messages</p>
      </div>
      <ChatPageSearchBar />
      <div className="flex w-full justify-between p-4 md:hidden">
        <p className="bold-18 text-sc-2_light">Chats</p>
        <button
          onClick={() => setShowChatRoomList(!showChatRoomList)}
          className={showChatRoomList ? "rotate-0" : "rotate-180"}
        >
          <OutlineIcon.ArrowLargeDown />
        </button>
      </div>
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
