"use server";

import prisma from "@/lib/prisma";

export async function getProfileDataByClerkId(clerkId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: 7,
      },
      include: {
        following: true,
        followBy: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
}
