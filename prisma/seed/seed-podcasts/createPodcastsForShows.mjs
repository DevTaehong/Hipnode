import { faker } from '@faker-js/faker';
import prisma from '../../../lib/prisma.mjs';

export async function createPodcastsForShows(show) {
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
        },
      });
      return podcast;
    }
  );
  await Promise.all(podcastPromises);
}
