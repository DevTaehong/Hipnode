import { User ,PrismaClient} from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export async function createShows(users : User[]) {
  const allShows = [];
  for (const user of users) {
    const showCount = faker.number.int({ min: 1, max: 3 });
    const showPromises = Array.from({ length: showCount }).map(
      async (_, index) => {
        const show = await prisma.shows.create({
          data: {
            name: faker.lorem.words(4),
            userId: user.id,
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent(),
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
