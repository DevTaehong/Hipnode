import { PrismaClient } from '@prisma/client';

import { createPosts, createTags } from '../prisma/seed/seed-posts/index.mjs';
import {
  createOnboarding,
  createUsers,
} from '../prisma/seed/seed-user/index.mjs';
import {
  createShows,
  createPodcastsForShows,
} from '../prisma/seed/seed-podcasts/index.mjs';

const prisma = new PrismaClient();

async function main() {
  const tags = await createTags();
  const users = await createUsers();
  await createOnboarding(users);
  await createPosts(users, tags);

  const shows = await createShows(users);

  for (const show of shows) {
    await createPodcastsForShows(show);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
