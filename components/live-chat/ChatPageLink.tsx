"use client";

import { useState, useEffect } from "react";
import { useChannel } from "ably/react";

import useChatStore from "@/app/chatStore";
import NavBarChatList from "./NavBarChatList";
import { ChatPageLinkProps } from "@/types/searchbar.index";

const ChatPageLink = ({ userInfo, userChatrooms }: ChatPageLinkProps) => {
  const { setOnlineUsers } = useChatStore();
  const [onlineUsersPresent, setOnlineUsersPresent] = useState<number[] | []>(
    []
  );

  const { channel } = useChannel("online-user", (message: any) => {
    const userOnlineInfo = message.data.data;

    if (userOnlineInfo.status === "online") {
      setOnlineUsersPresent((prevOnlineUsers: number[]) => {
        if (!prevOnlineUsers.includes(userOnlineInfo.userId)) {
          return [...prevOnlineUsers, userOnlineInfo.userId];
        } else {
          return prevOnlineUsers;
        }
      });
    } else {
      setOnlineUsersPresent((prevOnlineUsers) => {
        return prevOnlineUsers.filter(
          (userId) => userId !== userOnlineInfo.userId
        );
      });
    }
  });

  useEffect(() => {
    channel.publish("online-user", {
      data: {
        userId: userInfo.id,
        status: "online",
      },
    });

    return () => {
      channel.publish("online-user", {
        data: {
          userId: userInfo.id,
          status: "offline",
        },
      });
    };
  }, []);

  useEffect(() => {
    setOnlineUsers(onlineUsersPresent);
  }, [onlineUsersPresent]);

  return <NavBarChatList userChatrooms={userChatrooms} />;
};

export default ChatPageLink;
