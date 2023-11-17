import { User } from "@prisma/client";

export type ChatroomType = {
  userId: number;
  chatroomId: number;
};

export type CreateMessageType = {
  text: string;
  userId: number;
  chatroomId: number;
};

export type EditMessageType = {
  messageId: number;
  newText: string;
};

export interface OnlineUserProps {
  userId: number;
  username: string;
  userImage: string;
}

export interface ChatMessage {
  connectionId?: string;
  data: {
    user: {
      id: string;
      username: string;
      image: string;
    };
    chatroomId?: number;
    text: string;
  };
}

export interface MessageToSend {
  text: string;
  userId: number | null;
  chatroomId: number | null;
}

export interface ChatProps extends User {
  online?: boolean;
}
