import React, { useState, useEffect } from "react";
import { useChannel, usePresence } from "ably/react";
import { getAllUsers } from "@/lib/actions/user.actions";
import Image from "next/image";
import { OnlineUserProps } from "@/types/chatroom.index";
import { User } from "@prisma/client";
import useChatStore from "@/app/chatStore";

interface ChatProps extends User {
  online?: boolean;
}

const UsersToMessage = ({ userId, username, userImage }: OnlineUserProps) => {
  const [users, setUsers] = useState<ChatProps[]>([]);
  const { setChatroomUserIds, chatroomUserIds } = useChatStore();

  const { channel } = useChannel("chat-demo", () => {});
  const { presenceData } = usePresence("chat-demo", {
    data: { id: userId, username, image: userImage },
  });

  const handleUserClick = (id: number) => {
    console.log(id);
    console.log(userId);
    console.log("function called");
    setChatroomUserIds([id, userId]);
    console.log(chatroomUserIds);
  };

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
    <div className="flex flex-col gap-1">
      {users &&
        users.map((user) => {
          const { id, username, picture, online } = user;
          return (
            <div
              key={id}
              className="flex cursor-pointer items-center justify-between gap-2"
              onClick={() => handleUserClick(id)}
            >
              <p>{username}</p>
              <div className="flex h-5 w-5">
                <Image
                  src={picture}
                  alt={`profile image for ${username}`}
                  height={20}
                  width={20}
                  className="rounded-full"
                />
              </div>
              <div
                className={`h-3.5 w-3.5 rounded-full ${
                  online ? "bg-green-500" : "bg-slate-400"
                }`}
              />
            </div>
          );
        })}
    </div>
  );
};

export default UsersToMessage;
