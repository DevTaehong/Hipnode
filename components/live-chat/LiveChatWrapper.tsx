"use client";

import * as Ably from "ably";
import { AblyProvider } from "ably/react";
import { useEffect, useRef } from "react";

import LiveChat from "./LiveChat";

const LiveChatWrapper = () => {
  const client = useRef<Ably.Types.RealtimePromise>();

  useEffect(() => {
    if (!client.current) {
      client.current = new Ably.Realtime.Promise({
        key: process.env.NEXT_PUBLIC_ABLY_API_KEY,
        clientId: "hipnode",
      });
    }
  }, []);

  // if (!client.current) {
  //   return null;
  // }

  return (
    <AblyProvider client={client.current}>
      <LiveChat />
    </AblyProvider>
  );
};

export default LiveChatWrapper;
