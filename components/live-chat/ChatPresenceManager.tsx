"use client";

import { useEffect, useMemo } from "react";
import { useChannel, usePresence } from "ably/react";

import useChatStore from "@/app/chatStore";
import { BaseUserInfo } from "@/types/profile.index";

const ChatPresenceManager = ({ userInfo }: { userInfo: BaseUserInfo }) => {
  const { setOnlineUsers } = useChatStore();
  const { presenceData } = usePresence("online-user");
  const { channel } = useChannel("online-user");

  const onlineUserIds = useMemo(
    () => presenceData.map((presenceItem) => presenceItem.data?.userId),
    [presenceData]
  );

  useEffect(() => {
    if (onlineUserIds) setOnlineUsers(onlineUserIds);
  }, [onlineUserIds]);

  useEffect(() => {
    try {
      channel.presence.enter({ userId: userInfo.id });
    } catch (error) {
      console.error("Error entering presence", error);
    }

    return () => {
      try {
        channel.presence.leave({ userId: userInfo.id });
      } catch (error) {
        console.error("Error leaving presence", error);
      }
    };
  }, [channel]);

  return null;
};

export default ChatPresenceManager;
