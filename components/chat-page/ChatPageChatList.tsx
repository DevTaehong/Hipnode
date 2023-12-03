import { useEffect, useState } from "react";

import { ChatPageChatListProps } from "@/types/chatroom.index";
import { ChatPageSearchBar, ChatroomListItem } from ".";
import { getUserChatrooms } from "@/lib/actions/chatroom.actions";

const ChatPageChatList = ({
  chatrooms,
  onlineUsers,
  messages,
  userInfo,
}: ChatPageChatListProps) => {
  const [chatroomsList, setChatroomsList] = useState(chatrooms);

  useEffect(() => {
    const fetchChatrooms = async () => {
      const chatrooms = await getUserChatrooms(userInfo.id);
      setChatroomsList(chatrooms);
    };
    fetchChatrooms();
  }, [messages]);

  return (
    <section className="flex h-full w-full max-w-[27.5rem] flex-col">
      <div
        className="bg-light p-6
    dark:bg-dark-2"
      >
        <p className="bold-18 text-sc-2_light">Messages</p>
      </div>
      <ChatPageSearchBar />
      <ul className="flex h-screen w-full flex-col overflow-scroll">
        {chatroomsList.map((chatroom) =>
          chatroom.recentMessage ? (
            <ChatroomListItem
              key={chatroom.id}
              chatroom={chatroom}
              onlineUsers={onlineUsers}
              userInfo={userInfo}
            />
          ) : null
        )}
      </ul>
    </section>
  );
};

export default ChatPageChatList;
