"use server";

import { Like, Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import prisma from "../prisma";
import {
  getPostsByGroupIdQueryOptions,
  getPostsFromGroupsQueryOptions,
} from "@/types/shared.types";
import {
  AddCommentOrReply,
  CommentsGroupedByParentId,
  ExtendedPrismaPost,
  GetPostByIdType,
  PostToEditByIdType,
  UpdateCommentType,
} from "@/types/posts";
import { verifyAuth } from "../auth";
import { groupCommentsByParentId } from "@/utils";

export async function handleTags(
  tagNames: string[]
): Promise<{ id: number }[]> {
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
    image: string;
    groupId: number;
    contentType: string;
    blurImage: string;
    imageWidth: number;
    imageHeight: number;
  },
  tagNames: string[]
): Promise<Post> {
  try {
    const { clerkId, userId } = await verifyAuth(
      "You must be logged in to create post."
    );

    const allTagIdsToConnect = await handleTags(tagNames);

    await prisma.$transaction(async (prisma) => {
      const post = await prisma.post.create({
        data: {
          ...postData,
          authorId: userId,
          clerkId,
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
    const { clerkId, userId } = await verifyAuth(
      "You must be logged in to update a post."
    );

    const allTagIdsToConnect = await handleTags(tagNames);

    await prisma.$transaction(async (prisma) => {
      const updatedPost = await prisma.post.update({
        where: { id: postId, authorId: userId },
        data: { ...data, authorId: userId, clerkId },
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
  } catch (error) {
    console.error("Error updating post with tags:", error);
    throw error;
  }
}

export async function deletePost(id: number): Promise<void> {
  try {
    const { userId } = await verifyAuth(
      "You must be logged in to delete a post."
    );

    await prisma.post.delete({
      where: { id, authorId: userId },
    });
    revalidatePath("/");
    redirect("/");
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
}

export async function getPostContentById(id: number): Promise<GetPostByIdType> {
  try {
    const { userId } = await verifyAuth(
      "You must be logged in to get Post Content."
    );

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
        blurImage: true,
        imageWidth: true,
        imageHeight: true,
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
      userCanEditMedia: post.author.id === userId,
    };

    return extendedPost;
  } catch (error) {
    console.error("Error retrieving post content:", error);
    throw error;
  }
}

export async function countAllPosts(): Promise<number> {
  try {
    const postsCount = await prisma.post.count();
    return postsCount;
  } catch (error) {
    console.error("Error counting posts:", error);
    throw error;
  }
}

export async function getAllPosts({
  numberToSkip = 0,
}: {
  numberToSkip?: number;
}): Promise<ExtendedPrismaPost[]> {
  try {
    const numberOfAvailablePosts = await countAllPosts();

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
        blurImage: true,
        imageWidth: true,
        imageHeight: true,
        contentType: true,

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
      numberOfAvailablePosts,
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
): Promise<Post[]> {
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
): Promise<Post[]> {
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

export async function getPostsFromGroups(myCursorId?: number): Promise<Post[]> {
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
    const { userId } = await verifyAuth(
      "You must be logged in to add a comment or reply."
    );

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
    return {
      ...newComment,
      userId,
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
    const { userId } = await verifyAuth(
      "You must be logged in to update a comment."
    );

    const comment = await prisma.comment.update({
      where: { id: commentId, authorId: userId },
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
    return { ...comment, userId };
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
    const { userId } = await verifyAuth(
      "You must be logged in to delete a comment or reply."
    );

    await prisma.comment.deleteMany({
      where: { parentId: commentId, authorId: userId },
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

export async function sharePostAndCountShares(postId: number): Promise<number> {
  try {
    const { userId } = await verifyAuth(
      "You must be logged in to share a post."
    );

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

export async function toggleLikePost(postId: number): Promise<Like | null> {
  try {
    const { userId } = await verifyAuth(
      "You must be logged in to toggle like on posts."
    );
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
  commentId: number
): Promise<Like | null> {
  try {
    const { userId } = await verifyAuth(
      "You must be logged in to toggle like on a comment."
    );

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
  const { userId } = await verifyAuth(
    "You must be logged in to get post comments."
  );

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
        (like) => like.userId === userId
      );
      return {
        ...comment,
        likedByCurrentUser,
        userId,
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

export async function getPostsByAuthorId(
  authorId: number
): Promise<{ heading: string; tags: string[] }[]> {
  try {
    const posts = await prisma.post.findMany({
      where: { authorId },
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

export async function getPostToEditById(
  id: number
): Promise<PostToEditByIdType> {
  try {
    const { userId } = await verifyAuth(
      "You must be logged in to edit a post."
    );
    const post = await prisma.post.findUnique({
      where: { id, authorId: userId },
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
      group: post.group,
      tags: post.tags.map((tagOnPost) => tagOnPost.tag.name),
      contentType: post.contentType,
    };
  } catch (error) {
    console.error("Error retrieving post to edit:", error);
    throw error;
  }
}
