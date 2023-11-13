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
