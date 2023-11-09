import { faker } from "@faker-js/faker";

import prisma from "../../../lib/prisma";

export async function createGroups() {
  const groupCount = 50;
  const users = await prisma.user.findMany();

  const adminsToConnect = [users[0], users[1], users[2]];
  const membersToConnect = [...adminsToConnect, users[3], users[4], users[5]];

  const groupPromises = users.slice(0, groupCount).map(async (user) => {
    const group = await prisma.group.create({
      data: {
        name: faker.lorem.words(2),
        description: faker.lorem.sentence(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
        createdBy: user.id,
        coverImage: faker.image.urlLoremFlickr({ category: "nature" }),
        logo: faker.image.urlLoremFlickr({ category: "business" }),
        admins: {
          connect: adminsToConnect,
        },
        members: {
          connect: membersToConnect,
        },
        posts: {
          createMany: {
            data: Array.from({ length: 5 }).map(() => ({
              heading: faker.lorem.sentence(),
              content: faker.lorem.paragraph({ min: 2, max: 10 }),
              heading: faker.lorem.sentence(),
              authorId: user.id,
              viewCount: faker.number.int({ min: 0, max: 1000 }),
              isEdited: faker.datatype.boolean(),
              image: faker.image.urlLoremFlickr({ category: "nature" }),
              createdAt: faker.date.past(),
              updatedAt: faker.date.recent(),
            })),
          },
        },
      },
    });
    return group;
  });
  const groups = await Promise.all(groupPromises);
  return groups;
}
