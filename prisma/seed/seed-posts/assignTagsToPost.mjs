import { faker } from '@faker-js/faker';
import prisma from '../../../lib/prisma.mjs';

import { getRandomTags } from './getRandomTags.mjs';

export async function assignTagsToPost(post, tags) {
  try {
    const randomTags = await getRandomTags(tags, faker);
    const tagOnPostPromises = randomTags.map((tag) => {
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
