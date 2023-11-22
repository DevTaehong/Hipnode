import { createPosts, createTags } from "./seed/seed-posts/index";
import { createOnboarding, createUsers } from "./seed/seed-user/index";
import {
  createShows,
  createPodcastsForShows,
} from "./seed/seed-podcasts/index";
import { createGroups } from "./seed/seed-groups/index";
import { createMeetUps } from "./seed/seed-meetup/index";
import { createInterviews } from "./seed/seed-interviews/createInterview";
import { seedInterviewTags } from "./seed/seed-interviews/createInterviewTag";
import { seedTagOnInterview } from "./seed/seed-interviews/seedTagOnInterview";
import prisma from "../lib/prisma";
import { createShares } from "./seed/seed-posts/createPostShares";
import { createLikesForPost } from "./seed/seed-posts/CreateLikesForPosts";
import { Shows } from "@prisma/client";

async function main() {
  console.time("Execution Time");
  const tags = await createTags();
  const users = await createUsers();
  const groups = await createGroups();
  await createOnboarding(users);
  await seedInterviewTags();
  await createInterviews(users);
  await seedTagOnInterview();
  const posts = await createPosts(users, tags, groups);

  const shows = (await createShows(users)) as Shows[];
  for (const show of shows) {
    await createPodcastsForShows(show);
  }

  if (posts) {
    for (const post of posts) {
      await createLikesForPost(post, users);
    }
    await createShares(users, posts);
  }

  await createMeetUps(users);

  console.timeEnd("Execution Time");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
