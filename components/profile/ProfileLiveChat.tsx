"use client";

import React from "react";
import FillIcon from "../icons/fill-icons";
import useChatStore from "@/app/chatStore";
import { ChatUserInfoProps } from "@/types/profile.index";

const ProfileLiveChat = ({
  userInfo: chatroomUserInfo,
}: {
  userInfo: ChatUserInfoProps;
}) => {
  const {
    setChatroomUsers,
    setShowChat,
    createNewChatroom,
    userInfo,
    showChat,
    setChatroomId,
  } = useChatStore();

  const { id, username, image, name } = chatroomUserInfo;

  const handleUserClick = (clickedUserId: number) => {
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
      setChatroomId(null);
      setChatroomUsers(chatroomUsers);
      setShowChat(true);
      createNewChatroom();
    }
  };
  return (
    <button
      onClick={() => handleUserClick(id)}
      disabled={showChat}
      className="flex h-full items-center justify-center rounded-lg bg-blue-10 px-2.5 dark:bg-dark-4"
    >
      <FillIcon.Message className="fill-blue" />
    </button>
  );
};

export default ProfileLiveChat;
