import { usePresence } from "ably/react";

import { ChatroomDetail } from "@/types/chatroom.index";
import ChatPageChatList from "./ChatPageChatList";
import ChatPageLiveChat from "./ChatPageLiveChat";

const LiveChatPageLayout = ({ chatrooms }: { chatrooms: ChatroomDetail[] }) => {
  const { presenceData } = usePresence("hipnode-livechat");
  const onlineUserIds = presenceData.map((presence) => presence.data.id);

  return (
    <main className="bg-light-2_dark-2 -mt-16 flex h-screen min-h-screen w-screen justify-center pt-16">
      <section className="flex h-full w-full max-w-[90rem]">
        <ChatPageChatList chatrooms={chatrooms} onlineUsers={onlineUserIds} />
        <ChatPageLiveChat />
      </section>
    </main>
  );
};

export default LiveChatPageLayout;
