import { auth, currentUser } from "@clerk/nextjs/server";

export const verifyAuth = async (
  message = "You must be logged in to perform this action."
) => {
  const user = auth();
  if (!user?.userId) throw new Error(message);

  const userData = await currentUser();
  const userId = userData?.publicMetadata?.userId as number;
  const clerkId = userData?.id;
  const loggedInUserImage = userData?.imageUrl;
  const userName = userData?.username;
  const fullName = userData?.firstName + " " + userData?.lastName;

  return { clerkId, userId, loggedInUserImage, userName, fullName };
};
