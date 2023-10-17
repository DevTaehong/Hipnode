"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import {
  CreateGroupParams,
  DeleteGroupParams,
  EditGroupParams,
  GetGroupByIdParams,
} from "./shared.types";

// LINK - https://github.com/adrianhajdin/stack_overflow_nextjs13/blob/main/lib/actions/question.action.ts#L229
export async function createGroup(params: CreateGroupParams) {
  try {
    const {
      name,
      description,
      path,
      createdBy,
      logo,
      coverImage,
      admins,
      members,
    } = params;

    await prisma.group.create({
      data: {
        name,
        description,
        createdBy,
        logo,
        coverImage,
        admins: {
          connect: admins,
        },
        members: {
          connect: members,
        },
      },
    });
    revalidatePath(path);
  } catch (error) {
    console.error("Error creating a group:", error);
    throw error;
  }
}

export async function getGroupById(params: GetGroupByIdParams) {
  try {
    const { groupId } = params;

    const group = await prisma.group.findUnique({
      where: {
        id: groupId,
      },
    });

    return group;
  } catch (error) {
    console.error("Error retrieving a group:", error);
    throw error;
  }
}

export async function getGroups() {
  try {
    const groups = await prisma.group.findMany();
    return groups;
  } catch (error) {
    console.error("Error finding groups:", error);
    throw error;
  }
}

export async function editGroup(params: EditGroupParams) {
  try {
    const {
      groupId,
      name,
      description,
      path,
      logo,
      coverImage,
      admins,
      members,
    } = params;

    await prisma.group.update({
      where: {
        id: groupId,
      },
      data: {
        name,
        description,
        logo,
        coverImage,
        admins: {
          connect: admins,
        },
        members: {
          connect: members,
        },
      },
    });
    revalidatePath(path);
  } catch (error) {
    console.error("Error editing a group:", error);
    throw error;
  }
}

export async function deleteGroup(params: DeleteGroupParams) {
  try {
    const { groupId, path } = params;

    await prisma.group.delete({
      where: {
        id: groupId,
      },
    });
    revalidatePath(path);
  } catch (error) {
    console.error("Error deleting a group:", error);
    throw error;
  }
}
