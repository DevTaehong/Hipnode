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
