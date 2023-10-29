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
