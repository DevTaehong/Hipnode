"use server";

import prisma from "@/lib/prisma";
import { verifyAuth } from "@/lib/auth";
import { currentUser } from "@clerk/nextjs/server";

export async function getProfileData({ username }: { username?: string }) {
  try {
    if (username) {
      const data = await prisma.user.findUnique({
        where: {
          username,
        },
        include: {
          following: {
            take: 6,
            include: {
              followed: {
                select: {
                  username: true,
                  picture: true,
                },
              },
            },
          },
          _count: {
            select: {
              followers: true,
              following: true,
            },
          },
        },
      });

      return data;
    }

    const user = verifyAuth("You must be logged in to view your profile.");

    const data = await prisma.user.findUnique({
      where: {
        clerkId: user.userId,
      },
      include: {
        following: {
          take: 6,
          include: {
            followed: {
              select: {
                username: true,
                picture: true,
              },
            },
          },
        },
        _count: {
          select: {
            followers: true,
            following: true,
          },
        },
      },
    });

    return data;
  } catch (error) {
    console.error("Error fetching user by clerkId or username:", error);
    throw error;
  }
}

export async function getProfilePosts(): Promise<any> {
  try {
    verifyAuth("You must be logged in to view your profile.");

    const userData = await currentUser();

    const userId = userData?.publicMetadata.userId as number;

    const data = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
      include: {
        tags: {
          select: {
            tag: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
      skip: 0,
    });

    const extendedData = data.map((post) => ({
      ...post,
      tags: post.tags.map((tagOnPost) => tagOnPost.tag.name),
    }));

    return extendedData;
  } catch (error) {
    console.error("Error fetching user posts:", error);
    throw error;
  }
}

export async function getProfileMeetups(): Promise<any> {
  try {
    verifyAuth("You must be logged in to view your profile.");

    const userData = await currentUser();

    const userId = userData?.publicMetadata.userId as number;

    const data = await prisma.meetUp.findMany({
      where: {
        responsiblePersonId: userId,
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
      skip: 0,
    });

    const extendedData = data.map((meetup) => ({
      ...meetup,
      tags: meetup.tags.map((obj) => {
        return { id: obj.tag.id, name: obj.tag.name };
      }),
    }));

    return extendedData;
  } catch (error) {
    console.error("Error fetching user meetups:", error);
    throw error;
  }
}

export async function getProfilePodcasts(): Promise<any> {
  try {
    verifyAuth("You must be logged in to view your profile.");

    const userData = await currentUser();

    const userId = userData?.publicMetadata.userId as number;

    const data = await prisma.podcast.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
      skip: 0,
    });

    return data;
  } catch (error) {
    console.error("Error fetching user meetups:", error);
    throw error;
  }
}

export async function getProfileInterviews(): Promise<any> {
  try {
    verifyAuth("You must be logged in to view your profile.");

    const userData = await currentUser();

    const userId = userData?.publicMetadata.userId as number;

    const data = await prisma.interview.findMany({
      where: {
        creatorId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
      skip: 0,
    });

    return data;
  } catch (error) {
    console.error("Error fetching user meetups:", error);
    throw error;
  }
}

export async function getProfileHistory(): Promise<any> {
  return [];
}

export async function getPerformanceData(): Promise<any> {
  try {
    verifyAuth("You must be logged in to view your profile.");

    const userData = await currentUser();

    const userId = userData?.publicMetadata.userId as number;

    const data = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
      select: {
        id: true,
        image: true,
        viewCount: true,
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
      orderBy: {
        viewCount: "desc",
      },
      take: 6,
      skip: 0,
    });

    return data;
  } catch (error) {
    console.error("Error fetching user meetups:", error);
    throw error;
  }
}
