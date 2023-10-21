import { createPosts, createTags } from "./seed/seed-posts/index";
import { createOnboarding, createUsers } from "./seed/seed-user/index";
import {
  createShows,
  createPodcastsForShows,
} from "./seed/seed-podcasts/index";
import { createGroups, createMemberships } from "./seed/seed-groups/index";
import { createMeetUps } from "./seed/seed-meetup/index";

import prisma from "../lib/prisma";

async function main() {
  const tags = await createTags();
  const users = await createUsers();
  await createOnboarding(users);
  await createPosts(users, tags);

  const shows = (await createShows(users)) as {
    id: number;
    name: string;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
  for (const show of shows) {
    await createPodcastsForShows(show);
  }

  console.log("Shows created:", shows);

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
