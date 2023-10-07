import { PrismaClient } from '@prisma/client';

import {
  createOnboarding,
  createPosts,
  createTags,
  createUsers,
} from './seed/index.mjs';

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
