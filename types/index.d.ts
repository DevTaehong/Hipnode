import React, { ChangeEvent, FC } from "react";
import { StaticImageData } from "next/image";

import { onboardingQuestions } from "@/constants";
import { StringColorFormat } from "@faker-js/faker";

export interface ThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
}

interface Onboarding {
  id: number;
  userId: number;
  businessStage: string;
  codeAbility: string;
  interests: string[];
  isOnboarded: boolean;
}
export type AnswersType = string | string[];

export type UserAnswersType = {
  answerQuestion1?: string;
  answerQuestion2?: string;
  answersQuestion3?: string[];
};

export type QuestionKeysMapType = {
  [key: number]: string;
};

export type PostItem = {
  title: string;
  icon: React.FC<{ className?: string; children? }>;
  iconBgColor: string;
  iconFillColor: string;
};
export interface User {
  id: number;
  clerkId: string;
  name: string;
  username: string;
  email: string;
  password?: string | null;
  bio?: string | null;
  picture: string;
  location?: string | null;
  joinedAt: Date;
  onboarding: Onboarding;
}

export interface ClerkUser extends User {
  username: string | null;
}

interface BaseTag {
  id: number;
  name: string;
}

interface BasePost {
  id: number;
  content: string;
  authorId: number;
  author: User;
  createdAt: Date;
  updatedAt: Date;
  isEdited: boolean;
  viewCount: number;
}

export interface TagOnPost {
  id: number;
  postId: number;
  post: BasePost;
  tagId: number;
  tag: BaseTag;
}

export interface Tag extends BaseTag {
  posts: TagOnPost[];
}

interface BaseComment {
  id: number;
  content: string;
  authorId: number;
  author: User;
  createdAt: Date;
  updatedAt: Date;
  isEdited: boolean;
}

interface BaseLike {
  id: number;
  userId: number;
  user: User;
  liked: boolean;
}
interface Like extends BaseLike {
  postId?: number;
  post?: BasePost;
  commentId?: number;
  comment?: BaseComment;
}

interface Comment extends BaseComment {
  postId?: number;
  post?: BasePost;
  parentId?: number;
  parent?: BaseComment;
  replies: BaseComment[];
  likes: BaseLike[];
}

export interface Post extends BasePost {
  likes: Like[];
  tags: TagOnPost[];
  comments: Comment[];
}

export type MeetUp = {
  id: number;
  createdAt: string;
  contactEmail: string;
  contactNumber: string;
  image: string;
  location: string;
  responsiblePersonId: number;
  summary: string;
  title: string;
  updatedAt: string;
};

export type Group = {
  id: number;
  createdAt: string;
  details: string;
  groupName: string;
  updatedAt: string;
};

export type Episode = {
  id: number;
  createdAt: string;
  details: string;
  episodeNumber: number;
  image: string;
  showId: number;
  title: string;
  updatedAt: string;
  url: string;
  userId: number;
};
export interface CustomButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: React.FC;
}

export interface ActiveButtonsProps {
  currentPath: string;
}

export interface ActionButtonProps {
  label: string;
  href: string;
  currentPath?: string;
}

export interface ImageUploadProps {
  bucketName: string;
  folderName?: string;
}

export interface UseImageUploadReturn {
  file: File | null;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => Promise<void>;
}

export type InputChangeEvent<T = HTMLInputElement> = ChangeEvent<T>;
export type ColorVariantsOnboardingType = {
  [key: string]: string;
  fillRed: string;
  fillBlue: string;
  fillYellow: string;
  fillGreen: string;
  bgRed: string;
  bgBlue: string;
  bgYellow: string;
  bgGreen: string;
};

export interface QuestionnaireProps {
  userClerkId: string;
}

export interface QuestionnaireFormProps {
  questions: (typeof onboardingQuestions)[number];
  animateClass: string;
  classVariants: {
    parentDivFlex: string;
    childDivWidth: string;
    buttonWidth: string;
    buttonText: string;
  };
  handleQuestionClick: (question: AnswersType) => void;
  handleNextClick: () => void;
  selectedAnswers: AnswersType[];
  questionSet: number;
}

export interface OnboardingSideScreenProps {
  info?: {
    title: string;
    posts: PostItem[];
  };
}

export interface IconProps {
  children: React.ReactNode;
  className?: string;
}

export type GroupSectionGroupType = {
  icon: StaticImageData;
  groupDescription: string;
  groupName: string;
};

export type HeadingsType = {
  title: string;
  bgColor: string;
  icon: FC;
  groups: GroupSectionGroupType[];
};

export interface MeetUpProp {
  id: number;
}

export interface UpdateMeetUpProps {
  id: number;
  content: {
    title?: string;
    summary?: string;
    location?: string;
    contactEmail?: string;
    contactNumber?: string;
    image?: string;
  };
}

export interface SocialIconProps extends IconProps {
  className?: string;
}

export interface NotificationTab {
  title: string;
  icon?: React.ElementType;
  active: boolean;
}

export interface NotificationPopoverProps {
  name: string;
  type: string;
  comment?: string;
  read: boolean;
  title: string;
  date: string;
  image: string;
}
