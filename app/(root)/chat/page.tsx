import ChatPageWrapper from "@/components/chat-page/ChatPageWrapper";
import { getUserChatrooms } from "@/lib/actions/chatroom.actions";
import { getUserByClerkId } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";

const Chat = async () => {
  const { userId: clerkUserId } = auth();
  let userId;
  if (clerkUserId) {
    const user = await getUserByClerkId(clerkUserId);
    userId = user?.id || 0;
  }
  if (!userId) return null;

  const chatrooms = await getUserChatrooms(userId);
  return <ChatPageWrapper chatrooms={chatrooms} />;
};

export default Chat;
