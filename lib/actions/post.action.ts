"use server";

import { type Post } from "@prisma/client";
import prisma from "../prisma";

import { Group } from "@prisma/client";

export async function createPost(data: Post) {
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

interface UpdatePostProps {
  id: number;
  content?: string;
  isEdited?: boolean;
  // do we continue added other fields in?
}

export async function updatePost({ id, content }: UpdatePostProps) {
  try {
    const updatedPost = await prisma.post.update({
      where: {
        id,
      },
      data: {
        content,
        isEdited: true,
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

// export async function getGroupWithAllData(groupId: number) {
//   try {
//     const group = await prisma.group.findUnique({
//       where: {
//         id: groupId,
//       },
//       include: {
//         members: {
//           include: {
//             user: true,
//           },
//         },
//       },
//     });

//     return group;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   } finally {
//     await prisma.$disconnect();
//   }
// }

export async function getGroupWithAllData(
  groupId: number
): Promise<Array<typeof GroupWithMembers>> {
  try {
    const group = await prisma.group.findUnique({
      where: {
        id: groupId,
      },
      include: {
        members: {
          include: {
            user: true,
          },
        },
      },
    });

    return [group];
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getAllGroups(): Promise<Group[]> {
  try {
    const groups = await prisma.group.findMany({
      include: {
        members: {
          include: {
            user: true,
          },
        },
      },
    });

    return groups;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
