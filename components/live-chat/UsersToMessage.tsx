import Image from "next/image";
import { PopoverClose } from "@radix-ui/react-popover";

import { ChatProps } from "@/types/chatroom.index";
import useChatStore from "@/app/chatStore";
import { useGetOnlineUsers } from "../chat-page/presenceData";

interface UsersToMessageProps {
  users: ChatProps[];
}

const UsersToMessage = ({ users }: UsersToMessageProps) => {
  const {
    setChatroomUsers,
    setShowChat,
    createNewChatroom,
    userInfo,
    setChatroomId,
  } = useChatStore();

  const onlineUsers = useGetOnlineUsers();

  const handleUserClick = (clickedUserId: number) => {
    const clickedUser = users.find((user) => user.id === clickedUserId);

    if (clickedUser) {
      const chatroomUsers = [
        userInfo,
        {
          id: clickedUser.id,
          username: clickedUser.username,
          image: clickedUser.picture,
          name: clickedUser.name,
        },
      ];
      setChatroomId(null);
      setChatroomUsers(chatroomUsers);
      setShowChat(true);
      createNewChatroom();
    }
  };

  return (
    <ul className="flex flex-col gap-1">
      {users &&
        users.map((user) => {
          const { id, username, picture } = user;
          const isOnline = onlineUsers.includes(id);
          return (
            <PopoverClose key={id}>
              <li
                className="flex cursor-pointer items-center justify-between gap-2"
                onClick={() => handleUserClick(id)}
              >
                <span>{username}</span>
                <figure className="flex h-5 w-5">
                  <Image
                    src={picture}
                    alt={`profile image for ${username}`}
                    height={20}
                    width={20}
                    className="rounded-full"
                  />
                </figure>
                <div
                  className={`h-3.5 w-3.5 rounded-full ${
                    isOnline ? "bg-green-500" : "bg-slate-400"
                  }`}
                />
              </li>
            </PopoverClose>
          );
        })}
    </ul>
  );
};

export default UsersToMessage;
