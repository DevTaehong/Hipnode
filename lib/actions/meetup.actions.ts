"use server";

import prisma from "@/lib/prisma";

import { type MeetUp } from "@prisma/client";
import {
  FilteredMeetupsResult,
  MeetUpDataType,
  MeetupTagType,
} from "@/types/posts";

import { redirect } from "next/navigation";
import { verifyAuth } from "../auth";
import { revalidatePath } from "next/cache";

export async function getMeetUp({
  id,
}: {
  id: number;
}): Promise<MeetUp | null> {
  try {
    const meetUp = await prisma.meetUp.findUnique({
      where: {
        id,
      },
    });
    if (!meetUp) {
      throw new Error(`No meetUp found for ID: ${id}`);
    }
    return meetUp;
  } catch (error) {
    console.error("Error getting meetUp:", error);
    throw error;
  }
}

export async function getAllMeetUps(): Promise<MeetUp[]> {
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

async function handleMeetupTags(tagNames: string[]): Promise<{ id: number }[]> {
  const existingTags = await prisma.meetupTag.findMany({
    where: {
      name: {
        in: tagNames,
      },
    },
  });

  const existingTagNames = existingTags.map((tag) => tag.name);
  const newTagNames = tagNames.filter(
    (tagName) => !existingTagNames.includes(tagName)
  );

  if (newTagNames.length > 0) {
    await prisma.meetupTag.createMany({
      data: newTagNames.map((name) => ({ name })),
      skipDuplicates: true,
    });
  }

  const allTags = await prisma.meetupTag.findMany({
    where: {
      name: { in: tagNames },
    },
  });

  return allTags.map((tag) => ({ id: tag.id }));
}

export async function createMeetUpWithTags(
  meetupData: MeetUpDataType,
  tagNames: string[]
): Promise<MeetUp> {
  try {
    const user = verifyAuth("You must be logged in to create a meetup.");

    const dbUserID: number = (user.sessionClaims.metadata as any).userId;
    if (!dbUserID) throw new Error("User not found");
    const clerkId: string = user.userId;

    const allTagIdsToConnect = await handleMeetupTags(tagNames);

    const meetUp = await prisma.meetUp.create({
      data: {
        ...meetupData,
        responsiblePersonId: dbUserID,
        clerkId,
      },
      include: {
        responsiblePerson: {
          select: {
            name: true,
            picture: true,
          },
        },
      },
    });

    await prisma.tagOnMeetup.createMany({
      data: allTagIdsToConnect.map((tag) => ({
        tagId: tag.id,
        meetupId: meetUp.id,
      })),
    });

    redirect("/meet-ups");
  } catch (error) {
    console.error("Error creating meetUp:", error);
    throw error;
  }
}

export async function getTopFiveMeetupTags(): Promise<MeetupTagType[]> {
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
}): Promise<FilteredMeetupsResult> {
  const itemsPerPage = 20;
  try {
    const user = verifyAuth(
      "We need the logged in user ID for edit and delete CRUD's."
    );

    const dbUserID: number = (user.sessionClaims.metadata as any).userId;

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
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: itemsPerPage,
    });

    const transformedMeetups = meetups.map((meetup) => ({
      ...meetup,
      userCanEditMedia: meetup.responsiblePersonId === dbUserID,
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

export async function getMeetupById(id: number): Promise<MeetUp | null> {
  try {
    const meetup = await prisma.meetUp.findUnique({
      where: {
        id,
      },
    });
    return meetup || null;
  } catch (error) {
    console.error(`Error getting meetup by ID ${id}:`, error);
    throw error;
  }
}

export type MeetupToEditType = {
  heading: string;
  content: string;
  image: string;
  contactEmail: string;
  contactNumber: string;
  location: string;
  tags: string[];
  contentType: string;
};

export async function getMeetupToEdit(
  id: number
): Promise<MeetupToEditType | null> {
  try {
    const user = verifyAuth("You must be logged in to edit a post.");

    const dbUserID: number = (user.sessionClaims.metadata as any).userId;

    const meetup = await prisma.meetUp.findUnique({
      where: {
        id,
        responsiblePersonId: dbUserID,
      },
      include: {
        tags: {
          select: {
            tag: true,
          },
        },
      },
    });

    if (!meetup) {
      return null;
    }

    return {
      heading: meetup.title,
      content: meetup.summary,
      image: meetup.image,
      contactEmail: meetup.contactEmail,
      contactNumber: meetup.contactNumber,
      location: meetup.location,
      tags: meetup.tags.map((tagOnMeetup) => tagOnMeetup.tag.name),
      contentType: meetup.contentType,
    };
  } catch (error) {
    console.error(`Error getting meetup to edit by ID ${id}:`, error);
    throw error;
  }
}

export async function updateMeetup(
  id: number,
  meetupData: MeetUpDataType,
  tagNames: string[]
): Promise<MeetUp> {
  try {
    const user = verifyAuth("You must be logged in to update a meetup.");

    const dbUserID: number = (user.sessionClaims.metadata as any).userId;
    if (!dbUserID) throw new Error("User not found");

    const allTagIdsToConnect = await handleMeetupTags(tagNames);

    await prisma.$transaction(async (prisma) => {
      const updatedMeetup = await prisma.meetUp.update({
        where: { id, responsiblePersonId: dbUserID },
        data: { ...meetupData, responsiblePersonId: dbUserID },
        include: {
          responsiblePerson: true,
        },
      });

      await prisma.tagOnMeetup.deleteMany({
        where: { meetupId: id },
      });

      await prisma.tagOnMeetup.createMany({
        data: allTagIdsToConnect.map((tagId) => ({
          meetupId: updatedMeetup.id,
          tagId: tagId.id,
        })),
        skipDuplicates: true,
      });

      return updatedMeetup;
    });

    revalidatePath("/meet-ups");
    redirect("/meet-ups");
  } catch (error) {
    console.error(`Error updating meetup with ID ${id}:`, error);
    throw error;
  }
}

export async function deleteMeetupAction(id: number): Promise<void> {
  try {
    const user = verifyAuth(
      "You must be logged in to delete a meetup, and you can only delete your own meetup."
    );

    const dbUserID: number = (user.sessionClaims.metadata as any).userId;

    if (!dbUserID) throw new Error("User not found");

    const deletedMeetup = await prisma.meetUp.delete({
      where: {
        id,
        responsiblePersonId: dbUserID,
      },
    });

    if (!deletedMeetup) {
      throw new Error(
        `Meetup with ID ${id} not found or you are not authorized to delete it.`
      );
    }

    revalidatePath("/meet-ups");
    redirect("/meet-ups");
  } catch (error) {
    console.error("Error deleting meetUp:", error);
    throw error;
  }
}
