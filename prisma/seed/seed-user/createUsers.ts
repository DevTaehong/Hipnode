import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createUsers() {
  const userPromises = Array.from({ length: 10 }).map(async (_, index) => {
    return prisma.user.create({
      data: {
        clerkId: faker.string.uuid(),
        name: faker.internet.userName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: "USER",
        bio: faker.lorem.sentence(),
        picture: faker.image.avatar(),
        location: faker.location.state(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      },
    });
  });
  return await Promise.all(userPromises);
}
