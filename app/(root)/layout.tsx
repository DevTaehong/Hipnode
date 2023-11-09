import React from "react";

import Navbar from "@/components/navbar/Navbar";
import PodcastPlayer from "@/components/podcast-components/PodcastPlayer";
import Chat from "@/components/live-chat/Chat";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Navbar />
      {children}
      <Chat />
      <PodcastPlayer />
    </main>
  );
}
