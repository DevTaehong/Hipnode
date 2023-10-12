import { Post, Tag, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { getRandomTags } from './getRandomTags';

const prisma = new PrismaClient();

export async function assignTagsToPost(post: Post, tags: Tag[]) {
  try {
    const randomTags = await getRandomTags(tags, faker);
    if(!randomTags) {
      return
    }
    const tagOnPostPromises = randomTags.map((tag: Tag) => {
      return prisma.tagOnPost.create({
        data: {
          postId: post.id,
          tagId: tag.id,
        },
      });
    });

    await Promise.all(tagOnPostPromises);
  } catch (error) {
    console.error(`Failed to assign tags to post ${post.id}:`, error);
  }
}
