"use server";

import { type Shows } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function getAllShows() {
  try {
    const shows = await prisma.shows.findMany();

    return shows;
  } catch (error) {
    console.error("Error fetching all shows:", error);
    throw error;
  }
}
