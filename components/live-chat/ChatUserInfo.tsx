import React from "react";
import Chat from "./Chat";
import { currentUser } from "@clerk/nextjs/server";
import { getUserByClerkId } from "@/lib/actions/user.actions";

const ChatUserInfo = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) return null;
  const user = await getUserByClerkId(clerkUser?.id);
  if (!user) return null;
  const { username, picture, id } = user;
  return <Chat username={username} userImage={picture} userId={id} />;
};

export default ChatUserInfo;
