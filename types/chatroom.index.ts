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
  chatPage?: boolean;
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
  setDroppedFile: Dispatch<SetStateAction<File | File[] | null>>;
}

export interface RenderPreviewProps {
  mediaType: string;
  attachmentPreview: string;
  chatPage?: boolean;
}

export interface CurrentUser {
  id: number | null;
  username: string | undefined;
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

type HandleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => void;

export interface ChatPageChatBoxProps {
  onlineUsers: number[];
  messages: ChatMessage[];
  inputProps: object;
  open: () => void;
  droppedFile: File | File[] | null;
  setDroppedFile: Dispatch<SetStateAction<File | File[] | null>>;
  messageText: string;
  setMessageText: Dispatch<SetStateAction<string>>;
  handleKeyDown: HandleKeyDown;
  handleFormSubmission: (event: FormEvent<HTMLFormElement>) => void;
  inputBox: RefObject<HTMLInputElement>;
}

export interface ChatPageProps {
  chatrooms: ChatroomDetail[];
  userInfo: UserInfo;
}

export interface ChatPageChatListProps {
  chatrooms: ChatroomDetail[];
  onlineUsers: number[] | undefined;
  messages: ChatMessage[];
  userInfo: UserInfo;
}

export interface ChatroomListItemProps {
  chatroom: ChatroomDetail;
  onlineUsers?: number[];
}

export interface ChatPageLiveChatProps {
  userInfo: UserInfo;
  onlineUsers: number[];
  otherUser: UserInfo;
  defaultChatroomId: number;
  messages: ChatMessage[];
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>;
}

export interface ChatPageInputProps {
  inputProps: object;
  open: () => void;
  droppedFile: File | File[] | null;
  setDroppedFile: Dispatch<SetStateAction<File | File[] | null>>;
  messageText: string;
  setMessageText: Dispatch<SetStateAction<string>>;
  handleKeyDown: HandleKeyDown;
  handleFormSubmission: (event: FormEvent<HTMLFormElement>) => void;
  inputBox: RefObject<HTMLInputElement>;
}
