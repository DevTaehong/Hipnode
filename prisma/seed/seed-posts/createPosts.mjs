import { faker } from '@faker-js/faker';

import {
  createCommentsForPost,
  createLikesForComment,
  createPostForUser,
  createRepliesToComment,
  assignTagsToPost,
} from '../seed-posts/index.mjs';

async function handleInteractionsForPost(post, user) {
  const commentCount = faker.number.int({ min: 3, max: 5 });
  const comments = await createCommentsForPost(post, user, commentCount);
  try {
    for (const comment of comments) {
      const likeCount = faker.number.int({ min: 0, max: 3 });
      await createLikesForComment(comment, user, likeCount);

      const repliesCount = faker.number.int({ min: 1, max: 4 });
      const replies = await createRepliesToComment(comment, user, repliesCount);

      for (const reply of replies) {
        const replyLikeCount = faker.number.int({ min: 1, max: 3 });
        await createLikesForComment(reply, user, replyLikeCount);
      }
    }
  } catch (error) {
    console.error(`Failed to handle interactions for post ${post.id}:`, error);
  }
}

export async function createPosts(users, tags) {
  try {
    for (const user of users) {
      const postCount = faker.number.int({ min: 5, max: 8 });
      const postPromises = Array.from({ length: postCount }).map(
        async (_, index) => {
          const post = await createPostForUser(user);
          await assignTagsToPost(post, tags);
          await handleInteractionsForPost(post, user);
          return post;
        }
      );
      await Promise.all(postPromises);
    }
  } catch (error) {
    console.error(`Failed to create posts:`, error);
  }
}
