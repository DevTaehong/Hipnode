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
