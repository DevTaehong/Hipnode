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

export async function getPodcastsWithUserInfo() {
  try {
    const podcasts = await prisma.podcast.findMany({
      select: {
        id: true,
        title: true,
        details: true,
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
    console.error("Error fetching all podcasts:", error);
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
