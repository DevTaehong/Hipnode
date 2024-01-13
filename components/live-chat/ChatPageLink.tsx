"use client";

import { useState, useEffect } from "react";
import { useChannel, usePresence } from "ably/react";

import useChatStore from "@/app/chatStore";
import NavBarChatList from "./NavBarChatList";
import { ChatPageLinkProps } from "@/types/searchbar.index";

const ChatPageLink = ({ userInfo, userChatrooms }: ChatPageLinkProps) => {
  const { setOnlineUsers } = useChatStore();
  const [onlineUsersPresent, setOnlineUsersPresent] = useState<number[] | []>(
    []
  );

  const { presenceData } = usePresence("online-user");

  useEffect(() => {
    setOnlineUsersPresent(
      presenceData.map((presenceItem) => presenceItem.data?.userId)
    );
  }, [presenceData]);

  const { channel } = useChannel("online-user");

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
