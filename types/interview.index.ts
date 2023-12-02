import { InterviewPageFilterProps } from "@/constants/interview";
import { StaticImageData } from "next/image";
import { FilterType } from ".";

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

export interface InterviewHeaderProps {
  userImage: string | StaticImageData;
  username: string;
  date: Date;
}

export interface InterviewPageProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  interviews: InterviewPageFilterProps[];
  interviewArray: number[] | undefined;
}

export interface InterviewFilterAndContentWrapperProps {
  tags: FilterType[];
  interviewsExample: InterviewPageFilterProps[];
  interviewArray: number[] | undefined;
}
