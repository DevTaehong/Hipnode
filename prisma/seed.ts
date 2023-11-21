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

async function main() {
  const tags = await createTags();
  const users = await createUsers();
  const groups = await createGroups();
  await createOnboarding(users);
  await seedInterviewTags();
  await createInterviews(users);
  await seedTagOnInterview();
  const posts = await createPosts(users, tags, groups);

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

  // @ts-ignore
  for (const post of posts) {
    await createLikesForPost(post, users);
  }

  await createMeetUps(users);
  // @ts-ignore
  await createShares(users, posts);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
