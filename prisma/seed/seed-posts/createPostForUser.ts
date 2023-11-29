import { User } from "@prisma/client";
import { faker } from "@faker-js/faker";

import prisma from "../../../lib/prisma";

export async function createPostForUser(user: User, groupId: number) {
  try {
    const post = await prisma.post.create({
      data: {
        content: faker.lorem.paragraph(),
        heading: faker.lorem.sentence(),
        authorId: user.id,
        groupId,
        viewCount: faker.number.int({ min: 0, max: 10 }),
        isEdited: faker.datatype.boolean(),
        image: faker.image.urlLoremFlickr({ category: "nature" }),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
        clerkId: user.clerkId,
      },
    });
    return post;
  } catch (error) {
    console.error(`Failed to create post for user ${user.id}:`, error);
  }
}
