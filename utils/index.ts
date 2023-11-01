import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/utils/supabaseClient";
import {
  ImVolumeLow,
  ImVolumeMedium,
  ImVolumeMute2,
  ImVolumeHigh,
} from "react-icons/im";

export function getFormattedDateMeetUpCard(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth();
  const monthNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
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

export function extractShowArray(queryString: string) {
  const keyValuePairs = queryString.split("&");
  const showNumbers = [];

  for (const keyValue of keyValuePairs) {
    const [key, value] = keyValue.split("=");

    if (key === "show" && !isNaN(Number(value))) {
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
