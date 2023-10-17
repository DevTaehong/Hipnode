import { Group } from "@prisma/client";
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
