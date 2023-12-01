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

export async function createMeetupTag(name: string) {
  try {
    const existingTag = await prisma.meetupTag.findUnique({
      where: { name },
    });

    if (existingTag) {
      return existingTag;
    }

    const newTag = await prisma.meetupTag.create({
      data: { name },
    });

    return newTag;
  } catch (error) {
    console.error("Failed to create or retrieve meetup tag:", error);
    throw error;
  }
}

export async function getTopFiveMeetupTags() {
  try {
    // Group and count the tags
    const mostUsedTags = await prisma.tagOnMeetup.groupBy({
      by: ["tagId"],
      _count: {
        tagId: true,
      },
      orderBy: {
        _count: {
          tagId: "desc",
        },
      },
      take: 5,
    });

    // Fetch the details of the top tags
    const tagsWithDetails = await prisma.meetupTag.findMany({
      where: {
        id: {
          in: mostUsedTags.map((tag) => tag.tagId),
        },
      },
    });

    return tagsWithDetails;
  } catch (error) {
    console.error("Error fetching the top five meetup tags:", error);
    throw error;
  }
}

export async function getFilteredMeetups({
  tagIds,
  page = 1,
}: {
  tagIds?: number[];
  page?: number;
}) {
  const itemsPerPage = 20;
  try {
    const skip = (page - 1) * itemsPerPage;
    const meetups = await prisma.meetUp.findMany({
      where:
        tagIds && tagIds.length
          ? { tags: { some: { tagId: { in: tagIds } } } }
          : {},
      include: {
        responsiblePerson: {
          select: { name: true, picture: true },
        },
        tags: {
          select: { tag: { select: { id: true, name: true } } },
        },
      },
      skip,
      take: itemsPerPage,
    });

    const transformedMeetups = meetups.map((meetup) => ({
      ...meetup,
      tags: meetup.tags.map((t) => t.tag),
    }));

    const totalMeetups = await prisma.meetUp.count({
      where:
        tagIds && tagIds.length
          ? { tags: { some: { tagId: { in: tagIds } } } }
          : {},
    });

    const hasMore = page * itemsPerPage < totalMeetups;
    return {
      meetups: transformedMeetups,
      page,
      hasMore,
    };
  } catch (error) {
    console.error("Error fetching filtered meetups:", error);
    throw error;
  }
}
