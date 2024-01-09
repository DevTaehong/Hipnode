import { create } from "zustand";

import {
  createChatroom,
  getAllChatroomUsers,
} from "@/lib/actions/chatroom.actions";
import { ChatroomUser, UserInfo } from "@/types/chatroom.index";
import { API_RESULT } from "@/utils/chat-functions";
interface ChatroomMap {
  [chatroomId: number]: Set<number>;
}

interface ChatStoreState {
  userId: number | null;
  setUserId: (id: number | null) => void;
  chatroomUsers: ChatroomUser[];
  setChatroomUsers: (users: ChatroomUser[]) => void;
  createNewChatroom: () => Promise<API_RESULT.SUCCESS | undefined>;
  showChat: boolean;
  setShowChat: (show: boolean) => void;
  chatroomId: number | null;
  setChatroomId: (id: number | null) => void;
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
  onlineUsers: number[] | null;
  setOnlineUsers: (users: number[] | null) => void;
}

const useChatStore = create<ChatStoreState>((set) => ({
  userId: null,
  setUserId: (id: number | null) => set({ userId: id }),
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
        return API_RESULT.SUCCESS;
      } else {
        const newChatroomId = await createChatroom(Array.from(userIds));
        set({ chatroomId: newChatroomId.id });
        return API_RESULT.SUCCESS;
      }
    }
  },
  showChat: false,
  setShowChat: (show: boolean) => set({ showChat: show }),
  chatroomId: null,
  setChatroomId: (id: number | null) => set({ chatroomId: id }),
  userInfo: { id: 0, username: "", image: "" },
  setUserInfo: (userInfo: UserInfo) => set({ userInfo }),
  onlineUsers: null,
  setOnlineUsers: (users: number[] | null) => set({ onlineUsers: users }),
}));

export default useChatStore;
