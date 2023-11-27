import { User } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

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

export interface ChatroomUser {
  id: number;
  username: string | undefined;
  image: string;
}

export interface ChatroomMap {
  [chatroomId: number]: Set<number>;
}

export interface UserInfo {
  id: number;
  username: string;
  image: string;
}

export interface ChatMessage {
  connectionId?: string;
  data: {
    user: ChatroomUser;
    messageId: number;
    attachment?: string | null;
    attachmentType?: string | null;
    chatroomId?: number;
    text: string | null;
  };
}
export interface loadMessagesProps {
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>;
  chatroomId: number | null;
  chatroomUsers: ChatroomUser[];
}

export interface useDropzoneHandlerProps {
  setMediaType: Dispatch<SetStateAction<string>>;
  setDroppedFile: Dispatch<SetStateAction<File | File[] | null>>;
  setAttachmentPreview: Dispatch<SetStateAction<string | null>>;
}

export interface RenderPreviewProps {
  mediaType: string;
  attachmentPreview: string;
}
