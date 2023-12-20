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

export async function getAllChatroomUsers() {
  try {
    const chatroomUsers = await prisma.chatroomUsers.findMany();

    return chatroomUsers;
  } catch (error) {
    console.error("Error fetching chatroom users:", error);
    throw error;
  }
}

export async function getUserChatrooms(userId: number) {
  try {
    const userChatrooms = await prisma.chatroomUsers.findMany({
      where: {
        userId,
      },
      include: {
        Chatroom: {
          include: {
            Message: {
              take: 1,
              orderBy: {
                createdAt: "desc",
              },
            },
            ChatroomUsers: {
              where: {
                userId: {
                  not: userId,
                },
              },
              include: {
                User: {
                  select: {
                    id: true,
                    name: true,
                    username: true,
                    picture: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const chatroomsWithDetails = userChatrooms.map(({ Chatroom }) => {
      const recentMessage = Chatroom.Message[0] || null;
      const otherUser = Chatroom.ChatroomUsers[0]?.User || null;

      return {
        id: Chatroom.id,
        createdAt: Chatroom.createdAt,
        updatedAt: Chatroom.updatedAt,
        recentMessage,
        otherUser,
      };
    });

    chatroomsWithDetails.sort((a, b) => {
      const dateA = a.recentMessage
        ? new Date(a.recentMessage.createdAt).getTime()
        : 0;
      const dateB = b.recentMessage
        ? new Date(b.recentMessage.createdAt).getTime()
        : 0;

      return dateB - dateA;
    });

    return chatroomsWithDetails;
  } catch (error) {
    console.error("Error fetching chatrooms for user:", error);
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
    const message = await prisma.message.create({
      data,
    });

    return message;
  } catch (error) {
    console.error("Error creating message:", error);
    throw error;
  }
}

export async function deleteMessage(messageUUID: string) {
  try {
    const message = await prisma.message.findFirst({
      where: { messageUUID },
    });

    if (!message) {
      throw new Error("Message not found");
    }

    const deletedMessage = await prisma.message.delete({
      where: { id: message.id },
    });

    return deletedMessage;
  } catch (error) {
    console.error("Error deleting message:", error);
    throw error;
  }
}

export async function editMessage(data: EditMessageType) {
  const { messageUUID, text } = data;

  try {
    const message = await prisma.message.findFirst({
      where: { messageUUID },
    });

    if (!message) {
      throw new Error("Message not found");
    }
    const updatedMessage = await prisma.message.update({
      where: { id: message.id },
      data: { text },
    });

    return updatedMessage;
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
