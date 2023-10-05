import { faker } from '@faker-js/faker';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  for (let i = 0; i < 10; i++) {
    await prisma.user.create({
      data: {
        name: faker.internet.userName(),
        clerkId: faker.string.uuid(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        picture: faker.image.avatar(),
      },
    });
  }
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
