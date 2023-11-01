import { StaticImageData } from "next/image";

export type InterviewBannerImageType = {
  bannerImage: string | StaticImageData;
  className: string;
  height: number;
  width: number;
  roundedTop?: boolean;
};

export type InterviewCardButtonsType = {
  interviewSalary: string;
  updates: number;
  websiteLink: string;
};
