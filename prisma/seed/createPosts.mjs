import { faker } from '@faker-js/faker';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function createPosts(users, tags) {
  for (const user of users) {
    const postCount = faker.number.int({ min: 5, max: 8 });
    const postPromises = Array.from({ length: postCount }).map(
      async (_, index) => {
        const post = await prisma.post.create({
          data: {
            content: faker.lorem.paragraph(),
            authorId: user.id,
            viewCount: faker.number.int({ min: 0, max: 1000 }),
            image: faker.image.urlLoremFlickr({ category: 'nature' }),
          },
        });

        const randomTags = faker.helpers
          .shuffle(tags)
          .slice(0, faker.number.int({ min: 1, max: tags.length }));
        const tagOnPostPromises = randomTags.map((tag) => {
          return prisma.tagOnPost.create({
            data: {
              postId: post.id,
              tagId: tag.id,
            },
          });
        });

        await Promise.all(tagOnPostPromises);

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

            const likeCount = faker.number.int({
              min: 0,
              max: users.length,
            });
            const likePromises = Array.from({ length: likeCount }).map(() => {
              return prisma.like.create({
                data: {
                  userId: user.id,
                  commentId: comment.id,
                  postId: post.id,
                },
              });
            });
            await Promise.all(likePromises);

            const repliesCount = faker.number.int({ min: 1, max: 4 });
            const repliesPromises = Array.from({ length: repliesCount }).map(
              () => {
                return prisma.comment.create({
                  data: {
                    content: faker.lorem.sentence(),
                    authorId: user.id,
                    postId: post.id,
                    parentId: comment.id,
                  },
                });
              }
            );

            const replies = await Promise.all(repliesPromises);

            for (const reply of replies) {
              const replyLikeCount = faker.number.int({ min: 1, max: 3 });
              const replyLikePromises = Array.from({
                length: replyLikeCount,
              }).map(() => {
                return prisma.like.create({
                  data: {
                    userId: user.id,
                    commentId: reply.id,
                  },
                });
              });
              await Promise.all(replyLikePromises);
            }

            return comment;
          }
        );

        await Promise.all(commentPromises);

        return post;
      }
    );

    await Promise.all(postPromises);
  }
}
