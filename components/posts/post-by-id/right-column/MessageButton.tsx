"use client";

import useChatStore from "@/app/chatStore";
import FillIcon from "@/components/icons/fill-icons";
import { BaseUserInfo } from "@/types/profile.index";

const MessageButton = ({
  userInfo: chatroomUserInfo,
}: {
  userInfo: BaseUserInfo;
}) => {
  const {
    setChatroomUsers,
    setShowChat,
    createNewChatroom,
    userInfo,
    showChat,
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
      setChatroomUsers(chatroomUsers);
      setShowChat(true);
      createNewChatroom();
    }
  };

  return (
    <button
      disabled={showChat}
      onClick={() => handleUserClick(id)}
      className="hover-effect mb-[1.25rem] flex w-full items-center justify-center gap-x-5 rounded-md bg-blue p-[0.625rem] text-[1.125rem] leading-[1.625rem] text-light"
    >
      <FillIcon.Message className="fill-light" />
      Message
    </button>
  );
};

export default MessageButton;
