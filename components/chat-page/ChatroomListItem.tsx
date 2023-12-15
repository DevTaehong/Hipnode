import Image from "next/image";
import { useChannel } from "ably/react";

import { formatRelativeTime } from "@/utils";
import useChatStore from "@/app/chatStore";
import { ChatroomListItemProps, UserTyping } from "@/types/chatroom.index";
import { useChatPageContext } from "@/app/contexts/ChatPageContext";
import { useGetOnlineUsers } from "./presenceData";
import { useMemo, useState } from "react";

const ChatroomListItem = ({
  chatroom,
  setShowChatRoomList,
}: ChatroomListItemProps) => {
  const { setChatroomId, setChatroomUsers, chatroomId } = useChatStore();
  const { userInfo } = useChatPageContext();
  const onlineUsers = useGetOnlineUsers();

  const [userTyping, setUserTyping] = useState<UserTyping | null>(null);

  const {
    id: chatroomListId,
    recentMessage: {
      text: recentMessageText,
      createdAt: recentMessageCreatedAt,
    },
    otherUser,
  } = chatroom;

  useChannel("hipnode-livechat-typing-status", (message) => {
    setUserTyping(message.data);
  });

  const isChatroomUserTyping = useMemo(() => {
    if (!userTyping) return false;
    return userTyping.isTyping && userTyping.userId === otherUser.id;
  }, [userTyping]);

  if (!otherUser) return null;

  const isOtherUserOnline = onlineUsers
    ? onlineUsers.includes(otherUser.id)
    : false;

  const formattedTime = formatRelativeTime(recentMessageCreatedAt);

  const handleChatroomClick = () => {
    if (userInfo && otherUser.id) {
      setChatroomUsers([
        userInfo,
        {
          id: otherUser.id,
          username: otherUser.username,
          image: otherUser.picture,
          name: otherUser.name,
        },
      ]);
      setChatroomId(chatroomListId);
      if (window.innerWidth < 768) {
        setShowChatRoomList(false);
      }
    }
  };

  return (
    <li
      className={`flex cursor-pointer flex-col gap-4 border-b border-sc-6 bg-light p-4 hover:bg-light-2 dark:border-dark-4 dark:bg-dark-2
    hover:dark:bg-dark-3 ${
      chatroomId === chatroomListId && "bg-light-2 dark:bg-dark-3"
    }`}
      onClick={handleChatroomClick}
    >
      <div className="flex w-full justify-between">
        <div className="flex gap-3">
          <figure className="relative flex h-10 w-10">
            <Image
              src={otherUser.picture}
              alt={`profile image for ${otherUser.name}`}
              height={40}
              width={40}
              className="shrink-0 rounded-full"
            />
            {isOtherUserOnline && (
              <figcaption className="absolute bottom-0 right-0 h-3 w-3 rounded-full border border-sc-2 bg-green-500 dark:border-light" />
            )}
          </figure>
          <div className="flex h-full flex-col justify-between">
            <p className="bold-14 text-sc-2_light">{otherUser.name}</p>
            <p className="regular-14 text-sc-4 dark:text-light-2">
              @{otherUser.username}
            </p>
          </div>
        </div>
        <time className="regular-14 text-sc-2_light">{formattedTime}</time>
      </div>
      <div>
        {isChatroomUserTyping ? (
          <p className="regular-14 text-sc-4">
            {otherUser.username} is typing...
          </p>
        ) : (
          <p className="regular-14 line-clamp-2 text-sc-4">
            {recentMessageText}
          </p>
        )}
      </div>
    </li>
  );
};

export default ChatroomListItem;
