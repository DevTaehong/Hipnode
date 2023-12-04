import { useEffect, useState } from "react";

import { useChatPageContext } from "@/app/contexts/ChatPageContext";
import OutlineIcon from "../icons/outline-icons";
import { ChatPageSearchBar, ChatroomListItem } from ".";
import { getUserChatrooms } from "@/lib/actions/chatroom.actions";

const ChatPageChatList = () => {
  const { chatrooms, messages, userInfo } = useChatPageContext();
  const [showChatRoomList, setShowChatRoomList] = useState(false);
  const [chatroomsList, setChatroomsList] = useState(chatrooms);

  useEffect(() => {
    const fetchChatrooms = async () => {
      const chatrooms = await getUserChatrooms(userInfo.id);
      setChatroomsList(chatrooms);
    };
    fetchChatrooms();
  }, [messages]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 767) {
        setShowChatRoomList(true);
      } else {
        setShowChatRoomList(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="flex h-full w-full flex-col md:max-w-[27.5rem]">
      <div
        className="bg-light p-4 dark:bg-dark-2
    md:p-6"
      >
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
