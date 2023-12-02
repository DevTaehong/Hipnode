import { usePresence } from "ably/react";

import { ChatroomDetail } from "@/types/chatroom.index";
import { ChatPageChatList, ChatPageLiveChat } from ".";

const LiveChatPageLayout = ({ chatrooms }: { chatrooms: ChatroomDetail[] }) => {
  const { presenceData } = usePresence("hipnode-livechat");

  const onlineUserIds =
    presenceData
      ?.map((presence) => presence.data?.id)
      .filter((id) => id !== undefined) || [];

  return (
    <main className="bg-light-2_dark-2 -mt-16 flex h-screen min-h-screen w-screen justify-center pt-16">
      <section
        className="flex h-full w-full max-w-[90rem] border-x border-sc-6
dark:border-dark-4"
      >
        <ChatPageChatList chatrooms={chatrooms} onlineUsers={onlineUserIds} />
        <ChatPageLiveChat onlineUsers={onlineUserIds} />
      </section>
    </main>
  );
};

export default LiveChatPageLayout;
