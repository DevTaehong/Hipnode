// import { User } from "@prisma/client";
// import { faker } from "@faker-js/faker";

import { User } from "@prisma/client";
import prisma from "../../../lib/prisma";

// export async function createShows(users: User[]) {
//   const allShows = [];
//   for (const user of users) {
//     const showCount = faker.number.int({ min: 1, max: 5 });
//     const showPromises = Array.from({ length: showCount }).map(
//       async (_, index) => {
//         const show = await prisma.shows.create({
//           data: {
//             name: faker.lorem.words(4),
//             userId: user.id,
//             createdAt: faker.date.past(),
//             updatedAt: faker.date.recent(),
//           },
//         });
//         return show;
//       }
//     );
//     const userShows = await Promise.all(showPromises);
//     allShows.push(...userShows);
//   }
//   return allShows;
// }

import { faker } from "@faker-js/faker";

export async function createShows(users: User[]) {
  try {
    const showCount = 12; // Number of shows you want to create

    const showsPromises = Array.from({ length: showCount }).map(async () => {
      const showName = faker.lorem.words(4); // Generate a random show name
      // Create a show
      const show = await prisma.shows.create({
        data: {
          name: showName,
          userId: users[Math.floor(Math.random() * users.length)].id, // Assign a random user as the owner
        },
      });

      // Subscribe users to the show
      const userSubscriptions = users.slice(
        0,
        Math.floor(Math.random() * users.length) + 1
      ); // Randomly choose some users to subscribe
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
