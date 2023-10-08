import { faker } from '@faker-js/faker';

import prisma from '../../../lib/prisma.mjs';

export async function createRepliesToComment(comment, user, repliesCount) {
  try {
    const repliesPromises = Array.from({ length: repliesCount }).map(() => {
      return prisma.comment.create({
        data: {
          content: faker.lorem.sentence(),
          authorId: user.id,
          postId: comment.postId,
          parentId: comment.id,
        },
      });
    });
    return await Promise.all(repliesPromises);
  } catch (error) {
    console.error(`Failed to create replies for comment ${comment.id}:`, error);
  }
}
