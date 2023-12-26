"use server";

import { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import prisma from "../prisma";
import {
  GetPostsByGroupIdQueryOptions,
  GetPostsFromGroupsQueryOptions,
} from "@/types/shared.types";
import {
  CommentsGroupedByParentId,
  ExtendedPrismaPost,
  GetPostByIdType,
  PostToEditByIdType,
  UpdateCommentType,
} from "@/types/posts";
import { verifyAuth } from "../auth";
import {
  groupCommentsByParentId,
  createNotificationIfRequired,
  getNotificationDate,
} from "@/utils";
import {
  createNotification,
  deleteNotification,
  updateNotification,
} from "./notification.actions";

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
      "You must be logged in to create post.",
      false
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
      "You must be logged in to update a post.",
      false
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
      "You must be logged in to delete a post.",
      false
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

export async function incrementViewCount(postId: number): Promise<void> {
  try {
    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });
  } catch (error) {
    console.error("Error incrementing view count for post:", error);
    throw error;
  }
}

export async function getPostContentById(id: number): Promise<GetPostByIdType> {
  try {
    const { userId } = await verifyAuth(
      "You must be logged in to get Post Content.",
      false
    );

    await incrementViewCount(id);

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
      loggedInUserHasLikedPost: post.likes.some(
        (like) => like.userId === userId
      ),
    };

    revalidatePath("/");
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
    const { userId } = await verifyAuth(
      "You must be logged in to edit content.",
      false
    );

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

    revalidatePath(`/`);

    return posts.map((post) => ({
      ...post,
      numberOfAvailablePosts,
      likesCount: post.likes.length,
      likes: post.likes,
      commentsCount: post.comments.length,
      tags: post.tags.map((tagOnPost) => tagOnPost.tag.name),
      userCanEditMedia: post.author.id === userId,
      loggedInUserHasLikedPost: post.likes.some(
        (like) => like.userId === userId
      ),
    }));
  } catch (error) {
    console.error("Error retrieving posts:", error);
    throw error;
  }
}

export async function countPostsByAuthorId(authorId: number): Promise<number> {
  try {
    const count = await prisma.post.count({
      where: {
        authorId,
      },
    });
    return count;
  } catch (error) {
    console.error("Error counting posts for user:", error);
    throw error;
  }
}

export async function getAllPostsByUserId({
  numberToSkip = 0,
  authorId,
}: {
  numberToSkip?: number;
  authorId: number;
}): Promise<ExtendedPrismaPost[]> {
  try {
    const { userId } = await verifyAuth(
      "You must be logged in to get Post Content.",
      false
    );

    const numberOfAvailablePosts = await countPostsByAuthorId(authorId);

    const posts = await prisma.post.findMany({
      where: {
        authorId,
      },
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
      userCanEditMedia: post.author.id === userId,
      loggedInUserHasLikedPost: post.likes.some(
        (like) => like.userId === userId
      ),
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
    let queryOptions: GetPostsByGroupIdQueryOptions = {
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
    let queryOptions: GetPostsByGroupIdQueryOptions = {
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
    let queryOptions: GetPostsFromGroupsQueryOptions = {
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
  path: string,
  postHeading: string | undefined
): Promise<void> {
  try {
    const { userId } = await verifyAuth(
      "You must be logged in to add a comment or reply.",
      false
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

    // NOTE - It's the same as how Reddit creates notifications for comments and replies
    const notificationSenderId = userId;
    const replyingTo = newComment?.parent?.authorId;

    let isReplying;
    let replyingToSelf;

    if (replyingTo) {
      isReplying = true;
      replyingToSelf = notificationSenderId === replyingTo;
    }

    // NOTE - only create a notification when a user replies to someone's comment
    if (isReplying && !replyingToSelf) {
      createNotificationIfRequired(
        replyingTo,
        "REPLY",
        newComment.author.picture,
        newComment.author.username,
        newComment.content,
        postHeading,
        newComment.id,
        newComment.createdAt,
        newComment.parentId ?? undefined
      );
      return;
    }

    // COMMENT ON A POST --------------------
    prisma.post
      .findUnique({
        where: {
          id: postId,
        },
        select: {
          authorId: true,
        },
      })
      .then((post) => {
        // NOTE - only create a notification when a user comments on someone else's post
        const isPostOwner = post?.authorId === notificationSenderId;

        if (!isPostOwner && replyingTo === undefined) {
          createNotificationIfRequired(
            post?.authorId,
            "COMMENT",
            newComment.author.picture,
            newComment.author.username,
            newComment.content,
            postHeading,
            newComment.id,
            newComment.createdAt
          );
        }
      });
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
      "You must be logged in to update a comment.",
      false
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

    const date = getNotificationDate(comment.updatedAt);
    updateNotification({
      commentId,
      commentContent: content,
      date,
    });

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
      "You must be logged in to delete a comment or reply.",
      false
    );

    deleteNotification({ commentId });

    await prisma.comment.deleteMany({
      where: { parentId: commentId, authorId: userId },
    });

    await prisma.comment.delete({
      where: { id: commentId },
    });
    revalidatePath(path);
  } catch (error) {
    console.error("Error deleting comment or replies:", error);
    throw error;
  }
}

export async function sharePostAndCountShares(postId: number): Promise<number> {
  try {
    const { userId } = await verifyAuth(
      "You must be logged in to share a post.",
      false
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

export async function toggleLikeComment(
  commentId: number,
  receiverId: number | undefined,
  postHeading: string | undefined
): Promise<void> {
  try {
    const { userId } = await verifyAuth(
      "You must be logged in to toggle like on a comment.",
      false
    );

    const existingLike = await prisma.like.findUnique({
      where: { userId_commentId: { userId, commentId } },
    });
    if (existingLike) {
      await prisma.like.delete({ where: { id: existingLike.id } });

      deleteNotification({ likeId: existingLike.id });
    } else {
      const newLike = await prisma.like.create({ data: { userId, commentId } });

      const senderId = userId;

      prisma.user
        .findUnique({
          where: {
            id: senderId,
          },
          select: {
            username: true,
            picture: true,
          },
        })
        .then((user) => {
          if (receiverId !== senderId) {
            if (!user || !receiverId) return;
            const date = getNotificationDate(new Date());
            createNotification({
              commentId,
              likeId: newLike.id,
              userId: receiverId,
              senderName: user?.username,
              image: user?.picture,
              type: "REACTION",
              title: postHeading,
              date,
            });
          }
        });
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
    "You must be logged in to get post comments.",
    false
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
      "You must be logged in to edit a post.",
      false
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

export async function countPostsByTagName(tagName: string): Promise<number> {
  try {
    const count = await prisma.post.count({
      where: {
        tags: {
          some: {
            tag: {
              name: tagName,
            },
          },
        },
      },
    });
    return count;
  } catch (error) {
    console.error("Error counting posts by tag name:", error);
    throw error;
  }
}

export async function getAllPostsByTagName({
  numberToSkip = 0,
  tagName,
}: {
  numberToSkip?: number;
  tagName: string;
}): Promise<ExtendedPrismaPost[]> {
  try {
    const { userId } = await verifyAuth(
      "You must be logged in to get Post Content.",
      false
    );

    const numberOfAvailablePosts = await countPostsByTagName(tagName);

    const posts = await prisma.post.findMany({
      where: {
        tags: {
          some: {
            tag: {
              name: tagName,
            },
          },
        },
      },
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

    revalidatePath(`/tags/${tagName}`);

    return posts.map((post) => ({
      ...post,
      numberOfAvailablePosts,
      likesCount: post.likes.length,
      likes: post.likes,
      commentsCount: post.comments.length,
      tags: post.tags.map((tagOnPost) => tagOnPost.tag.name),
      userCanEditMedia: post.author.id === userId,
      loggedInUserHasLikedPost: post.likes.some(
        (like) => like.userId === userId
      ),
    }));
  } catch (error) {
    console.error("Error retrieving posts:", error);
    throw error;
  }
}

export async function countPostsByTagNameByUserId({
  tagName,
  authorId,
}: {
  tagName: string;
  authorId: number;
}): Promise<number> {
  try {
    const count = await prisma.post.count({
      where: {
        authorId,
        tags: {
          some: {
            tag: {
              name: tagName,
            },
          },
        },
      },
    });
    return count;
  } catch (error) {
    console.error("Error counting posts by tag name:", error);
    throw error;
  }
}

export async function getAllPostsByTagNameByUserId({
  numberToSkip = 0,
  tagName,
  authorId,
}: {
  numberToSkip?: number;
  tagName: string;
  authorId: number;
}): Promise<ExtendedPrismaPost[]> {
  try {
    const { userId } = await verifyAuth(
      "You must be logged in to edit your own posts.",
      false
    );

    const numberOfAvailablePosts = await countPostsByTagNameByUserId({
      tagName,
      authorId,
    });

    const posts = await prisma.post.findMany({
      where: {
        authorId,
        tags: {
          some: {
            tag: {
              name: tagName,
            },
          },
        },
      },
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

    revalidatePath(`/tags/${tagName}`);

    return posts.map((post) => ({
      ...post,
      numberOfAvailablePosts,
      likesCount: post.likes.length,
      likes: post.likes,
      commentsCount: post.comments.length,
      tags: post.tags.map((tagOnPost) => tagOnPost.tag.name),
      userCanEditMedia: post.author.id === userId,
      loggedInUserHasLikedPost: post.likes.some(
        (like) => like.userId === userId
      ),
    }));
  } catch (error) {
    console.error("Error retrieving posts:", error);
    throw error;
  }
}

export async function followUser(userIdToFollow: number) {
  try {
    const { userId: followerId } = await verifyAuth(
      "You must be logged in to follow a user.",
      false
    );

    if (followerId === userIdToFollow) {
      throw new Error("You cannot follow yourself.");
    }
    const existingFollow = await prisma.follower.findFirst({
      where: {
        followerId,
        followedId: userIdToFollow,
      },
    });

    let followingStatus;

    if (existingFollow) {
      await prisma.follower.delete({
        where: {
          id: existingFollow.id,
        },
      });
      followingStatus = false;
    } else {
      await prisma.follower.create({
        data: {
          followerId,
          followedId: userIdToFollow,
        },
      });
      followingStatus = true;
    }

    return followingStatus;
  } catch (error) {
    console.error("Error following/unfollowing user:", error);
    throw error;
  }
}

export async function isFollowingUser(userIdToFollow: number) {
  try {
    const { userId: followerId } = await verifyAuth(
      "You must be logged in to follow a user."
    );

    const existingFollow = await prisma.follower.findFirst({
      where: {
        followerId,
        followedId: userIdToFollow,
      },
    });

    return Boolean(existingFollow);
  } catch (error) {
    console.error("Error checking following status:", error);
    throw error;
  }
}

export async function numberOfPeopleFollowed(): Promise<number> {
  try {
    const { userId } = await verifyAuth(
      "You must be logged in to know how many people you follow.",
      false
    );

    const numberOfFollowedUsers = await prisma.user.count({
      where: {
        followers: {
          some: {
            followerId: userId,
          },
        },
      },
    });

    return numberOfFollowedUsers;
  } catch (error) {
    console.error("Error getting number of followed users:", error);
    throw error;
  }
}

export async function getMostPopularPosts({
  numberToSkip = 0,
}: {
  numberToSkip?: number;
}): Promise<ExtendedPrismaPost[]> {
  try {
    const { userId } = await verifyAuth(
      "You must be logged in to get Post Content.",
      false
    );

    const numberOfAvailablePosts = await countAllPosts();

    const posts = await prisma.post.findMany({
      skip: numberToSkip,
      take: 10,
      orderBy: {
        viewCount: "desc",
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

    revalidatePath(`/`);

    return posts.map((post) => ({
      ...post,
      numberOfAvailablePosts,
      likesCount: post.likes.length,
      likes: post.likes,
      commentsCount: post.comments.length,
      tags: post.tags.map((tagOnPost) => tagOnPost.tag.name),
      userCanEditMedia: post.author.id === userId,
      loggedInUserHasLikedPost: post.likes.some(
        (like) => like.userId === userId
      ),
    }));
  } catch (error) {
    console.error("Error retrieving most popular posts:", error);
    throw error;
  }
}

export async function countAllPostsByFollowing(): Promise<number> {
  try {
    const { userId } = await verifyAuth(
      "You must be logged in to view this content.",
      false
    );

    const followingUsers = await prisma.follower.findMany({
      where: {
        followerId: userId,
      },
    });

    const followingUserIds = followingUsers.map((user) => user.followedId);

    const count = await prisma.post.count({
      where: {
        authorId: {
          in: followingUserIds,
        },
      },
    });

    return count;
  } catch (error) {
    console.error("Error retrieving number of posts by following:", error);
    throw error;
  }
}

export async function getPostsByFollowing({
  numberToSkip = 0,
}: {
  numberToSkip?: number;
}) {
  try {
    const { userId } = await verifyAuth(
      "You must be logged in to view this content.",
      false
    );

    const numberOfAvailablePosts = await countAllPostsByFollowing();

    const posts = await prisma.post.findMany({
      where: {
        author: {
          followers: {
            some: {
              followerId: userId,
            },
          },
        },
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
      orderBy: {
        createdAt: "desc",
      },
    });

    revalidatePath(`/`);

    return posts.map((post) => ({
      ...post,
      numberOfAvailablePosts,
      likesCount: post.likes.length,
      likes: post.likes,
      commentsCount: post.comments.length,
      tags: post.tags.map((tagOnPost) => tagOnPost.tag.name),
      userCanEditMedia: post.author.id === userId,
      loggedInUserHasLikedPost: post.likes.some(
        (like) => like.userId === userId
      ),
    }));
  } catch (error) {
    console.error("Error retrieving posts by following:", error);
    throw error;
  }
}

export async function togglePostLike(
  postId: number
): Promise<{ liked: boolean; totalLikes: number }> {
  try {
    const { userId } = await verifyAuth(
      "You must be logged in to toggle like on post.",
      false
    );

    const existingLike = await prisma.like.findFirst({
      where: {
        userId,
        postId,
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      await prisma.like.create({
        data: {
          userId,
          postId,
        },
      });
    }

    const totalLikes = await prisma.like.count({
      where: {
        postId,
      },
    });

    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likeCount: totalLikes,
      },
    });

    return { liked: !existingLike, totalLikes };
  } catch (error) {
    console.error("Error toggling post like:", error);
    throw error;
  }
}

export async function toggleCommentLike(
  commentId: number
): Promise<{ liked: boolean; totalLikes: number }> {
  try {
    const { userId } = await verifyAuth(
      "You must be logged in to toggle like on comment.",
      false
    );

    const existingLike = await prisma.like.findFirst({
      where: {
        userId,
        commentId,
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      await prisma.like.create({
        data: {
          userId,
          commentId,
        },
      });
    }

    const totalLikes = await prisma.like.count({
      where: {
        commentId,
      },
    });

    await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        likeCount: totalLikes,
      },
    });

    return { liked: !existingLike, totalLikes };
  } catch (error) {
    console.error("Error toggling comment like:", error);
    throw error;
  }
}
