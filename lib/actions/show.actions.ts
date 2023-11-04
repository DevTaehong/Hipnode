"use server";

import prisma from "@/lib/prisma";

export async function getAllShows() {
  try {
    const shows = await prisma.shows.findMany();

    return shows;
  } catch (error) {
    console.error("Error fetching all shows:", error);
    throw error;
  }
}

export async function getAllUsersShows(clerkId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        clerkId,
      },
    });

    if (!user) {
      throw new Error(`User with clerkId ${clerkId} not found`);
    }

    const userId = user.id;

    const subscribedShows = await prisma.usersSubscribedToShows.findMany({
      where: {
        userId,
      },
      include: {
        show: true, // Include the related show details
      },
    });

    const shows = subscribedShows.map((subscription) => subscription.show);

    return shows;
  } catch (error) {
    console.error(`Error fetching user's subscribed shows:`, error);
    throw error;
  }
}

export async function getTopFiveShows(showIds: number[]) {
  try {
    if (!showIds || showIds.length !== 5) {
      throw new Error(`Exactly five show IDs must be provided`);
    }

    const shows = await prisma.shows.findMany({
      where: {
        id: {
          in: showIds,
        },
      },
    });

    return shows;
  } catch (error) {
    console.error(`Error fetching top five shows:`, error);
    throw error;
  }
}
