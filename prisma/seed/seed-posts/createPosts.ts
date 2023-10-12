import { Post, Tag, User } from '@prisma/client';
import { faker } from '@faker-js/faker';

import {
  createCommentsForPost,
  createLikesForComment,
  createPostForUser,
  createRepliesToComment,
  assignTagsToPost,
} from './index';

async function handleInteractionsForPost(post: Post, user: User) {
  const comments = await createCommentsForPost(post, user);

  try {
    if(comments){
    for (const comment of comments) {
      const likeCount = faker.number.int({ min: 0, max: 3 });
      await createLikesForComment(comment, user, likeCount);

      const repliesCount = faker.number.int({ min: 1, max: 4 });
      const replies = await createRepliesToComment(comment, user, repliesCount);

      if(!replies) {
        return;
      }
      for (const reply of replies) {
        const replyLikeCount = faker.number.int({ min: 1, max: 3 });
        await createLikesForComment(reply, user, replyLikeCount);
      }
    }
  }
  } catch (error) {
    console.error(`Failed to handle interactions for post ${post.id}:`, error);
  }
}

export async function createPosts(users: User[], tags: Tag[]) {
  try {
    for (const user of users) {
      const postCount = faker.number.int({ min: 5, max: 8 });
      const postPromises = Array.from({ length: postCount }).map(
        async (_, index) => {
          const post = await createPostForUser(user);
          if(!post) {
            return
          }
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
