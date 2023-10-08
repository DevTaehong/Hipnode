import { faker } from '@faker-js/faker';
import prisma from '../../../lib/prisma.mjs';

export async function createPostForUser(user) {
  try {
    const post = await prisma.post.create({
      data: {
        content: faker.lorem.paragraph(),
        authorId: user.id,
        viewCount: faker.number.int({ min: 0, max: 1000 }),
        image: faker.image.urlLoremFlickr({ category: 'nature' }),
      },
    });
    return post;
  } catch (error) {
    console.error(`Failed to create post for user ${user.id}:`, error);
  }
}
