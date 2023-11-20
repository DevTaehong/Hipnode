"use server";

import { Post, User, Tag, Comment, Share } from "@prisma/client";
import prisma from "../prisma";

import {
  getPostsByGroupIdQueryOptions,
  getPostsFromGroupsQueryOptions,
} from "@/lib/actions/shared.types";
import { CommentAuthorProps } from "@/types/posts";
import { revalidatePath } from "next/cache";
import { Share } from "lucide-react";

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
  console.log("Post Data:", postData);
  console.log("Tag Names:", tagNames);

  try {
    const existingTags = await prisma.tag.findMany({
      where: {
        name: { in: tagNames },
      },
    });
    console.log("Existing Tags:", existingTags);

    // Map existing tags to their IDs for connection
    const existingTagIds = existingTags.map((tag) => ({ id: tag.id }));
    console.log("Existing Tag IDs:", existingTagIds);

    // Create a set of existing tag names
    const existingTagNames = new Set(existingTags.map((tag) => tag.name));
    console.log("Existing Tag Names:", existingTagNames);

    // Filter out the new tag names that do not exist already
    const newTagNames = tagNames.filter((name) => !existingTagNames.has(name));
    console.log("New Tag Names:", newTagNames);

    // Use a transaction to handle tag creation and post creation atomically
    const newPost = await prisma.$transaction(async (prisma) => {
      // Create new tags and collect their IDs
      const newTagIds = await Promise.all(
        newTagNames.map(async (name) => {
          try {
            const tag = await prisma.tag.create({ data: { name } });
            console.log("Created New Tag:", tag);
            return { id: tag.id };
          } catch (error) {
            // If the tag already exists, we catch the error and return null
            console.error(`Error creating tag '${name}':`, error);
            return null;
          }
        })
      );

      // Filter out any nulls that resulted from caught errors
      const validNewTagIds = newTagIds.filter((tag) => tag !== null);
      console.log(validNewTagIds);
      console.log(existingTagIds);

      // Combine existing tag IDs with new tag IDs
      const allTagIdsToConnect = existingTagIds.concat(validNewTagIds);
      console.log("All Tag IDs to Connect:", allTagIdsToConnect);

      // Create the new post with connected tags
      return prisma.post.create({
        data: {
          ...postData,
          tags: {
            connectOrCreate: allTagIdsToConnect.map((tagId) => ({
              where: { id: tagId.id },
              create: { tag: { connect: { id: tagId.id } } },
            })),
          },
        },
        include: {
          author: true,
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });
    });

    console.log("New Post Created:", newPost);
    return JSON.parse(JSON.stringify(newPost));
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

type ExtendedPost = {
  id: Post["id"];
  image: Post["image"];
  content: Post["content"];
  viewCount: Post["viewCount"];
  author: Pick<User, "username" | "picture">;
  likesCount: number;
  commentsCount: number;
  tags: Tag["name"][];
};

export async function getPostContentById(id: number): Promise<ExtendedPost> {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      select: {
        author: {
          select: {
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
}): Promise<ExtendedPost[]> {
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

export interface ExtendedComment extends CommentAuthorProps {
  parent?: Comment | null;
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

export async function sharePost(
  userId: number,
  postId: number
): Promise<Share> {
  try {
    const share = await prisma.share.create({
      data: {
        userId,
        postId,
      },
    });

    return share;
  } catch (error) {
    console.error("Error sharing post:", error);
    throw error;
  }
}
