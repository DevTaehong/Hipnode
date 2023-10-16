"use server";

// @ts-ignore
import { type MeetUp } from "@prisma/client";
import prisma from "@/lib/prisma";

import { MeetUpProp, UpdateMeetUpProps } from "@/types";

export async function getMeetUp({ id }: MeetUpProp) {
  try {
    const meetUp = await prisma.meetUp.findUnique({
      where: {
        id,
      },
    });

    return meetUp;
  } catch (error) {
    console.error("Error getting meetUp:", error);
    throw error;
  }
}

export async function getAllMeetUps() {
  try {
    const meetUps = await prisma.meetUp.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return meetUps;
  } catch (error) {
    console.error("Error getting meetUps:", error);
    throw error;
  }
}

export async function createMeetUp(data: MeetUp) {
  const { title, summary, location, contactEmail, contactNumber, image } = data;

  try {
    const meetUp = await prisma.meetUp.create({
      data: {
        title,
        summary,
        location,
        contactEmail,
        contactNumber,
        image,
      },
    });

    return meetUp;
  } catch (error) {
    console.error("Error creating meetUp:", error);
    throw error;
  }
}

export async function updateMeetUp({ id, content }: UpdateMeetUpProps) {
  try {
    const updatedMeetUp = await prisma.meetUp.update({
      where: {
        id,
      },
      data: {
        content,
        isEdited: true,
      },
    });

    return updatedMeetUp;
  } catch (error) {
    console.error("Error updating meetUp:", error);
    throw error;
  }
}

export async function deleteMeetUp({ id }: MeetUpProp) {
  try {
    const meetUp = await prisma.meetUp.delete({
      where: {
        id,
      },
    });

    return meetUp;
  } catch (error) {
    console.error("Error deleting meetUp:", error);
    throw error;
  }
}
