import { v4 as uuidv4 } from "uuid";
import {
  ImVolumeLow,
  ImVolumeMedium,
  ImVolumeMute2,
  ImVolumeHigh,
} from "react-icons/im";

import { supabase } from "@/utils/supabaseClient";
import { monthNames } from "@/constants";
import { CommentProps } from "@/types/posts";

export function getFormattedDateMeetUpCard(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth();
  const monthText = monthNames[month];

  return {
    day,
    monthText,
  };
}

export const uploadImageToSupabase = async (
  file: File | null,
  bucketName: string,
  folderName?: string
): Promise<string | null> => {
  if (!file) {
    console.error("No file provided");
    return null;
  }

  try {
    const fileExtension = file.name.split(".").pop();
    const prefix = folderName && folderName.trim() ? `${folderName}/` : "";
    const uniqueFileName = `${prefix}image_${uuidv4()}.${fileExtension}`;

    const { error } = await supabase.storage
      .from(bucketName)
      .upload(uniqueFileName, file, { contentType: file.type });

    if (error) {
      console.error("File upload error:", error.message);
      return null;
    } else {
      console.log("File uploaded successfully:", uniqueFileName);
      const projectUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}`;
      return `${projectUrl}/storage/v1/object/public/${bucketName}/${uniqueFileName}`;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Unexpected error:", error.message);
    }
    return null;
  }
};

export async function getBucketUrls(bucketName: string): Promise<string[]> {
  try {
    const { data: bucketContents, error } = await supabase.storage
      .from(bucketName)
      .list();

    if (error) throw error;

    const urls = bucketContents.map((file) => {
      const url = supabase.storage.from(bucketName).getPublicUrl(file.name)
        .data.publicUrl;
      return url;
    });

    return urls;
  } catch (error) {
    console.error("Error in getBucketUrls:", error);
    return [];
  }
}

export const formatDate = (date: Date) => {
  const updatedDate = new Date(date);
  const monthText = updatedDate
    .toLocaleString("en-US", { month: "short" })
    .toUpperCase();
  const day = updatedDate.getDate();

  return { monthText, day };
};

export const formatDateShort = (dateString: Date) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const formatDatePostFormat = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("en-US", options);
};

export function extractArray(queryString: string, urlFilter: string) {
  const keyValuePairs = queryString.split("&");
  const showNumbers = [];

  for (const keyValue of keyValuePairs) {
    const [key, value] = keyValue.split("=");

    if (key === urlFilter && !isNaN(Number(value))) {
      showNumbers.push(Number(value));
    }
  }

  return showNumbers;
}

export function formatPodcastDuration(seconds: number) {
  const roundedSeconds = Math.round(seconds);
  const minutes = Math.floor(roundedSeconds / 60);
  const remainingSeconds = roundedSeconds % 60;

  const formattedMinutes = minutes.toString();
  const formattedSeconds =
    remainingSeconds < 10
      ? `0${remainingSeconds}`
      : remainingSeconds.toString();

  return `${formattedMinutes}:${formattedSeconds}`;
}

export const setToLocalStorage = (key: string, value: any) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (e) {
    console.error("Failed to set item in local storage:", e);
  }
};

export const getFromLocalStorage = (key: string) => {
  try {
    const serializedValue = localStorage.getItem(key);
    return serializedValue ? JSON.parse(serializedValue) : null;
  } catch (e) {
    console.error("Failed to get item from local storage:", e);
    return null;
  }
};

export const getVolumeIcon = (volumeValues: number[]) => {
  const volumeValue = volumeValues[0];
  if (volumeValue === 0) {
    return ImVolumeMute2;
  } else if (volumeValue <= 33) {
    return ImVolumeLow;
  } else if (volumeValue <= 66) {
    return ImVolumeMedium;
  } else {
    return ImVolumeHigh;
  }
};

export function formatPostDate(createdAt: Date) {
  const date = new Date(createdAt).toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return date;
}

export function formatInterviewDate(inputDate: Date): string {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const inputDay = inputDate.getDate();
  const inputMonth = inputDate.getMonth();
  const inputYear = inputDate.getFullYear();

  if (
    inputDay === today.getDate() &&
    inputMonth === today.getMonth() &&
    inputYear === today.getFullYear()
  ) {
    return `Today, ${inputDay} ${monthNames[inputMonth]}`;
  } else if (
    inputDay === tomorrow.getDate() &&
    inputMonth === tomorrow.getMonth() &&
    inputYear === tomorrow.getFullYear()
  ) {
    return `Tomorrow, ${inputDay} ${monthNames[inputMonth]}`;
  } else {
    return `${inputDay} ${monthNames[inputMonth]}`;
  }
}

export function formatSalary(amount: number, salaryPeriod: string): string {
  const formattedSalary =
    amount >= 1000 ? `${(amount / 1000).toFixed(0)}k` : amount.toString();
  const periodSuffix = salaryPeriod === "month" ? "/mo" : "/year";
  return formattedSalary + periodSuffix;
}

export function capitalise(str: string) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const groupCommentsByParentId = (
  comments: CommentProps[]
): Record<string, CommentProps[]> => {
  const group: Record<string, CommentProps[]> = {};
  comments.forEach((comment) => {
    const key =
      comment?.parentId === null ? "null" : comment?.parentId?.toString();
    if (!group[key]) {
      group[key] = [];
    }
    group[key].push(comment);
  });
  return group;
};

export const getRepliesToComments = (
  commentsByParentId: Record<string, CommentProps[]>,
  parentId?: string | null
) => {
  return commentsByParentId[parentId ?? "null"];
};
