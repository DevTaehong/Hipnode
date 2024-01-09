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
    <button onClick={() => handleUserClick(id)}>
      <FillIcon.Message className="fill-blue" />
    </button>
  );
};

export default ProfileLiveChat;
