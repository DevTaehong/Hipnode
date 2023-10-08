"use server";

import prisma from "../prisma";

interface CreatePostProps {
  content: string;
  authorId: number;
  // image?: string;
}

export async function createPost({ content, authorId }: CreatePostProps) {
  try {
    const post = await prisma.post.create({
      data: {
        content,
        authorId,
        // image
      },
    });

    return post;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

interface UpdatePostProps {
  id: number;
  content?: string; // Should all fields be optional?
  isEdited?: boolean;
  // do we continue added other fields in?
}

export async function updatePost({
  id,
  content,
  isEdited = true, // post is being updated, this can be set to true by default
}: UpdatePostProps) {
  try {
    const updatedPost = await prisma.post.update({
      where: {
        id,
      },
      data: {
        content,
        isEdited,
        // other fields to update
      },
    });

    return updatedPost;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
}

interface UniquePostProps {
  id: number;
}

export async function deletePost({ id }: UniquePostProps) {
  try {
    const post = await prisma.post.delete({
      where: {
        id,
      },
    });

    return post;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
}

export async function getPost({ id }: UniquePostProps) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    return post;
  } catch (error) {
    console.error("Error retrieving post:", error);
    throw error;
  }
}

export async function getAllPosts() {
  try {
    const posts = await prisma.post.findMany();

    return posts;
  } catch (error) {
    console.error("Error retrieving all posts:", error);
    throw error;
  }
}
