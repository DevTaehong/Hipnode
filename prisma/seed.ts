import { createPosts, createTags } from "./seed/seed-posts/index";
import { createOnboarding, createUsers } from "./seed/seed-user/index";
import {
  createShows,
  createPodcastsForShows,
} from "./seed/seed-podcasts/index";
import { createGroups } from "./seed/seed-groups/index";
import { createMeetUps } from "./seed/seed-meetup/index";
import { createInterviews } from "./seed/seed-interviews/createInterview";

import prisma from "../lib/prisma";

async function main() {
  const tags = await createTags();
  const users = await createUsers();
  await createOnboarding(users);
  await createPosts(users, tags);
  await createInterviews(users);

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

  await createGroups(users);

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
