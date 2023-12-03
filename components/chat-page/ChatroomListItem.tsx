import Image from "next/image";

import { formatRelativeTime } from "@/utils";
import useChatStore from "@/app/chatStore";
import { ChatroomListItemProps } from "@/types/chatroom.index";

const ChatroomListItem = ({
  chatroom,
  onlineUsers,
  userInfo,
  setShowChatRoomList,
}: ChatroomListItemProps) => {
  const { setChatroomId, setChatroomUsers, chatroomId } = useChatStore();

  const {
    id: chatroomListId,
    recentMessage: {
      text: recentMessageText,
      createdAt: recentMessageCreatedAt,
    },
    otherUser: {
      id,
      name: otherUserName,
      username: otherUserUsername,
      picture: otherUserPicture,
    },
  } = chatroom;

  const isOtherUserOnline = onlineUsers ? onlineUsers.includes(id) : false;
  const formattedTime = formatRelativeTime(recentMessageCreatedAt);

  const handleChatroomClick = () => {
    if (userInfo && id) {
      setChatroomId(chatroomListId);
      setChatroomUsers([
        userInfo,
        {
          id,
          username: otherUserUsername,
          image: otherUserPicture,
          name: otherUserName,
        },
      ]);
      if (window.innerWidth < 768) {
        setShowChatRoomList(false);
      }
    }
  };

  return (
    <li
      className={`flex cursor-pointer flex-col gap-4 border-b border-sc-6 bg-light p-4 hover:bg-light-2 dark:border-dark-4 dark:bg-dark-2
    hover:dark:bg-dark-4 ${
      chatroomId === chatroomListId && "bg-light-2 dark:bg-dark-4"
    }`}
      onClick={handleChatroomClick}
    >
      <div className="flex w-full justify-between">
        <div className="flex gap-3">
          <figure className="relative flex h-10 w-10">
            <Image
              src={otherUserPicture}
              alt={`profile image for ${otherUserName}`}
              height={40}
              width={40}
              className="shrink-0 rounded-full"
            />
            {isOtherUserOnline && (
              <figcaption className="absolute bottom-0 right-0 h-3 w-3 rounded-full border border-sc-2 bg-green-500 dark:border-light" />
            )}
          </figure>
          <div className="flex h-full flex-col justify-between">
            <p className="bold-14 text-sc-2_light">{otherUserName}</p>
            <p className="regular-14 text-sc-4 dark:text-light-2">
              @{otherUserUsername}
            </p>
          </div>
        </div>
        <time className="regular-14 text-sc-2_light">{formattedTime}</time>
      </div>
      <div>
        <p className="regular-14 line-clamp-2 text-sc-4">{recentMessageText}</p>
      </div>
    </li>
  );
};

export default ChatroomListItem;
