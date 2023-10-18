"use server";

import { type Podcast } from "@prisma/client";
import prisma from "@/lib/prisma";

type CreatePodcastType = {
  details: string;
  image: string;
  showId: number;
  title: string;
  url: string;
  userId: number;
};

export async function getPodcastById(podcastId: number) {
  try {
    const podcast = await prisma.podcast.findUnique({
      where: {
        id: podcastId,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
        show: {
          select: {
            name: true,
          },
        },
      },
    });

    return podcast;
  } catch (error) {
    console.error("Error fetching podcast by ID:", error);
    throw error;
  }
}

export async function getAllPodcasts() {
  try {
    const podcasts = await prisma.podcast.findMany();

    return podcasts;
  } catch (error) {
    console.error("Error fetching all podcasts:", error);
    throw error;
  }
}

interface QueryOptions {
  take?: number; // Optional
  include: {
    user: {
      select: {
        name: boolean;
        location: boolean;
        picture: boolean;
      };
    };
  };
}

interface PodcastUserInfo extends Podcast {
  user: {
    name: string;
    location: string | null;
    picture: string;
  };
}

export async function getPodcastsWithUserInfo(
  amount: number
): Promise<PodcastUserInfo[]> {
  try {
    const queryOptions: QueryOptions = {
      take: amount,
      include: {
        user: {
          select: {
            name: true,
            location: true,
            picture: true,
          },
        },
      },
    };

    const podcasts = await prisma.podcast.findMany(queryOptions);

    return podcasts as PodcastUserInfo[];
  } catch (error) {
    console.error("Error fetching all podcasts:", error);
    throw error;
  }
}

export async function getFilterPodcastsUserInfo({ show }: { show: number[] }) {
  try {
    const podcasts = await prisma.podcast.findMany({
      where: {
        showId: {
          in: show,
        },
      },
      include: {
        user: {
          select: {
            name: true,
            location: true,
            picture: true,
          },
        },
      },
    });

    return podcasts;
  } catch (error) {
    console.error("Error fetching filtered podcasts:", error);
    throw error;
  }
}

export async function createPodcast(data: CreatePodcastType) {
  try {
    const podcast = await prisma.podcast.create({
      data,
    });

    return podcast;
  } catch (error) {
    console.error("Error creating podcast:", error);
    throw error;
  }
}

export async function updatePodcast(id: number, data: Partial<Podcast>) {
  try {
    const podcast = await prisma.podcast.update({
      where: {
        id,
      },
      data,
    });

    return podcast;
  } catch (error) {
    console.error("Error updating podcast:", error);
    throw error;
  }
}

export async function deletePodcast(id: number) {
  try {
    const deletedPodcast = await prisma.podcast.delete({
      where: {
        id,
      },
    });

    return deletedPodcast;
  } catch (error) {
    console.error("Error deleting podcast:", error);
    throw error;
  }
}
