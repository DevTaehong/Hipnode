"use server";

import { type User } from "@prisma/client";
import prisma from "@/lib/prisma";

type createUserType = {
  clerkId: string;
  name: string;
  username: string;
  picture: string;
  email: string;
};

export async function getUserByClerkId(clerkId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        clerkId,
      },
    });

    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
}

export async function getUserById(id: number) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
}

export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany();

    return users;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
}

export async function createUser(data: createUserType) {
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

export async function deleteUser(clerkId: string) {
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        clerkId,
      },
    });

    return deletedUser;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}

// export async function getOnboardingByUserId(userId: number) {
//   try {
//     const onboarding = await prisma.onboarding.findUnique({
//       where: {
//         userId,
//       },
//     });

//     return onboarding;
//   } catch (error) {
//     console.error("Error fetching onboarding by userId:", error);
//     throw error;
//   }
// }
