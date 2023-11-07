"use server";

import { type Post } from "@prisma/client";
import prisma from "../prisma";
import { ExtendedPost } from "@/types/models";
import { getPostsFromGroupsQueryOptions } from "@/lib/actions/shared.types";

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

const mapPostToExtendedPost = (post: any): ExtendedPost => {
  return {
    ...post,
    author: {
      id: post.author.id,
      username: post.author.username,
      picture: post.author.picture,
    },
    comments: post.comments.map((comment: any) => ({
      id: comment.id,
      content: comment.content,
      authorId: comment.authorId,
      postId: comment.postId,
      parentId: comment.parentId,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
      isEdited: comment.isEdited,
      author: {
        id: comment.author.id,
        username: comment.author.username,
        picture: comment.author.picture,
      },
    })),
    likes: post.likes.map((like: any) => ({
      id: like.id,
      userId: like.userId,
      liked: like.liked,
      postId: like.postId,
      commentId: like.commentId,
      user: {
        id: like.user.id,
        username: like.user.username,
      },
    })),
    tags: post.tags.map((tagOnPost: any) => ({
      tag: {
        id: tagOnPost.tag.id,
        name: tagOnPost.tag.name,
      },
    })),
  };
};

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
                name: true,
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

    return mapPostToExtendedPost(post);
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
    console.log(postsFromGroups);
    return postsFromGroups;
  } catch (error) {
    console.error("Error finding posts from groups:", error);
    throw error;
  }
}
