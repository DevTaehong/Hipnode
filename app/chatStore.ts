import {
  createChatroom,
  getAllChatroomUsers,
} from "@/lib/actions/chatroom.actions";
import { create } from "zustand";

interface ChatroomUser {
  id: number;
  username: string;
  picture: string;
}

interface ChatroomMap {
  [chatroomId: number]: Set<number>;
}

interface UserInfo {
  id: number;
  username: string;
  image: string;
}

interface ChatStoreState {
  chatroomUsers: ChatroomUser[];
  setChatroomUsers: (users: ChatroomUser[]) => void;
  createNewChatroom: () => Promise<void>;
  showChat: boolean;
  setShowChat: (show: boolean) => void;
  chatroomId: number | null;
  setChatroomId: (id: number | null) => void;
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
}

const useChatStore = create<ChatStoreState>((set) => ({
  chatroomUsers: [],
  setChatroomUsers: (users: ChatroomUser[]) => set({ chatroomUsers: users }),
  createNewChatroom: async () => {
    const { chatroomUsers } = useChatStore.getState();
    if (chatroomUsers.length > 0) {
      const userIds = new Set(chatroomUsers.map((user) => user.id));
      const existingChatroomUsers = await getAllChatroomUsers();

      const chatroomsMap = existingChatroomUsers.reduce(
        (acc: ChatroomMap, chatroomUser) => {
          if (!acc[chatroomUser.chatroomId]) {
            acc[chatroomUser.chatroomId] = new Set();
          }
          acc[chatroomUser.chatroomId].add(chatroomUser.userId);
          return acc;
        },
        {} as ChatroomMap
      );

      let existingChatroomId: number | null = null;
      for (const [chatroomId, userSet] of Object.entries(chatroomsMap)) {
        const chatroomIdNumber = parseInt(chatroomId, 10);
        const isMatchingChatroom =
          [...userSet].every((userId) => userIds.has(userId)) &&
          userSet.size === userIds.size;
        if (isMatchingChatroom) {
          existingChatroomId = chatroomIdNumber;
          break;
        }
      }

      if (existingChatroomId !== null) {
        set({ chatroomId: existingChatroomId });
      } else {
        const newChatroomId = await createChatroom(Array.from(userIds));
        set({ chatroomId: newChatroomId.id });
      }
    }
  },
  showChat: false,
  setShowChat: (show: boolean) => set({ showChat: show }),
  chatroomId: null,
  setChatroomId: (id: number | null) => set({ chatroomId: id }),
  userInfo: { id: 0, username: "", image: "" },
  setUserInfo: (userInfo: UserInfo) => set({ userInfo }),
}));

export default useChatStore;
