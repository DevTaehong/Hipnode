"use server";

import { type Shows } from "@prisma/client";
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
    // Find the user with the specified clerkId
    const user = await prisma.user.findUnique({
      where: {
        clerkId,
      },
    });

    if (!user) {
      throw new Error(`User with clerkId ${clerkId} not found`);
    }

    // Get the userId of the found user
    const userId = user.id;

    // Query the UsersSubscribedToShows table to find subscribed shows
    const subscribedShows = await prisma.usersSubscribedToShows.findMany({
      where: {
        userId,
      },
      include: {
        show: true, // Include the related show details
      },
    });

    // Extract and return the list of subscribed shows
    const shows = subscribedShows.map((subscription) => subscription.show);

    return shows;
  } catch (error) {
    console.error(`Error fetching user's subscribed shows:`, error);
    throw error;
  }
}
