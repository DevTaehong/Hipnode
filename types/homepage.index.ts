import { Group } from "@prisma/client";
import { StaticImageData } from "next/image";
import { ReactNode } from "react";

export interface MeetupImageInterface {
  imageSrc: string;
  meetTitle: string;
  meetLocation: string;
}

export interface PinnedGroupItemProps {
  group: Group;
}

export type RightSidebarHeaderProps = {
  heading: string;
};

export type RightSidebarWrapperProps = {
  children: ReactNode;
};

export interface SidebarSectionProps {
  imgSrc: StaticImageData;
  imgAlt: string;
  imgContainerClass: string;
  title: string;
  subTitle?: string;
  description: string;
  notification?: number;
}
