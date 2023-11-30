import Image from "next/image";

import { ChatroomDetail } from "@/types/chatroom.index";
import { formatRelativeTime } from "@/utils";

const ChatroomListItem = ({
  chatroom,
  onlineUsers,
}: {
  chatroom: ChatroomDetail;
  onlineUsers?: number[];
}) => {
  const {
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

  return (
    <li className="flex cursor-pointer flex-col gap-4 border-b border-sc-6 p-4 hover:bg-light-2 dark:border-dark-4 hover:dark:bg-dark-4">
      <div className="flex w-full justify-between">
        <div className="flex gap-3">
          <div className="relative flex h-10 w-10">
            <Image
              src={otherUserPicture}
              alt={`profile image for ${otherUserName}`}
              height={40}
              width={40}
              className="shrink-0 rounded-full"
            />
            {isOtherUserOnline && (
              <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border border-sc-2 bg-green-500 dark:border-light" />
            )}
          </div>
          <div className="flex h-full flex-col justify-between">
            <p className="bold-14 text-sc-2_light">{otherUserName}</p>
            <p className="regular-14 text-sc-4 dark:text-light-2">
              @{otherUserUsername}
            </p>
          </div>
        </div>
        <p className="regular-14 text-sc-2_light">{formattedTime}</p>
      </div>
      <div>
        <p className="regular-14 line-clamp-2 text-sc-4">{recentMessageText}</p>
      </div>
    </li>
  );
};

export default ChatroomListItem;
