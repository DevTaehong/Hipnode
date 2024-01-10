"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import useChatStore from "@/app/chatStore";
import {
  getAllOnlineUserIds,
  recreateOnlineUser,
} from "@/lib/actions/online-user.actions";
import FillIcon from "../icons/fill-icons";
import { usePathname } from "next/navigation";
import { BaseUserInfo } from "@/types/profile.index";

const ChatPageLink = ({ userInfo }: { userInfo: BaseUserInfo }) => {
  const { id } = userInfo;
  const { setUserInfo, setOnlineUsers } = useChatStore();
  const path = usePathname();
  const [hover, setHover] = useState(false);

  const resetOnlineUsers = async () => {
    try {
      const onlineUserIds = await getAllOnlineUserIds();
      setOnlineUsers(onlineUserIds);
    } catch (error) {
      console.error("Error fetching online users:", error);
    }
  };

  useEffect(() => {
    const handleAddUser = async () => {
      try {
        await recreateOnlineUser(id);
        await resetOnlineUsers();
      } catch (error) {
        console.error("Error adding user to online users:", error);
      }
    };
    if (id > 0) {
      handleAddUser();
    }
  }, [id]);

  useEffect(() => {
    const resetUsersPeriodically = async () => {
      try {
        const recreatedUser = await recreateOnlineUser(id);
        if (recreatedUser) {
          await resetOnlineUsers();
        }
      } catch (error) {
        console.error("Error resetting online users periodically:", error);
      }
    };
    const intervalId = setInterval(() => {
      if (id > 0) {
        resetUsersPeriodically();
      }
    }, 120000);

    return () => clearInterval(intervalId);
  }, [id]);

  useEffect(() => {
    setUserInfo(userInfo);
  }, [userInfo]);

  const isActiveOrHovered = path === "/chat" || hover;
  const chatIconBackgroundColor = isActiveOrHovered
    ? "bg-red-80"
    : "bg-sc-6 dark:bg-dark-4";
  const chatIconFillColor = isActiveOrHovered
    ? "fill-white"
    : "fill-sc-4 dark:fill-sc-6";

  return (
    <Link
      href="/chat"
      className={`rounded-md p-2.5 ${chatIconBackgroundColor}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <FillIcon.Message className={chatIconFillColor} />
    </Link>
  );
};

export default ChatPageLink;
