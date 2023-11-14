import { createChatroom } from "@/lib/actions/chatroom.actions";
import { create } from "zustand";

interface ChatStoreState {
  chatroomUserIds: number[];
  setChatroomUserIds: (ids: number[]) => void;
  createNewChatroom: () => Promise<void>;
}

const useChatStore = create<ChatStoreState>((set) => ({
  chatroomUserIds: [],
  setChatroomUserIds: (ids: number[]) => set({ chatroomUserIds: ids }),
  createNewChatroom: async () => {
    const { chatroomUserIds } = useChatStore.getState();
    if (chatroomUserIds.length > 0) {
      await createChatroom(chatroomUserIds);
      set({ chatroomUserIds: [] });
    }
  },
}));

export default useChatStore;
