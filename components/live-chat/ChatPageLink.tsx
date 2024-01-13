"use client";

import { useState, useEffect } from "react";
import { useChannel, usePresence } from "ably/react";

import useChatStore from "@/app/chatStore";
import NavBarChatList from "./NavBarChatList";
import { ChatPageLinkProps } from "@/types/searchbar.index";

const ChatPageLink = ({ userInfo, userChatrooms }: ChatPageLinkProps) => {
  const { setOnlineUsers, onlineUsers } = useChatStore();
  const [onlineUsersPresent, setOnlineUsersPresent] = useState<number[] | []>(
    []
  );

  const { presenceData } = usePresence("online-user");

  console.log(presenceData);
  console.log(onlineUsers);

  useEffect(() => {
    setOnlineUsersPresent(
      presenceData.map((presenceItem) => presenceItem.data.userId)
    );
  }, [presenceData]);

  const { channel } = useChannel("online-user", (message: any) => {
    console.log(message);
    // const userOnlineInfo = message.data.data;

    // if (userOnlineInfo.status === "online") {
    //   setOnlineUsersPresent((prevOnlineUsers: number[]) => {
    //     if (!prevOnlineUsers.includes(userOnlineInfo.userId)) {
    //       return [...prevOnlineUsers, userOnlineInfo.userId];
    //     } else {
    //       return prevOnlineUsers;
    //     }
    //   });
    // } else {
    //   setOnlineUsersPresent((prevOnlineUsers) => {
    //     return prevOnlineUsers.filter(
    //       (userId) => userId !== userOnlineInfo.userId
    //     );
    //   });
    // }
  });

  useEffect(() => {
    channel.presence.enter({ userId: userInfo.id, status: "online" });

    return () => {
      channel.presence.leave({ userId: userInfo.id, status: "offline" });
    };
  }, [channel, userInfo.id]);

  useEffect(() => {
    setOnlineUsers(onlineUsersPresent);
  }, [onlineUsersPresent]);

  return <NavBarChatList userChatrooms={userChatrooms} />;
};

export default ChatPageLink;
