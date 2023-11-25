import { Group, MeetUp, Podcast } from "@prisma/client";
import { StaticImageData } from "next/image";
import { ReactNode } from "react";
import { ExtendedPost } from "../posts";
import { tags } from "@/constants";

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

export type CreatePostInputProps = {
  userImage: string;
};

export type PostCardProps = {
  post: ExtendedPost;
};

export type SocialCountTuple = [string, number];

export type SocialStatisticsProps = {
  socialCounts: SocialCountTuple[];
};

export type PostLabelProps = {
  tags: string[];
};

export interface PostImageProps {
  postImage: string;
}

export type PostCardTextProps = {
  postContent: string;
};

export type SocialMediaIconProps = {
  authorPicture: string;
};

export interface ImageWithCaptionProps {
  imageSrc: string;
  imageTitle?: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  className?: string;
  caption?: string;
}

export type TagProps = {
  tag: (typeof tags)[0];
};

export type MeetupItemProps = {
  meet: MeetUp;
};

export type MeetupsProps = {
  meetUps: MeetUp[];
};

export type PillItemProps = {
  pill: string;
};

type PodcastWithUser = Podcast & {
  user: {
    username: string;
  };
};

export type PodcastsProps = {
  podcasts: PodcastWithUser[];
};

export type PodcastItemProps = {
  podcast: PodcastWithUser;
};

export type PostCardListProps = {
  posts: ExtendedPost[];
};
