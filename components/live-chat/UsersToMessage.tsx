import Image from "next/image";
import { PopoverClose } from "@radix-ui/react-popover";

import { OnlineUserProps, ChatProps } from "@/types/chatroom.index";
import useChatStore from "@/app/chatStore";

interface UsersToMessageProps extends OnlineUserProps {
  users: ChatProps[];
}

const UsersToMessage = ({
  users,
  userId,
  username,
  userImage,
}: UsersToMessageProps) => {
  const { setChatroomUsers, setShowChat, createNewChatroom } = useChatStore();

  const handleUserClick = (clickedUserId: number) => {
    const clickedUser = users.find((user) => user.id === clickedUserId);

    if (clickedUser) {
      const chatroomUsers = [
        { id: userId, username, picture: userImage },
        {
          id: clickedUser.id,
          username: clickedUser.username,
          picture: clickedUser.picture,
        },
      ];

      setChatroomUsers(chatroomUsers);
      setShowChat(true);
      createNewChatroom();
    }
  };

  return (
    <div className="flex flex-col gap-1">
      {users &&
        users.map((user) => {
          const { id, username, picture, online } = user;
          return (
            <PopoverClose key={id}>
              <div
                className="flex cursor-pointer items-center justify-between gap-2"
                onClick={() => handleUserClick(id)}
              >
                <p>{username}</p>
                <div className="flex h-5 w-5">
                  <Image
                    src={picture}
                    alt={`profile image for ${username}`}
                    height={20}
                    width={20}
                    className="rounded-full"
                  />
                </div>
                <div
                  className={`h-3.5 w-3.5 rounded-full ${
                    online ? "bg-green-500" : "bg-slate-400"
                  }`}
                />
              </div>
            </PopoverClose>
          );
        })}
    </div>
  );
};

export default UsersToMessage;
