"use server";

import { type User } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function createUser(data: User) {
  try {
    const user = await prisma.user.create({
      data,
    });

    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

interface checkUserByClerkIdProps {
  clerkId: string;
}

export async function checkUserForClerkId({
  clerkId,
}: checkUserByClerkIdProps) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        clerkId,
      },
    });

    if (user) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking user by Clerk ID:", error);
    return false;
  }
}

export async function checkUserForBio({ clerkId }: checkUserByClerkIdProps) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        clerkId,
      },
    });

    if (user && user.bio) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking user by Clerk ID:", error);
    return false;
  }
}

export async function updateUser(clerkId: string, data: Partial<User>) {
  try {
    const user = await prisma.user.update({
      where: {
        clerkId,
      },
      data,
    });

    return user;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}
