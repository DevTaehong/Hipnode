"use client";

import * as Ably from "ably";
import { AblyProvider } from "ably/react";
import ChatBox from "./ChatBox";

interface ChatProps {
  username: string;
  userImage: string;
}

export default function Chat({ username, userImage }: ChatProps) {
  const client = new Ably.Realtime.Promise({ authUrl: "/api/chat" });

  return (
    <AblyProvider client={client}>
      <ChatBox username={username} userImage={userImage} />
    </AblyProvider>
  );
}
