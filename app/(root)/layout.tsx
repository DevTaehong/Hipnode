import React from "react";

import Navbar from "@/components/navbar/Navbar";
import PodcastPlayer from "@/components/podcast-components/PodcastPlayer";
import ChatUserInfo from "@/components/live-chat/ChatUserInfo";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Navbar />
      {children}
      <ChatUserInfo />
      <PodcastPlayer />
      <Toaster />
    </main>
  );
}
