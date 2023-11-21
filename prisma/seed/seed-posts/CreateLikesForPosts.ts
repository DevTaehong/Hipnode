import { faker } from "@faker-js/faker";

import { Post, User } from "@prisma/client";
import prisma from "../../../lib/prisma";

export async function createLikesForPost(post: Post, users: User[]) {
  try {
    const likeCount = faker.number.int({ min: 1, max: 14 });
    const likedUsers = new Set();

    while (likedUsers.size < likeCount) {
      const randomUserIndex = faker.number.int({
        min: 0,
        max: users.length - 1,
      });
      const user = users[randomUserIndex];

      if (!likedUsers.has(user.id)) {
        likedUsers.add(user.id);
        await prisma.like.create({
          data: {
            postId: post.id,
            userId: user.id,
          },
        });
      }
    }
  } catch (error) {
    console.error(`Failed to create likes for post ${post.id}:`, error);
  }
}
