import { PrismaClient } from '@prisma/client';
import { createPosts, createTags } from '../prisma/seed/seed-posts/index.mjs';

import {
  createOnboarding,
  createUsers,
} from '../prisma/seed/seed-user/index.mjs';

const prisma = new PrismaClient();

async function main() {
  const tags = await createTags();
  const users = await createUsers();
  await createOnboarding(users);
  await createPosts(users, tags);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
