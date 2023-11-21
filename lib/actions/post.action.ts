"use server";

import { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import prisma from "../prisma";
import {
  getPostsByGroupIdQueryOptions,
  getPostsFromGroupsQueryOptions,
} from "@/lib/actions/shared.types";
import {
  CommentAuthorProps,
  ExtendedComment,
  ExtendedPostById,
  ExtendedPrismaPost,
} from "@/types/posts";

export async function handleTags(tagNames: string[]) {
  const existingTags = await prisma.tag.findMany({
    where: {
      name: { in: tagNames },
    },
  });

  const existingTagIds = existingTags.map((tag) => ({ id: tag.id }));
  const existingTagNames = new Set(existingTags.map((tag) => tag.name));
  const newTagNames = tagNames.filter((name) => !existingTagNames.has(name));

  const newTagIds = (
    await Promise.all(
      newTagNames.map(async (name) => {
        try {
          const tag = await prisma.tag.create({ data: { name } });
          return { id: tag.id };
        } catch (error) {
          console.error(`Error creating tag '${name}':`, error);
          return null;
        }
      })
    )
  ).filter((tag) => tag !== null) as { id: number }[];

  const allTagIdsToConnect = existingTagIds.concat(newTagIds);
  return allTagIdsToConnect;
}

export async function createPostWithTags(
  postData: {
    heading: string;
    content: string;
    authorId: number;
    image: string;
    groupId?: number;
  },
  tagNames: string[]
) {
  try {
    const allTagIdsToConnect = await handleTags(tagNames);

    const newPost = await prisma.$transaction(async (prisma) => {
      const post = await prisma.post.create({
        data: {
          ...postData,
        },
        include: {
          author: true,
        },
      });

      await prisma.tagOnPost.createMany({
        data: allTagIdsToConnect.map((tagId) => ({
          postId: post.id,
          tagId: tagId.id,
        })),
        skipDuplicates: true,
      });

      return post;
    });

    revalidatePath("/");
    redirect("/");
    return newPost;
  } catch (error) {
    console.error("Error creating post with tags:", error);
    throw error;
  }
}

export async function updatePost(
  postId: number,
  data: Partial<Post>
): Promise<Post> {
  try {
    const post = await prisma.post.update({
      where: { id: postId },
      data,
    });
    console.log("Post updated successfully:", post);
    return post;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
}

export async function deletePost(id: number): Promise<Post> {
  try {
    const post = await prisma.post.delete({
      where: { id },
    });

    return post;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
}

export async function getPostContentById(
  id: number
): Promise<ExtendedPostById> {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      select: {
        author: {
          select: {
            picture: true,
            username: true,
          },
        },
        createdAt: true,
        tags: {
          select: {
            tag: true,
          },
        },
        image: true,
        heading: true,
        content: true,
        viewCount: true,
        id: true,
        likes: {
          select: {
            id: true,
          },
        },
        comments: {
          select: {
            id: true,
          },
        },
        shares: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!post) {
      throw new Error(`Post with id ${id} not found`);
    }

    const extendedPost = {
      ...post,
      tags: post.tags.map((tagOnPost) => tagOnPost.tag.name),
      likesCount: post.likes.length,
      commentsCount: post.comments.length,
      sharesCount: post.shares.length,
    };

    return extendedPost;
  } catch (error) {
    console.error("Error retrieving post content:", error);
    throw error;
  }
}

export async function getPostCommentsById(
  id: number
): Promise<CommentAuthorProps[]> {
  try {
    const comments = await prisma.comment.findMany({
      where: { postId: id },
      include: {
        author: {
          select: {
            username: true,
            picture: true,
          },
        },
      },
    });

    if (!comments) {
      throw new Error(`Comments for post with id ${id} not found`);
    }
    return comments;
  } catch (error) {
    console.error("Error retrieving post comments:", error);
    throw error;
  }
}

export async function getAllPosts({
  numberToSkip = 0,
}: {
  numberToSkip?: number;
}): Promise<ExtendedPrismaPost[]> {
  try {
    const posts = await prisma.post.findMany({
      skip: numberToSkip,
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        image: true,
        content: true,
        viewCount: true,
        createdAt: true,
        heading: true,
        author: {
          select: {
            username: true,
            picture: true,
          },
        },
        likes: {
          select: {
            id: true,
          },
        },
        comments: {
          select: {
            id: true,
          },
        },
        tags: {
          select: {
            tag: true,
          },
        },
      },
    });

    const postsWithCounts = posts.map((post) => ({
      ...post,
      likesCount: post.likes.length,
      commentsCount: post.comments.length,
      tags: post.tags.map((tagOnPost) => tagOnPost.tag.name),
    }));

    return postsWithCounts;
  } catch (error) {
    console.error("Error retrieving posts:", error);
    throw error;
  }
}

export async function getPostsByGroupId(groupId: number, myCursorId?: number) {
  try {
    let queryOptions: getPostsByGroupIdQueryOptions = {
      take: 3,
      where: {
        groupId,
      },
      include: {
        author: true,
        comments: true,
        likes: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    };

    if (myCursorId !== undefined) {
      queryOptions = {
        ...queryOptions,
        skip: 1, // Skip the first result
        cursor: { id: myCursorId },
      };
    }

    const postsByGroupId = await prisma.post.findMany(queryOptions);
    return postsByGroupId;
  } catch (error) {
    console.error("Error finding posts by group id:", error);
    throw error;
  }
}

export async function getPostsFromGroups(myCursorId?: number) {
  try {
    let queryOptions: getPostsFromGroupsQueryOptions = {
      take: 9, // Take only the limit number of results
      where: {
        group: {
          isNot: null,
        },
      },
      include: {
        author: true,
        group: true,
      },
    };

    if (myCursorId !== undefined) {
      queryOptions = {
        ...queryOptions,
        skip: 1, // Skip the first result
        cursor: { id: myCursorId },
      };
    }

    const postsFromGroups = await prisma.post.findMany(queryOptions);
    return postsFromGroups;
  } catch (error) {
    console.error("Error finding posts from groups:", error);
    throw error;
  }
}

export async function addCommentOrReply(
  userId: number,
  postId: number,
  content: string,
  parentId: number | null,
  path: string
): Promise<ExtendedComment> {
  try {
    const newComment = await prisma.comment.create({
      data: {
        content,
        postId,
        authorId: userId,
        parentId,
      },
      include: {
        author: {
          select: {
            username: true,
            picture: true,
          },
        },
        parent: true,
      },
    });

    revalidatePath(path);
    return newComment;
  } catch (error) {
    console.error("Error adding comment or reply:", error);
    throw error;
  }
}

export async function updateComment(
  commentId: number,
  content: string,
  path: string
): Promise<CommentAuthorProps> {
  try {
    const comment = await prisma.comment.update({
      where: { id: commentId },
      data: {
        content,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            picture: true,
          },
        },
        parent: true,
      },
    });

    revalidatePath(path);
    return comment;
  } catch (error) {
    console.error("Error updating comment:", error);
    throw error;
  }
}

export async function deleteCommentOrReply(
  commentId: number,
  path: string
): Promise<void> {
  try {
    await prisma.comment.deleteMany({
      where: { parentId: commentId },
    });

    await prisma.comment.delete({
      where: { id: commentId },
    });
    revalidatePath(path);
    console.log("Comment and its replies deleted successfully");
  } catch (error) {
    console.error("Error deleting comment or replies:", error);
    throw error;
  }
}

export async function sharePostAndCountShares(
  userId: number,
  postId: number
): Promise<number> {
  try {
    await prisma.share.create({
      data: {
        userId,
        postId,
      },
    });

    const shares = await prisma.share.findMany({
      where: {
        postId,
      },
    });

    return shares.length;
  } catch (error) {
    console.error("Error sharing post:", error);
    throw error;
  }
}
