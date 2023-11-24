import { User } from "@prisma/client";

export type ChatroomType = {
  userId: number;
  chatroomId: number;
};

export type CreateMessageType = {
  text?: string;
  userId: number;
  chatroomId: number;
  attachment: string;
};

export type EditMessageType = {
  messageId: number;
  newText: string;
};

export interface ChatMessage {
  connectionId?: string;
  data: {
    user: {
      id: string;
      username: string;
      image: string;
    };
    attachment?: string | null;
    chatroomId?: number;
    text: string | null;
  };
}

export interface MessageToSend {
  text?: string;
  userId: number | null;
  chatroomId: number | null;
  attachment?: string;
}

export interface ChatProps extends User {
  online?: boolean;
}

export interface ImagePreviewProps {
  setImagePreview: (value: string | null) => void;
  setDroppedFile: (value: File | null) => void;
  imagePreview: string;
  mediaType: string;
}

export interface LiveChatAudioPlayerProps {
  displayTime: number;
  isPlaying: boolean;
  togglePlayPause: () => void;
}
