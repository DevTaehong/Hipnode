import { User } from "@prisma/client";
import { faker } from "@faker-js/faker";

import prisma from "../../../lib/prisma";

export async function createPostForUser(user: User) {
  try {
    const post = await prisma.post.create({
      data: {
        content: faker.lorem.paragraph(),
        authorId: user.id,
        viewCount: faker.number.int({ min: 0, max: 1000 }),
        isEdited: faker.datatype.boolean(),
        image: faker.image.urlLoremFlickr({ category: "nature" }),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      },
    });
    return post;
  } catch (error) {
    console.error(`Failed to create post for user ${user.id}:`, error);
  }
}
