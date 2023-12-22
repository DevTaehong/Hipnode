import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import FillIcon from "../icons/fill-icons";
import UsersToMessage from "./UsersToMessage";
import { getAllUsers } from "@/lib/actions/user.actions";
import { ChatProps } from "@/types/chatroom.index";
import useChatStore from "@/app/chatStore";
import {
  addUserToOnlineUsers,
  removeUserFromOnlineUsers,
} from "@/lib/actions/online-user.actions";

const MessageList = () => {
  const { userInfo } = useChatStore();
  const { id } = userInfo;

  const [users, setUsers] = useState<ChatProps[]>([]);

  useEffect(() => {
    const handleAddUser = async () => {
      try {
        await addUserToOnlineUsers(id);
      } catch (error) {
        console.error("Error adding user to online users:", error);
      }
    };
    if (id > 0) {
      handleAddUser();
    }
  }, [id]);

  useEffect(() => {
    const handleUnload = async () => {
      try {
        await removeUserFromOnlineUsers(id);
      } catch (error) {
        console.error("Error removing user from online users:", error);
      }
    };
    if (id > 0) {
      window.addEventListener("beforeunload", handleUnload);
    }
    return () => {
      if (id > 0) {
        window.removeEventListener("beforeunload", handleUnload);
      }
    };
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
