import { Comment, User ,PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export async function createLikesForComment(comment: Comment, user: User, likeCount: number) {
  try {
    const likePromises = Array.from({ length: likeCount }).map(() => {
      return prisma.like.create({
        data: {
          userId: user.id,
          commentId: comment.id,
          postId: comment.postId,
        },
      });
    });
    return await Promise.all(likePromises);
  } catch (error) {
    console.error(`Failed to create likes for comment ${comment.id}:`, error);
  }
}
