import { faker } from '@faker-js/faker';
import prisma from '../../../lib/prisma.mjs';

export async function createCommentsForPost(post, user) {
  try {
    const commentCount = faker.number.int({ min: 3, max: 5 });

    const commentPromises = Array.from({ length: commentCount }).map(
      async () => {
        const comment = await prisma.comment.create({
          data: {
            content: faker.lorem.sentence(),
            authorId: user.id,
            postId: post.id,
          },
        });
        return comment;
      }
    );
    return await Promise.all(commentPromises);
  } catch (error) {
    console.error(`Failed to create comments for post ${post.id}:`, error);
  }
}
