import React, { useEffect, useState } from "react";
import { useChannel, usePresence } from "ably/react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import FillIcon from "../icons/fill-icons";
import UsersToMessage from "./UsersToMessage";
import { getAllUsers } from "@/lib/actions/user.actions";
import { ChatProps, OnlineUserProps } from "@/types/chatroom.index";

const MessageList = ({ userId, username, userImage }: OnlineUserProps) => {
  const [users, setUsers] = useState<ChatProps[]>([]);

  const { channel } = useChannel("hipnode-livechat", () => {});
  const { presenceData } = usePresence("hipnode-livechat", {
    data: { id: userId, username, image: userImage },
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getAllUsers();
        const onlineUserIds = new Set(
          presenceData
            .map((presence) => {
              if (
                presence.data &&
                typeof presence.data === "object" &&
                "id" in presence.data
              ) {
                return presence.data.id;
              }
              return null;
            })
            .filter((id) => id !== null)
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
      id: userId,
      username,
      image: userImage,
    });

    return () => {
      channel.presence.leave();
    };
  }, [channel.presence, userId, username, userImage]);

  return (
    <Popover>
      <PopoverTrigger>
        <div className="cursor-pointer rounded-lg bg-light-2 p-2 dark:bg-dark-4">
          <FillIcon.Message className="fill-sc-4 dark:fill-sc-6" />
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="h-fit w-48 bg-white p-3">
          <UsersToMessage
            users={users}
            userId={userId}
            username={username}
            userImage={userImage}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MessageList;
