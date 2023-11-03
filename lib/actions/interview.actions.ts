import prisma from "@/lib/prisma";

export async function getAllInterviews() {
  try {
    const shows = await prisma.interview.findMany();

    return shows;
  } catch (error) {
    console.error("Error fetching all shows:", error);
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
