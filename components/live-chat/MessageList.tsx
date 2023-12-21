import React, { useEffect, useState } from "react";
import { useChannel, usePresence } from "ably/react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import FillIcon from "../icons/fill-icons";
import UsersToMessage from "./UsersToMessage";
import { getAllUsers } from "@/lib/actions/user.actions";
import { ChatProps } from "@/types/chatroom.index";
import useChatStore from "@/app/chatStore";

const MessageList = () => {
  const { userInfo } = useChatStore();
  const { id, username, image } = userInfo;

  const [users, setUsers] = useState<ChatProps[]>([]);

  const { channel } = useChannel("hipnode-livechat", () => {});
  usePresence("hipnode-livechat", {
    id,
    username,
    image,
  });

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
    channel.presence.enter({
      id,
      username,
      image,
    });
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
