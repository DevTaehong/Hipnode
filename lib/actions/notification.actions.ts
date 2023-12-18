"use server";

import { Notification } from "@prisma/client";

import prisma from "@/lib/prisma";
import {
  CreateNotificationsParams,
  UpdateNotificationsParams,
  deleteNotificationParams,
} from "./shared.types";

export async function getNotificationCreateAtsByUserId(
  userId: number
): Promise<{ createdAt: Date }[]> {
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        userId,
      },
      select: {
        createdAt: true,
      },
    });

    if (!notifications) throw new Error("No notifications found");

    return notifications;
  } catch (error) {
    console.error("Error retrieving notifications:", error);
    throw error;
  }
}

export async function getNotificationsByUserId(
  userId: number
): Promise<Notification[]> {
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        date: "desc",
      },
    });

    if (!notifications) throw new Error("No notifications found");

    return notifications;
  } catch (error) {
    console.error("Error retrieving notifications:", error);
    throw error;
  }
}

export async function createNotification({
  userId,
  image,
  senderName,
  type,
  commentContent,
  title,
  commentId,
  meetupId,
  followerId,
  likeId,
  date,
  commentParentId,
  isFollowed,
}: CreateNotificationsParams): Promise<void> {
  try {
    await prisma.notification.create({
      data: {
        senderName,
        image,
        userId,
        type,
        commentContent,
        title,
        commentId,
        meetupId,
        followerId,
        likeId,
        date,
        commentParentId,
        isFollowed,
      },
    });
  } catch (error) {
    console.error("Error creating notifications:", error);
    throw error;
  }
}

export async function deleteNotification({
  commentId,
  meetupId,
  followerId,
  likeId,
}: deleteNotificationParams): Promise<void> {
  try {
    await prisma.notification.deleteMany({
      where: {
        commentId,
        meetupId,
        followerId,
        likeId,
      },
    });

    if (commentId) {
      await prisma.notification.deleteMany({
        where: {
          commentParentId: commentId,
        },
      });
    }
  } catch (error) {
    console.error("Error deleting notification:", error);
    throw error;
  }
}

export async function updateNotification({
  commentContent,
  title,
  commentId,
  meetupId,
  followerId,
  likeId,
  date,
  isFollowed,
  isRead,
}: UpdateNotificationsParams): Promise<void> {
  try {
    await prisma.notification.updateMany({
      where: {
        commentId,
        meetupId,
        followerId,
        likeId,
      },
      data: {
        commentContent,
        title,
        date,
        isFollowed,
        isRead,
      },
    });
  } catch (error) {
    console.error("Error updating notification:", error);
    throw error;
  }
}

export async function markAllReadNotifications(): Promise<void> {
  try {
    await prisma.notification.updateMany({
      where: {
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });
  } catch (error) {
    console.error("Error mark all read notifications:", error);
    throw error;
  }
}

export async function getCountsOfNewNotifications(): Promise<number> {
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        isRead: false,
      },
      select: {
        id: true,
      },
    });

    return notifications.length;
  } catch (error) {
    console.error("Error retrieving new notifications:", error);
    throw error;
  }
}
