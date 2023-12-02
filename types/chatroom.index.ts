import { User } from "@prisma/client";
import {
  Dispatch,
  SetStateAction,
  FormEvent,
  KeyboardEvent,
  RefObject,
} from "react";
import { Types } from "ably";

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
  name?: string;
}

export interface ChatroomMap {
  [chatroomId: number]: Set<number>;
}

export interface UserInfo {
  id: number;
  username: string;
  image: string;
  name?: string;
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
    createdAt?: Date;
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

export interface CurrentUser {
  id: number | null;
  username: string;
  image: string;
}

export interface LiveChatSubmissionProps {
  event: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLInputElement>;
  messageText: string;
  setMessageText: Dispatch<SetStateAction<string>>;
  droppedFile: File | File[] | null;
  setDroppedFile: Dispatch<SetStateAction<File | File[] | null>>;
  setAttachmentPreview: Dispatch<SetStateAction<string | null>>;
  setMediaType: Dispatch<SetStateAction<string>>;
  mediaType: string | null;
  channel: Types.RealtimeChannelPromise;
  chatroomId: number | null;
  inputBox: RefObject<HTMLFormElement | HTMLInputElement>;
  currentUser: CurrentUser;
}

interface RecentMessage {
  id: number;
  text: string | null;
  createdAt: Date;
  userId: number;
  chatroomId: number;
  attachment: string | null;
  attachmentType: string | null;
}

interface OtherUser {
  id: number;
  name: string;
  username: string;
  picture: string;
}

export interface ChatroomDetail {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  recentMessage: RecentMessage;
  otherUser: OtherUser;
}

export interface ChatBoxHeaderProps {
  otherUser: ChatroomUser;
  isUserOnline: boolean;
}

export interface ChatPageChatBoxProps {
  onlineUsers: number[];
  messages: ChatMessage[];
}
