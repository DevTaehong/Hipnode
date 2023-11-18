"use client";

import * as Ably from "ably";
import { AblyProvider } from "ably/react";
import LiveChat from "./LiveChat";

const LiveChatWrapper = () => {
  const client = new Ably.Realtime.Promise({
    key: process.env.NEXT_PUBLIC_ABLY_API_KEY,
    clientId: "hipnode",
  });
  return (
    <AblyProvider client={client}>
      <LiveChat />
    </AblyProvider>
  );
};

export default LiveChatWrapper;
