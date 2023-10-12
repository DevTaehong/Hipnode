import { User ,PrismaClient} from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export async function createPostForUser(user: User) {
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
