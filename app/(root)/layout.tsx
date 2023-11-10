import React from "react";

import Navbar from "@/components/navbar/Navbar";
import PodcastPlayer from "@/components/podcast-components/PodcastPlayer";
import ChatUserInfo from "@/components/live-chat/ChatUserInfo";

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
    </main>
  );
}
