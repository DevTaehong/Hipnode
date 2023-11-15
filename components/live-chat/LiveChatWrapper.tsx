"use client";

import * as Ably from "ably";
import { AblyProvider } from "ably/react";
import LiveChat from "./LiveChat";

const LiveChatWrapper = () => {
  const client = new Ably.Realtime.Promise({
    key: "A5FjpQ.XY-aHQ:tMthK9szJfPHim5Fj7JulLYbQCViUdWdC4oXoWMqyAA",
    clientId: "your-ably-client-id",
  });
  return (
    <AblyProvider client={client}>
      <LiveChat />
    </AblyProvider>
  );
};

export default LiveChatWrapper;
