import React from "react";

import Navbar from "@/components/navbar/Navbar";
import PodcastPlayer from "@/components/podcast-components/PodcastPlayer";
import { Toaster } from "@/components/ui/toaster";
import LiveChat from "@/components/live-chat/LiveChat";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Navbar />
      {children}
      <LiveChat />
      <PodcastPlayer />
      <Toaster />
    </main>
  );
}
