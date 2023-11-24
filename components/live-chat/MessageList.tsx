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
  const { presenceData } = usePresence("hipnode-livechat", {
    id,
    username,
    image,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getAllUsers();
        const onlineUserIds = new Set(
          presenceData.map((presence) => presence.data?.id).filter(Boolean)
        );
        const combinedUsers = allUsers.map((user) => ({
          ...user,
          online: onlineUserIds.has(user.id),
        }));

        setUsers(combinedUsers);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, [presenceData]);

  useEffect(() => {
    channel.presence.enter({
      id,
      username,
      image,
    });

    return () => {
      channel.presence.leave();
    };
  }, [channel.presence, id, username, image]);

  return (
    <Popover>
      <PopoverTrigger>
        <div className="cursor-pointer rounded-lg bg-light-2 p-2 dark:bg-dark-4">
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
