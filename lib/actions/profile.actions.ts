"use server";

import prisma from "@/lib/prisma";
import { verifyAuth } from "@/lib/auth";
import { currentUser } from "@clerk/nextjs/server";
import { type Podcast, type Interview } from "@prisma/client";
import {
  PostPerformance,
  ProfileMeetup,
  ProfilePost,
  UserProfile,
} from "@/types/profile.index";

export async function getProfileData(
  paramsId?: string
): Promise<UserProfile | null> {
  try {
    const { clerkId } = await verifyAuth(
      "You must be logged in to view your profile."
    );

    if (paramsId) {
      const data = await prisma.user.findMany({
        where: {
          username: {
            equals: paramsId,
            mode: "insensitive",
          },
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

      return data[0];
    }

    const data = await prisma.user.findUnique({
      where: {
        clerkId,
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

export async function getProfilePosts(
  paramsId?: string
): Promise<ProfilePost[]> {
  try {
    verifyAuth("You must be logged in to view your profile or other profiles.");

    let userId;

    if (paramsId) {
      const data = await prisma.user.findMany({
        where: {
          username: {
            equals: paramsId,
            mode: "insensitive",
          },
        },
        select: {
          id: true,
        },
      });

      userId = data[0]?.id;
    } else {
      const userData = await currentUser();

      userId = userData?.publicMetadata.userId as number;
    }

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

export async function getProfileMeetups(
  paramsId?: string
): Promise<ProfileMeetup[]> {
  try {
    verifyAuth("You must be logged in to view your profile or other profiles.");

    let userId;

    if (paramsId) {
      const data = await prisma.user.findMany({
        where: {
          username: {
            equals: paramsId,
            mode: "insensitive",
          },
        },
        select: {
          id: true,
        },
      });

      userId = data[0]?.id;
    } else {
      const userData = await currentUser();

      userId = userData?.publicMetadata.userId as number;
    }

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
      userCanEditMedia: true,
    }));

    return extendedData;
  } catch (error) {
    console.error("Error fetching user meetups:", error);
    throw error;
  }
}

export async function getProfilePodcasts(
  paramsId?: string
): Promise<Podcast[]> {
  try {
    verifyAuth("You must be logged in to view your profile or other profiles.");

    let userId;

    if (paramsId) {
      const data = await prisma.user.findMany({
        where: {
          username: {
            equals: paramsId,
            mode: "insensitive",
          },
        },
        select: {
          id: true,
        },
      });

      userId = data[0]?.id;
    } else {
      const userData = await currentUser();

      userId = userData?.publicMetadata.userId as number;
    }

    const data = await prisma.podcast.findMany({
      where: {
        userId,
      },
      include: {
        user: {
          select: {
            username: true,
            picture: true,
            location: true,
          },
        },
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

export type ProfileInterview = Interview & {
  creator: {
    name: string;
    picture: string;
  };
};

export async function getProfileInterviews(
  paramsId?: string
): Promise<ProfileInterview[]> {
  try {
    verifyAuth("You must be logged in to view your profile or other profiles.");

    let userId;

    if (paramsId) {
      const data = await prisma.user.findMany({
        where: {
          username: {
            equals: paramsId,
            mode: "insensitive",
          },
        },
        select: {
          id: true,
        },
      });

      userId = data[0]?.id;
    } else {
      const userData = await currentUser();

      userId = userData?.publicMetadata.userId as number;
    }

    const data = await prisma.interview.findMany({
      where: {
        creatorId: userId,
      },
      include: {
        creator: {
          select: {
            username: true,
            name: true,
            picture: true,
          },
        },
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

export async function getPerformanceData(
  paramsId?: string
): Promise<PostPerformance[]> {
  try {
    verifyAuth("You must be logged in to view your profile or other profiles.");

    let userId;

    if (paramsId) {
      const data = await prisma.user.findMany({
        where: {
          username: {
            equals: paramsId,
            mode: "insensitive",
          },
        },
        select: {
          id: true,
        },
      });

      userId = data[0]?.id;
    } else {
      const userData = await currentUser();

      userId = userData?.publicMetadata.userId as number;
    }

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
