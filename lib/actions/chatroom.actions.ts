"use server";

import prisma from "@/lib/prisma";

import {
  ChatroomType,
  CreateMessageType,
  EditMessageType,
} from "@/types/chatroom.index";

export async function createChatroom(userIds: number[]) {
  try {
    const chatroom = await prisma.chatroom.create({
      data: {},
    });

    await Promise.all(
      userIds.map((userId) =>
        prisma.chatroomUsers.create({
          data: {
            userId,
            chatroomId: chatroom.id,
          },
        })
      )
    );

    return chatroom;
  } catch (error) {
    console.error("Error creating chatroom:", error);
    throw error;
  }
}

export async function addUserToChatroom(data: ChatroomType) {
  try {
    const { userId, chatroomId } = data;

    const chatroomUser = await prisma.chatroomUsers.create({
      data: {
        userId,
        chatroomId,
      },
    });

    return chatroomUser;
  } catch (error) {
    console.error("Error adding user to chatroom:", error);
    throw error;
  }
}

export async function removeUserFromChatroom(data: ChatroomType) {
  try {
    const { userId, chatroomId } = data;

    const chatroomUser = await prisma.chatroomUsers.deleteMany({
      where: {
        userId,
        chatroomId,
      },
    });

    return chatroomUser;
  } catch (error) {
    console.error("Error removing user from chatroom:", error);
    throw error;
  }
}

export async function deleteChatroom(chatroomId: number) {
  try {
    await prisma.chatroomUsers.deleteMany({
      where: {
        chatroomId,
      },
    });

    const chatroom = await prisma.chatroom.delete({
      where: {
        id: chatroomId,
      },
    });

    return chatroom;
  } catch (error) {
    console.error("Error deleting chatroom:", error);
    throw error;
  }
}

export async function createMessage(data: CreateMessageType) {
  try {
    const { text, userId, chatroomId } = data;

    const message = await prisma.message.create({
      data: {
        text,
        userId,
        chatroomId,
      },
    });

    return message;
  } catch (error) {
    console.error("Error creating message:", error);
    throw error;
  }
}

export async function deleteMessage(messageId: number) {
  try {
    const message = await prisma.message.delete({
      where: {
        id: messageId,
      },
    });

    return message;
  } catch (error) {
    console.error("Error deleting message:", error);
    throw error;
  }
}

export async function editMessage(data: EditMessageType) {
  try {
    const { messageId, newText } = data;

    const message = await prisma.message.update({
      where: {
        id: messageId,
      },
      data: {
        text: newText,
      },
    });

    return message;
  } catch (error) {
    console.error("Error editing message:", error);
    throw error;
  }
}

export async function getMessagesForChatroom(chatroomId: number) {
  try {
    const messages = await prisma.message.findMany({
      where: {
        chatroomId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return messages;
  } catch (error) {
    console.error("Error retrieving messages for chatroom:", error);
    throw error;
  }
}
