import React, { FC } from "react";
import { StaticImageData } from "next/image";
import { User } from "@prisma/client";

import { onboardingQuestions } from "@/constants";

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
