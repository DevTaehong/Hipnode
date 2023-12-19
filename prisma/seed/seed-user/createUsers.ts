import { faker } from "@faker-js/faker";

import prisma from "../../../lib/prisma";
export async function createUsers() {
  const userPromises = Array.from({ length: 10 }).map(async (_, index) => {
    return prisma.user.create({
      data: {
        clerkId: faker.string.uuid(),
        name: faker.internet.userName(),
        username: `${faker.internet.userName()}${index}`.toLowerCase(),
        email: `${faker.internet.email()}${index}`,
        password: `${faker.internet.password()}${index}`,
        role: "USER",
        bio: faker.lorem.sentence(),
        picture: faker.image.avatar(),
        location: faker.location.state(),
        website: faker.internet.url(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      },
    });
  });
  return await Promise.all(userPromises);
}
