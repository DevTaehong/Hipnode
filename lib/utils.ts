import { type ClassValue, clsx } from "clsx";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface IconProps {
  children: ReactNode;
  className?: string;
}

export function formatUserJoinedDate(date: Date) {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return "User Joined Date is not found";
  }

  const currentDate = new Date();
  const seconds = Math.floor((currentDate.getTime() - date.getTime()) / 1000);

  const intervals = [
    { seconds: 31536000, label: "year" },
    { seconds: 2592000, label: "month" },
    { seconds: 86400, label: "day" },
    { seconds: 3600, label: "hour" },
    { seconds: 60, label: "minute" },
    { seconds: 1, label: "second" },
  ];

  for (let i = 0; i < intervals.length; i++) {
    const interval = intervals[i];
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }
}
