import React from "react";
import { redirect } from "next/navigation";

import Navbar from "@/components/navbar/Navbar";
import PodcastPlayer from "@/components/podcast-components/PodcastPlayer";
import { Toaster } from "@/components/ui/toaster";
import LiveChatWrapper from "@/components/live-chat/LiveChatWrapper";
import { getUserByClerkId } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
  if (userId) {
    const user = await getUserByClerkId(userId);
    console.log(user?.onboarding);
    if (!user?.onboarding) redirect("/onboarding");
  }

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
