import React from "react";

import Navbar from "@/components/navbar/Navbar";
import PodcastPlayer from "@/components/podcast-components/PodcastPlayer";
import { Toaster } from "@/components/ui/toaster";
import LiveChatWrapper from "@/components/live-chat/LiveChatWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Navbar />
      {children}
      <LiveChatWrapper />
      <PodcastPlayer />
      <Toaster />
    </main>
  );
}
