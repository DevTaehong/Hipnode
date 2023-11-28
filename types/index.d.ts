/* eslint-disable no-unused-vars */
import React, { ChangeEvent, FC } from "react";
import { StaticImageData } from "next/image";
import { Post, User } from "@prisma/client";
import { Control, FieldValues } from "react-hook-form";
import { TagSuggestion } from "react-tag-autocomplete";

import { onboardingQuestions } from "@/constants";
import { colorVariants } from "@/components/GroupSectionHeader";
import { GroupProps } from "@types/models";

export type UserSuggestion = {
  user: User;
};

export type CustomTagSuggestion = TagSuggestion & UserSuggestion;

export type Tag = {
  label: string;
  value: string | number | symbol | null;
  user?: User;
};

type FieldName = "groupName" | "description";

export interface FormFieldComponentProps {
  control: Control<{
    groupName: string;
    description: string;
  }>;
  name: FieldName;
  label: string;
  placeholder: string;
  fieldType?: "input" | "textarea";
}

export type FetchGroupDetailPostsProps = {
  initialNewPost: Post[];
  initialPopularPost: Post[];
  fetchNewPost: (myCursorId?: number, groupId?: number) => Promise<Post[]>;
  fetchPopularPost: (myCursorId?: number, groupId?: number) => Promise<Post[]>;
  groupId: number;
};

type GroupPromiseProps = {
  id: number;
  createdAt?: Date;
  description: string | null;
  name: string;
  updatedAt?: Date;
  createdBy?: number;
  coverImage?: string | null;
  logo: string | null;
}[];

export type GroupSectionProps = {
  fastestGrowingGroupsPromise: Promise<GroupPromiseProps>;
  mostPopularGroupsPromise: Promise<GroupPromiseProps>;
  newlyLaunchedGroupsPromise: Promise<GroupPromiseProps>;
};

export type ColorVariantsType = {
  [key: string]: string;
  bgYellow: string;
  bgRed: string;
  bgBlue: string;
};

export type ColorVariantKeys = keyof typeof colorVariants;

export interface GroupSectionHeaderProps {
  title: string;
  bgColor: ColorVariantKeys;
  icon: FC;
  groups?: GroupProps;
}

export type GroupData = {
  [key in "fastest-growing" | "Most Popular" | "Newly Launched"]: {
    header: { color: string; icon: FC; title: string };
    groups: {
      icon: StaticImageData;
      groupDescription: string;
      groupName: string;
    }[];
  };
};

export interface ThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
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

export interface ClerkUser extends User {
  username: string | null;
}

export interface CustomButtonProps {
  label: string | React.ReactNode;
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
}

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
  shouldOnboard: boolean;
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

export type HeadingsType = {
  title: string;
  icon: FC;
  bgColor: string;
  groups: GroupProps;
};

export interface ChatMessageProps {
  user: string;
  message: string;
}

export const chatMessages = [
  {
    user: "you",
    message:
      "Greetings, fellow carbon-based life form! How art thou in the realm of 1s and 0s?",
  },
  {
    user: "other",
    message:
      "Salutations, my silicon-chip comrade! I'm currently doing the binary tango, how about you?",
  },
  {
    user: "you",
    message:
      "Ah, the binary tango, a classic dance of 10 steps forward and 1 step back. I'm waltzing along too, albeit with a few buffer overflows!",
  },
  {
    user: "other",
    message:
      "Buffer overflows, the dance move that keeps on giving! Let's hope we don't trip over any null pointers in this digital ballroom.",
  },
  {
    user: "you",
    message:
      "Absolutely! Null pointers are the banana peels of our digital dance floor. So, what's your next move in this grand algorithmic dance?",
  },
  {
    user: "other",
    message:
      "I'm thinking of attempting the 'Funky Function Flip.' It's got a 50% chance of impressing the virtual audience or crashing the virtual chandelier. High stakes, you know!",
  },
  {
    user: "you",
    message:
      "A daring choice! Break a virtual leg, my friend. I'll be here, debugging and providing virtual applause. Until our next debugging disco, cheerio Christopher!",
  },
  {
    user: "other",
    message: "Cheerio Christopher!",
  },
];

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
  type: "comment" | "reaction" | "mention";
  comment?: string;
  read: boolean;
  title: string;
  date: string;
  image: string;
}

export interface ProfileInfoProps {
  src: string;
  name: string;
  title: string;
  followers: number;
  points: string;
  following: { id: string; name: string; src: string; link: string }[];
  description: string;
  website?: string;
  socials: { name: string; link: string }[];
  joinedAt: string;
}

export interface ProfileLinkProps {
  id: string;
  name: string;
  src: string;
  link: string;
}

export interface SocialIconsProps {
  socials: { name: string; link: string }[];
}

export interface UserButtonProps {
  userImg: string | undefined;
}
export interface PerformanceProps {
  data: {
    contentImg: string;
    views: number;
    likes: number;
    comments: number;
  }[];
}

export interface PerformanceCardProps {
  contentImg: string;
  views: number;
  likes: number;
  comments: number;
}

export interface ContentCardProps {
  contentImg: string;
  userImg: string;
  description: string;
  tags: string[];
  views: number;
  likes: number;
  comments: number;
  isHeart: boolean;
  name: string;
  createdAt: string;
}

export interface StatsDescriptionProps {
  children: React.ReactNode;
  className?: string;
}
