"use client";

import { useEffect } from "react";
import { useChannel, usePresence } from "ably/react";

import useChatStore from "@/app/chatStore";
import { BaseUserInfo } from "@/types/profile.index";

const ChatPresenceManager = ({ userInfo }: { userInfo: BaseUserInfo }) => {
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
  }, [channel]);

  return null;
};

export default ChatPresenceManager;
