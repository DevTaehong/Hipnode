"use server";

import prisma from "@/lib/prisma";

export async function getAllInterviews() {
  try {
    const interviews = await prisma.interview.findMany({
      include: {
        creator: {
          select: {
            name: true,
            picture: true,
          },
        },
      },
    });
    return interviews;
  } catch (error) {
    console.error("Error fetching all interviews with creator details:", error);
    throw error;
  }
}

export async function getInterviewById(interviewId: number) {
  try {
    const interview = await prisma.interview.findUnique({
      where: {
        id: interviewId,
      },
    });

    if (!interview) {
      throw new Error(`No interview found for ID: ${interviewId}`);
    }

    return interview;
  } catch (error) {
    console.error(`Error fetching interview with ID ${interviewId}:`, error);
    throw error;
  }
}

export async function getInterviewsByCreatorId(creatorId: number) {
  try {
    const interviews = await prisma.interview.findMany({
      where: {
        creatorId,
      },
    });

    if (!interviews || interviews.length === 0) {
      throw new Error(`No interviews found for creator ID: ${creatorId}`);
    }

    return interviews;
  } catch (error) {
    console.error(
      `Error fetching interviews for creator ID ${creatorId}:`,
      error
    );
    throw error;
  }
}

type CreateInterviewType = {
  creatorId: number;
  title: string;
  bannerImage: string;
  details: string;
  websiteLink: string;
  salary: number;
  salaryPeriod: string;
  updates: number;
};

export async function createInterview(data: CreateInterviewType) {
  try {
    const interview = await prisma.interview.create({
      data,
    });

    return interview;
  } catch (error) {
    console.error("Error creating interview:", error);
    throw error;
  }
}

export async function updateInterview(
  id: number,
  data: Partial<CreateInterviewType>
) {
  try {
    const interview = await prisma.interview.update({
      where: {
        id,
      },
      data,
    });

    return interview;
  } catch (error) {
    console.error("Error updating interview:", error);
    throw error;
  }
}

export async function deleteInterview(id: number) {
  try {
    const interview = await prisma.interview.delete({
      where: {
        id,
      },
    });

    return interview;
  } catch (error) {
    console.error("Error deleting interview:", error);
    throw error;
  }
}

export async function createInterviewTag(name: string) {
  try {
    const existingTag = await prisma.interviewTag.findUnique({
      where: { name },
    });

    if (existingTag) {
      return existingTag;
    }

    const newTag = await prisma.interviewTag.create({
      data: { name },
    });

    return newTag;
  } catch (error) {
    console.error("Failed to create or retrieve interview tag:", error);
    throw error;
  }
}

export async function getTagsByInterviewId(interviewId: number) {
  try {
    const tagConnections = await prisma.tagOnInterview.findMany({
      where: {
        interviewId,
      },
      include: {
        tag: true,
      },
    });

    const tags = tagConnections.map((connection) => connection.tag);

    return tags;
  } catch (error) {
    console.error(
      `Error fetching tags for interview ID ${interviewId}:`,
      error
    );
    throw error;
  }
}

export async function getTopFiveTags() {
  try {
    const mostUsedTags = await prisma.tagOnInterview.groupBy({
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

    const tagsWithDetails = await prisma.interviewTag.findMany({
      where: {
        id: {
          in: mostUsedTags.map((tag) => tag.tagId),
        },
      },
    });

    return tagsWithDetails;
  } catch (error) {
    console.error("Error fetching the top five tags:", error);
    throw error;
  }
}

export async function getFilteredInterviews({
  tagIds,
  skipCount = 0,
}: {
  tagIds?: number[];
  skipCount?: number;
}) {
  try {
    const interviews = await prisma.interview.findMany({
      where:
        tagIds && tagIds.length
          ? {
              tags: {
                some: {
                  tagId: {
                    in: tagIds,
                  },
                },
              },
            }
          : {},
      include: {
        creator: {
          select: {
            name: true,
            picture: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
      skip: skipCount,
      take: 20,
    });

    return interviews;
  } catch (error) {
    console.error("Error fetching filtered interviews:", error);
    throw error;
  }
}
