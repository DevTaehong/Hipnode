"use client";

import { useEffect } from "react";
import { useChannel, usePresence } from "ably/react";

import useChatStore from "@/app/chatStore";
import NavBarChatList from "./NavBarChatList";
import { ChatPageLinkProps } from "@/types/searchbar.index";

const ChatPageLink = ({ userInfo, userChatrooms }: ChatPageLinkProps) => {
  const { setOnlineUsers } = useChatStore();

  const { presenceData } = usePresence("online-user");
  const { channel } = useChannel("online-user");

  useEffect(() => {
    setOnlineUsers(
      presenceData.map((presenceItem) => presenceItem.data?.userId)
    );
  }, [presenceData]);

  useEffect(() => {
    channel.presence.enter({ userId: userInfo.id });

    return () => {
      channel.presence.leave({ userId: userInfo.id });
    };
  }, [channel, userInfo.id]);

  return <NavBarChatList userChatrooms={userChatrooms} />;
};

export default ChatPageLink;
