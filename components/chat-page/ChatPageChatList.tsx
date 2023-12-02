import { ChatPageChatListProps } from "@/types/chatroom.index";
import { ChatPageSearchBar, ChatroomListItem } from ".";

const ChatPageChatList = ({
  chatrooms,
  onlineUsers,
}: ChatPageChatListProps) => {
  return (
    <section className="flex h-full w-full max-w-[27.5rem] flex-col">
      <div
        className="bg-light p-4
    dark:bg-dark-2"
      >
        <p className="bold-18 text-sc-2_light">Messages</p>
      </div>
      <ChatPageSearchBar />
      <ul className="flex h-screen w-full flex-col overflow-scroll">
        {chatrooms.map((chatroom) =>
          chatroom.recentMessage ? (
            <ChatroomListItem
              key={chatroom.id}
              chatroom={chatroom}
              onlineUsers={onlineUsers}
            />
          ) : null
        )}
      </ul>
    </section>
  );
};

export default ChatPageChatList;
