import { Post, User, PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

export async function createCommentsForPost(post: Post, user: User) {
  try {
    const commentCount = faker.number.int({ min: 3, max: 5 });

    const commentPromises = Array.from({ length: commentCount }).map(
      async () => {
        const comment = await prisma.comment.create({
          data: {
            content: faker.lorem.sentence(),
            authorId: user.id,
            postId: post.id,
            isEdited: faker.datatype.boolean(),
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent(),
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
