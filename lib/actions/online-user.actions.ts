"use server";

import prisma from "@/lib/prisma";

export async function addUserToOnlineUsers(userId: number) {
  try {
    const existingOnlineUser = await prisma.onlineUser.findUnique({
      where: {
        userId,
      },
    });

    let onlineUser;
    if (!existingOnlineUser) {
      onlineUser = await prisma.onlineUser.create({
        data: {
          userId,
        },
      });
    }

    return onlineUser;
  } catch (error) {
    console.error("Error adding user to online users:", error);
    throw error;
  }
}

export async function removeUserFromOnlineUsers(userId: number) {
  try {
    const existingOnlineUser = await prisma.onlineUser.findUnique({
      where: {
        userId,
      },
    });

    if (existingOnlineUser) {
      await prisma.onlineUser.delete({
        where: {
          userId,
        },
      });
      return "User removed from online users";
    } else {
      return "User not found in online users";
    }
  } catch (error) {
    console.error("Error removing user from online users:", error);
    throw error;
  }
}

export async function getAllOnlineUserIds() {
  try {
    const onlineUsers = await prisma.onlineUser.findMany({
      select: {
        userId: true,
      },
    });

    const userIds = onlineUsers.map((onlineUser) => onlineUser.userId);

    return userIds;
  } catch (error) {
    console.error("Error fetching user IDs of all online users:", error);
    throw error;
  }
}
