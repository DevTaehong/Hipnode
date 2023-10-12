import { PrismaClient } from '@prisma/client';

import { createPosts, createTags } from './seed/seed-posts/index';
import {
  createOnboarding,
  createUsers,
} from './seed/seed-user/index';
import {
  createShows,
  createPodcastsForShows,
} from './seed/seed-podcasts/index';

import {
  createGroups,
  createMemberships,
} from './seed/seed-groups/index';

import { createMeetUps } from './seed/seed-meetup/index';

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

  const groups = await createGroups();
  await createMemberships(users, groups);

  await createMeetUps(users);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
