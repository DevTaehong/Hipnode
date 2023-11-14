"use client";

import * as Ably from "ably";
import { AblyProvider } from "ably/react";
import UsersToMessage from "./UsersToMessage";
import { OnlineUserProps } from "@/types/chatroom.index";

const MessageList = ({ userId, username, userImage }: OnlineUserProps) => {
  const client = new Ably.Realtime.Promise({
    key: "A5FjpQ.XY-aHQ:tMthK9szJfPHim5Fj7JulLYbQCViUdWdC4oXoWMqyAA",
    clientId: "your-ably-client-id",
  });

  return (
    <AblyProvider client={client}>
      <div className="h-fit w-48 bg-white p-3">
        <UsersToMessage
          userId={userId}
          username={username}
          userImage={userImage}
        />
      </div>
    </AblyProvider>
  );
};

export default MessageList;
