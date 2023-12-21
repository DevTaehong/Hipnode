"use server";

import prisma from "@/lib/prisma";
import { verifyAuth } from "@/lib/auth";
import { currentUser } from "@clerk/nextjs/server";
import {
  type User,
  type Post,
  type MeetUp,
  type Podcast,
  type Interview,
} from "@prisma/client";

type UserProfile = User & {
  following: {
    followed: {
      username: string;
      picture: string;
    };
  }[];
  _count: {
    followers: number;
    following: number;
  };
};

export async function getProfileData(): Promise<UserProfile | null> {
  try {
    const { clerkId } = await verifyAuth(
      "You must be logged in to view your profile."
    );

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
    console.error("Error fetching user by clerkId:", error);
    throw error;
  }
}

type ProfilePost = Post & {
  tags: string[];
  _count: {
    likes: number;
    comments: number;
  };
};

export async function getProfilePosts(): Promise<ProfilePost[]> {
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

type ProfileMeetup = MeetUp & {
  tags: {
    id: number;
    name: string;
  }[];
};

export async function getProfileMeetups(): Promise<ProfileMeetup[]> {
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

export async function getProfilePodcasts(): Promise<Podcast[]> {
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

export async function getProfileInterviews(): Promise<Interview[]> {
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

type PostPerformance = {
  id: number;
  image: string;
  viewCount: number;
  _count: {
    likes: number;
    comments: number;
  };
};

export async function getPerformanceData(): Promise<PostPerformance[]> {
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
