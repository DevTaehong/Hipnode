<<<<<<< HEAD
import { ChangeEvent } from 'react';
=======
import React from "react";
import { onboardingQuestions } from "@/constants";
>>>>>>> main

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
export interface User {
  id: number;
  clerkId: string;
  name: string;
  username: string | null;
  email: string;
  password?: string | null;
  bio?: string | null;
  picture: string;
  location?: string | null;
  joinedAt: Date;
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
}
