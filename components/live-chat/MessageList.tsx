import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import FillIcon from "../icons/fill-icons";
import { getAllUsers } from "@/lib/actions/user.actions";
import { ChatProps } from "@/types/chatroom.index";
import useChatStore from "@/app/chatStore";
import {
  getAllOnlineUserIds,
  recreateOnlineUser,
} from "@/lib/actions/online-user.actions";
import { UsersToMessage } from ".";

const MessageList = () => {
  const { userInfo, setOnlineUsers } = useChatStore();
  const { id } = userInfo;

  const [users, setUsers] = useState<ChatProps[]>([]);

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
    const fetchUsers = async () => {
      try {
        const allUsers = await getAllUsers();
        setUsers(allUsers);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };
    fetchUsers();
  }, []);

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

  return (
    <Popover>
      <PopoverTrigger>
        <div className="cursor-pointer xl:rounded-lg xl:bg-light-2 xl:p-2 dark:xl:bg-dark-4">
          <FillIcon.Message className="fill-sc-4 dark:fill-sc-6" />
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <section className="h-fit w-48 bg-white p-3">
          <UsersToMessage users={users} />
        </section>
      </PopoverContent>
    </Popover>
  );
};

export default MessageList;
