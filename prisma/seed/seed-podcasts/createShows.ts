import prisma from "../../../lib/prisma";
import { faker } from "@faker-js/faker";
import { User } from "@prisma/client";

export async function createShows(users: User[]) {
  try {
    const showCount = 12; // Number of shows you want to create
    const minSubscriptionsPerUser = 3; // Minimum subscriptions per user

    const showsPromises = Array.from({ length: showCount }).map(async () => {
      const showName = faker.lorem.words(4); // Generate a random show name
      // Create a show
      const show = await prisma.shows.create({
        data: {
          name: showName,
          userId: users[Math.floor(Math.random() * users.length)].id, // Assign a random user as the owner
        },
      });

      // Randomly choose some users to subscribe
      const userSubscriptions: User[] = [];
      while (userSubscriptions.length < minSubscriptionsPerUser) {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        if (!userSubscriptions.includes(randomUser)) {
          userSubscriptions.push(randomUser);
        }
      }

      const subscriptionPromises = userSubscriptions.map(async (user) => {
        await prisma.usersSubscribedToShows.create({
          data: {
            userId: user.id,
            showId: show.id,
          },
        });
      });

      await Promise.all(subscriptionPromises);

      return show;
    });

    return Promise.all(showsPromises);
  } catch (error) {
    console.error(`Failed to create shows:`, error);
  }
}
