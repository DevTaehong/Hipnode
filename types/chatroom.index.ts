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
  droppedFile: File | File[];
  setDroppedFile: (value: File | null) => void;
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
  setDroppedFile: Dispatch<SetStateAction<File | File[] | null>>;
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
  droppedFile: File | File[] | null;
  channel: Types.RealtimeChannelPromise;
  chatroomId: number | null;
  inputBox: RefObject<HTMLFormElement | HTMLInputElement>;
  currentUser: CurrentUser;
}
