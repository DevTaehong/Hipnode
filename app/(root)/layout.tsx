import React from "react";

import Navbar from "@/components/navbar/Navbar";
import PodcastPlayer from "@/components/podcast-components/PodcastPlayer";
import { Toaster } from "@/components/ui/toaster";
import { getUserByClerkId } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
  if (!!userId) {
    const user = await getUserByClerkId(userId);
    console.log(user?.onboarding);
    if (!user?.onboarding) redirect("/onboarding");
  }

  return (
    <main>
      <Navbar />
      {children}
      <PodcastPlayer />
      <Toaster />
    </main>
  );
}
