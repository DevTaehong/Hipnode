import { User } from "@prisma/client";

export type ChatroomType = {
  userId: number;
  chatroomId: number;
};

export type CreateMessageType = {
  text?: string | null;
  userId: number;
  chatroomId: number;
  attachment: string | null;
  attachmentType: string | null;
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
    attachmentType?: string | null;
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

export interface AttachmentPreviewProps {
  setAttachmentPreview: (value: string | null) => void;
  setDroppedFile: (value: File | null) => void;
  attachmentPreview: string;
  mediaType: string;
}

export interface LiveChatAudioPlayerProps {
  displayTime: number;
  isPlaying: boolean;
  togglePlayPause: () => void;
}
