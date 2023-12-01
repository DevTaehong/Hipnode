import { v4 as uuidv4 } from "uuid";
import {
  ImVolumeLow,
  ImVolumeMedium,
  ImVolumeMute2,
  ImVolumeHigh,
} from "react-icons/im";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import { supabase } from "@/utils/supabaseClient";
import { homePageTags, monthNames, abbMonthNames } from "@/constants";
import { GetActionBarDataProps } from "@/types/posts";
import { TagIconConfig } from "@/types/homepage";

export function formatGroupDetailPostDate(createdAt: Date) {
  return formatDistanceToNow(createdAt, { addSuffix: true });
}

export function getFormattedDateMeetUpCard(dateString: Date) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth();
  const monthText = abbMonthNames[month];

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
  comments: Comment[]
): Record<string, Comment[]> => {
  const group: Record<string, Comment[]> = {};
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
  commentsByParentId: Record<string, Comment[]>,
  parentId?: string | null
) => {
  return commentsByParentId[parentId ?? "null"];
};

export const howManyMonthsAgo = (dateStr: Date | null) => {
  if (dateStr === null) {
    return "Date not available";
  }

  const dateGiven = new Date(dateStr);
  const currentDate = new Date();

  const yearDiff = currentDate.getFullYear() - dateGiven.getFullYear();
  const monthDiff = currentDate.getMonth() - dateGiven.getMonth();

  const totalMonths = yearDiff * 12 + monthDiff;

  return totalMonths;
};

export const userHasLikedComment = (
  currentUserId: number,
  comments: { id: number; authorId: number }[]
): boolean => {
  return comments.some((comment) => comment.authorId === currentUserId);
};

export async function uploadLivechatAttachment(files) {
  const bucket = "livechat"; // Static bucket name
  const folder = "attachments"; // Static folder name
  const file = files[0]; // Assuming single file upload, adjust as needed
  const filePath = `${folder}/${Date.now()}_${file.name}`;

  const { error, data } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (error) {
    throw error;
  }
  const publicURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/livechat/${data.path}`;

  return {
    ...data,
    publicURL, // Return the public URL along with other data
  };
}

export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const getActionBarData = (postData: GetActionBarDataProps) => {
  const actionBarData = {
    likesCount: postData.likesCount,
    commentsCount: postData.commentsCount,
    sharesCount: postData.sharesCount,
  };
  return actionBarData;
};

export const getIconConfig = (tagName: string): TagIconConfig => {
  const hash = tagName
    .split("")
    .reduce(
      (acc: number, char: string) => char.charCodeAt(0) + ((acc << 5) - acc),
      0
    );
  const index = Math.abs(hash) % homePageTags.length;
  return homePageTags[index];
};

export const getMediaType = (file: File | File[]) => {
  const fileType = Array.isArray(file) ? file[0].type : file.type;

  switch (true) {
    case fileType.startsWith("image"):
      return "image";
    case fileType.startsWith("video"):
      return "video";
    case fileType.startsWith("audio"):
      return "audio";
    case fileType.includes("application") || fileType.includes("text"):
      return "document";
    default:
      return "unknown";
  }
};
