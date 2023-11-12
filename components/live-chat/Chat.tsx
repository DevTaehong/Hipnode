"use client";

import * as Ably from "ably";
import { AblyProvider } from "ably/react";
import ChatBox from "./ChatBox";

interface ChatProps {
  username: string;
  userImage: string;
  userId: number;
}

export default function Chat({ username, userImage, userId }: ChatProps) {
  const client = new Ably.Realtime.Promise({
    key: "A5FjpQ.XY-aHQ:tMthK9szJfPHim5Fj7JulLYbQCViUdWdC4oXoWMqyAA",
    clientId: "your-ably-client-id",
  });

  return (
    <AblyProvider client={client}>
      <ChatBox username={username} userImage={userImage} userId={userId} />
    </AblyProvider>
  );
}
