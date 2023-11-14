"use server";

import { Post } from "@prisma/client";
import prisma from "../prisma";
import { ExtendedPost } from "@/types/models";
import { getPostsFromGroupsQueryOptions } from "@/lib/actions/shared.types";
import { CommentProps } from "@/types/posts";
import { revalidatePath } from "next/cache";

export async function createPost(data: Post): Promise<Post> {
  try {
    const post = await prisma.post.create({
      data,
    });

    return post;
  } catch (error) {
    console.error("Error creating post:", error);
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

export async function getPostById(id: number): Promise<ExtendedPost> {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
        comments: {
          include: {
            author: {
              select: {
                username: true,
                picture: true,
              },
            },
          },
        },
        likes: {
          include: {
            user: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (post === null) {
      throw new Error(`Post with id ${id} not found`);
    }
    return JSON.parse(JSON.stringify(post));
  } catch (error) {
    console.error("Error retrieving post:", error);
    throw error;
  }
}

export async function getAllPosts({
  page = 1,
}: {
  page?: number;
}): Promise<ExtendedPost[]> {
  try {
    const posts = await prisma.post.findMany({
      skip: page * 5,
      take: 10,
      include: {
        author: true,
        comments: {
          include: {
            author: true,
            likes: true,
            parent: true,
            replies: true,
          },
        },
        likes: {
          include: {
            user: true,
          },
        },
        group: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.error("Error retrieving posts:", error);
    throw error;
  }
}

export async function getAllPostsExtended({
  page = 1,
}: {
  page?: number;
}): Promise<ExtendedPost[]> {
  try {
    const posts = await prisma.post.findMany({
      skip: (page - 1) * 10,
      take: 10,
      include: {
        author: true,
        comments: {
          include: {
            author: true,
            likes: {
              include: {
                user: true,
              },
            },
            parent: true,
            replies: {
              include: {
                author: true,
                likes: {
                  include: {
                    user: true,
                  },
                },
              },
            },
          },
        },
        likes: {
          include: {
            user: true,
          },
        },
        group: {
          include: {
            admins: true,
            members: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.error("Error retrieving posts:", error);
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

export interface ExtendedComment extends CommentProps {
  parent?: CommentProps;
  path?: string;
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
    return JSON.parse(JSON.stringify(newComment));
  } catch (error) {
    console.error("Error adding comment or reply:", error);
    throw error;
  }
}

export async function updateComment(
  commentId: number,
  content: string,
  path: string
): Promise<ExtendedComment> {
  try {
    const comment = await prisma.comment.update({
      where: { id: commentId },
      data: {
        content,
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
    return JSON.parse(JSON.stringify(comment));
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
