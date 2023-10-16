"use server";

import { type MeetUp } from "@prisma/client";
import prisma from "@/lib/prisma";

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
