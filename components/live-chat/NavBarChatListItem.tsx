"use client";

import Image from "next/image";
import { PopoverClose } from "@radix-ui/react-popover";

import { formatRelativeTime } from "@/utils";
import useChatStore from "@/app/chatStore";
import { UserChatroomProps } from "@/types/searchbar.index";

const NavBarChatListItem = ({ chatroom }: { chatroom: UserChatroomProps }) => {
  const { setChatroomUsers, setShowChat, createNewChatroom, userInfo } =
    useChatStore();

  const {
    recentMessage: {
      text: recentMessageText,
      createdAt: recentMessageCreatedAt,
    },
    otherUser: { id, username, picture: image, name },
  } = chatroom;

  const formattedTime = formatRelativeTime(recentMessageCreatedAt);

  const handleClick = (clickedUserId: number) => {
    const clickedUser = clickedUserId;

    if (clickedUser) {
      const chatroomUsers = [
        userInfo,
        {
          id,
          username,
          image,
          name,
        },
      ];
      setChatroomUsers(chatroomUsers);
      setShowChat(true);
      createNewChatroom();
    }
  };

  return (
    <PopoverClose
      className="flex cursor-pointer gap-2.5 px-5 py-2.5 hover:bg-light-2 dark:hover:bg-dark-3"
      onClick={() => handleClick(id)}
    >
      <Image
        src={image}
        alt={`profile image for ${name}`}
        height={40}
        width={40}
        className="shrink-0 rounded-full object-cover"
      />
      <div className="flex flex-col">
        <h3 className="semibold-16 text-sc-2_light-2 line-clamp-1 self-start truncate">
          {name} <span className="regular-12 text-sc-3">{formattedTime}</span>
        </h3>
        <p className="regular-12 self-start text-sc-3">{recentMessageText}</p>
      </div>
    </PopoverClose>
  );
};

export default NavBarChatListItem;
