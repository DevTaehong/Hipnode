import { faker } from '@faker-js/faker';
import prisma from '../../../lib/prisma.mjs';

export async function createShows(users) {
  const allShows = [];
  for (const user of users) {
    const showCount = faker.number.int({ min: 1, max: 3 });
    const showPromises = Array.from({ length: showCount }).map(
      async (_, index) => {
        const show = await prisma.shows.create({
          data: {
            name: faker.lorem.words(4),
            userId: user.id,
          },
        });
        return show;
      }
    );
    const userShows = await Promise.all(showPromises);
    allShows.push(...userShows);
  }
  return allShows;
}
