import { faker } from '@faker-js/faker';
import {  Shows ,PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export async function createPodcastsForShows(show: Shows) {
  const podcastCount = faker.number.int({ min: 1, max: 3 });
  const podcastPromises = Array.from({ length: podcastCount }).map(
    async (_, index) => {
      const podcast = await prisma.podcast.create({
        data: {
          title: faker.lorem.words(4),
          details: faker.lorem.paragraph(),
          url: faker.internet.url(),
          image: faker.image.avatar(),
          userId: show.userId,
          showId: show.id,
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent(),
        },
      });
      return podcast;
    }
  );
  await Promise.all(podcastPromises);
}
