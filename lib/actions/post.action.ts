"use server";

import { Like, Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import prisma from "../prisma";
import {
  getPostsByGroupIdQueryOptions,
  getPostsFromGroupsQueryOptions,
} from "@/lib/actions/shared.types";
import {
  AddCommentOrReply,
  CommentsGroupedByParentId,
  ExtendedPostById,
  ExtendedPrismaPost,
  UpdateCommentType,
} from "@/types/posts";
import { verifyAuth } from "../auth";
import { groupCommentsByParentId } from "@/utils";

export async function handleTags(tagNames: string[]) {
  const existingTags = await prisma.tag.findMany({
    where: {
      name: { in: tagNames },
    },
  });

  const existingTagNames = new Set(existingTags.map((tag) => tag.name));
  const newTagNames = tagNames.filter((name) => !existingTagNames.has(name));

  if (newTagNames.length > 0) {
    await prisma.tag.createMany({
      data: newTagNames.map((name) => ({ name })),
      skipDuplicates: true,
    });
  }

  const allTags = await prisma.tag.findMany({
    where: {
      name: { in: tagNames },
    },
  });

  return allTags.map((tag) => ({ id: tag.id }));
}

export async function createPostWithTags(
  postData: {
    heading: string;
    content: string;
    authorId: number;
    image: string;
    groupId?: number;
    clerkId?: string;
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
  data: Partial<Post>,
  tagNames: string[]
): Promise<Post> {
  try {
    const user = verifyAuth(
      "You must be logged in to update a post, and you can only edit your own posts."
    );

    const dbUserID: number = (user.sessionClaims.metadata as any).userId;
    if (!dbUserID) throw new Error("User not found");

    const allTagIdsToConnect = await handleTags(tagNames);

    const post = await prisma.$transaction(async (prisma) => {
      const updatedPost = await prisma.post.update({
        where: { id: postId, authorId: dbUserID },
        data,
        include: {
          author: true,
        },
      });

      await prisma.tagOnPost.deleteMany({
        where: { postId },
      });

      await prisma.tagOnPost.createMany({
        data: allTagIdsToConnect.map((tagId) => ({
          postId: updatedPost.id,
          tagId: tagId.id,
        })),
        skipDuplicates: true,
      });

      return updatedPost;
    });

    revalidatePath("/");
    redirect("/");
    return post;
  } catch (error) {
    console.error("Error updating post with tags:", error);
    throw error;
  }
}

export async function deletePost(id: number): Promise<Post> {
  try {
    const user = verifyAuth(
      "You must be logged in to delete a post, and you can only delete yor own posts."
    );

    const dbUserID: number = (user.sessionClaims.metadata as any).userId;

    if (!dbUserID) throw new Error("User not found");

    await prisma.post.delete({
      where: { id, authorId: dbUserID },
    });
    revalidatePath("/");
    redirect("/");
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
}

export async function getPostContentById(
  id: number
): Promise<ExtendedPostById> {
  try {
    const user = verifyAuth(
      "We need the logged in user ID for edit and delete CRUD's."
    );

    const dbUserID: number = (user.sessionClaims.metadata as any).userId;

    const post = await prisma.post.findUnique({
      where: { id },
      select: {
        author: {
          select: {
            picture: true,
            username: true,
            id: true,
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
        clerkId: true,
        id: true,
        likes: {
          select: {
            userId: true,
          },
        },
        comments: {
          select: {
            id: true,
            authorId: true,
          },
        },
        Share: {
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
      sharesCount: post.Share.length,
      loggedInUserId: dbUserID,
    };

    return extendedPost;
  } catch (error) {
    console.error("Error retrieving post content:", error);
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
        clerkId: true,
        author: {
          select: {
            username: true,
            picture: true,
            id: true,
          },
        },
        likes: {
          select: {
            userId: true,
          },
        },
        comments: {
          select: {
            id: true,
            authorId: true,
          },
        },
        tags: {
          select: {
            tag: true,
          },
        },
      },
    });

    return posts.map((post) => ({
      ...post,
      likesCount: post.likes.length,
      likes: post.likes,
      commentsCount: post.comments.length,
      tags: post.tags.map((tagOnPost) => tagOnPost.tag.name),
    }));
  } catch (error) {
    console.error("Error retrieving posts:", error);
    throw error;
  }
}

export async function getPopularGroupPosts(
  myCursorId?: number,
  groupId?: number
) {
  try {
    let queryOptions: getPostsByGroupIdQueryOptions = {
      take: 4,
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
      orderBy: {
        likes: {
          _count: "desc",
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

    const popularPosts = await prisma.post.findMany(queryOptions);
    return popularPosts;
  } catch (error) {
    console.error("Error finding posts by group id:", error);
    throw error;
  }
}

export async function getNewPostsByGroupId(
  myCursorId?: number,
  groupId?: number
) {
  try {
    let queryOptions: getPostsByGroupIdQueryOptions = {
      take: 4,
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
      orderBy: {
        createdAt: "desc",
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
  postId: number,
  content: string,
  parentId: number | null,
  path: string
): Promise<AddCommentOrReply> {
  try {
    const user = verifyAuth("You must be logged in to add a comment or reply.");

    const dbUserID: number = (user.sessionClaims.metadata as any).userId;

    if (!dbUserID) throw new Error("User not found");

    const newComment = await prisma.comment.create({
      data: {
        content,
        postId,
        authorId: dbUserID,
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
    return {
      ...newComment,
      userId: dbUserID,
    };
  } catch (error) {
    console.error("Error adding comment or reply:", error);
    throw error;
  }
}

export async function updateComment(
  commentId: number,
  content: string,
  path: string
): Promise<UpdateCommentType> {
  try {
    const user = verifyAuth(
      "You must be logged in to update a comment, and you can only edit your own comments."
    );

    const dbUserID: number = (user.sessionClaims.metadata as any).userId;

    if (!dbUserID) throw new Error("User not found");

    const comment = await prisma.comment.update({
      where: { id: commentId, authorId: dbUserID },
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
    if (!comment) throw new Error("Comment not found.");

    revalidatePath(path);
    return { ...comment, userId: dbUserID };
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
    const user = verifyAuth(
      "You must be logged in to delete a comment or reply, and you can only delete your own comment or reply."
    );

    const dbUserID: number = (user.sessionClaims.metadata as any).userId;

    if (!dbUserID) throw new Error("User not found");

    await prisma.comment.deleteMany({
      where: { parentId: commentId, authorId: dbUserID },
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

export async function toggleLikePost(
  userId: number,
  postId: number
): Promise<Like | null> {
  try {
    const existingLike = await prisma.like.findUnique({
      where: { userId_postId: { userId, postId } },
    });

    if (existingLike) {
      await prisma.like.delete({ where: { id: existingLike.id } });
      return null;
    } else {
      const newLike = await prisma.like.create({ data: { userId, postId } });
      return newLike;
    }
  } catch (error) {
    console.error("Error toggling like on post:", error);
    throw error;
  }
}

export async function toggleLikeComment(
  userId: number,
  commentId: number
): Promise<Like | null> {
  try {
    const existingLike = await prisma.like.findUnique({
      where: { userId_commentId: { userId, commentId } },
    });
    if (existingLike) {
      await prisma.like.delete({ where: { id: existingLike.id } });
      return null;
    } else {
      const newLike = await prisma.like.create({ data: { userId, commentId } });
      return newLike;
    }
  } catch (error) {
    console.error("Error toggling like on comment:", error);
    throw error;
  }
}

export async function getPostCommentsByParentId(
  id: number
): Promise<CommentsGroupedByParentId> {
  const user = verifyAuth("You must be logged in to fetch posts.");

  const dbUserID: number = (user.sessionClaims.metadata as any).userId;

  if (!dbUserID) throw new Error("User not found");

  try {
    const comments = await prisma.comment.findMany({
      where: { postId: id },
      include: {
        likes: {
          select: {
            userId: true,
          },
        },
        author: {
          select: {
            username: true,
            picture: true,
            id: true,
          },
        },
      },
    });

    if (!comments) {
      throw new Error(`Comments for post with id ${id} not found`);
    }

    const commentsWithLikes = comments.map((comment) => {
      const likedByCurrentUser = comment.likes.some(
        (like) => like.userId === dbUserID
      );
      return {
        ...comment,
        likedByCurrentUser,
        userId: dbUserID,
        depth: 0,
        isLastComment: false,
      };
    });

    return groupCommentsByParentId(commentsWithLikes);
  } catch (error) {
    console.error("Error retrieving post comments:", error);
    throw error;
  }
}

export async function getPostsByUserClerkId(
  clerkId: string
): Promise<{ heading: string; tags: string[] }[]> {
  try {
    const posts = await prisma.post.findMany({
      where: { clerkId },
      include: {
        tags: {
          select: {
            tag: true,
          },
        },
      },
    });

    return posts.map((post) => ({
      heading: post.heading,
      tags: post.tags.map((tagOnPost) => tagOnPost.tag.name),
    }));
  } catch (error) {
    console.error("Error retrieving posts by user ID:", error);
    throw error;
  }
}

export async function getPopularTags(): Promise<
  { name: string; views: number }[]
> {
  try {
    const tagCounts = await prisma.tagOnPost.groupBy({
      by: ["tagId"],
      _count: {
        postId: true,
      },
      orderBy: {
        _count: {
          postId: "desc",
        },
      },
      take: 6,
    });

    const tagIds = tagCounts.map((tagCount) => tagCount.tagId);
    const tags = await prisma.tag.findMany({
      where: {
        id: {
          in: tagIds,
        },
      },
    });

    const tagNameMap: Record<number, string> = {};

    tags.forEach((tag) => {
      tagNameMap[tag.id] = tag.name;
    });

    return tagCounts.map((tagCount) => ({
      name: tagNameMap[tagCount.tagId],
      views: tagCount._count.postId,
    }));
  } catch (error) {
    console.error("Error retrieving popular tags:", error);
    throw error;
  }
}

type PostToEditByIdType = {
  heading: string;
  content: string;
  image: string;
  group: string;
  tags: string[];
};

export async function getPostToEditById(
  id: number
): Promise<PostToEditByIdType> {
  try {
    const user = verifyAuth("You must be logged in to edit a post.");

    const dbUserID: number = (user.sessionClaims.metadata as any).userId;

    const post = await prisma.post.findUnique({
      where: { id, authorId: dbUserID },
      include: {
        tags: {
          select: {
            tag: true,
          },
        },
        group: true,
      },
    });

    if (!post) {
      throw new Error(`Post with id ${id} not found`);
    }

    return {
      heading: post.heading,
      content: post.content,
      image: post.image,
      group: post.group?.id.toString() || "",
      tags: post.tags.map((tagOnPost) => tagOnPost.tag.name),
    };
  } catch (error) {
    console.error("Error retrieving post to edit:", error);
    throw error;
  }
}
