import { z } from "zod";
import React, { ButtonHTMLAttributes, ComponentType, ReactNode } from "react";

import { postFormValidationSchema } from "@/lib/validations";
import { Control, UseFormReturn } from "react-hook-form";
import { Comment, Post, Tag, User } from "@prisma/client";
import { SocialCountTuple } from "../homepage";

export type PostFormValuesType = z.infer<typeof postFormValidationSchema>;

export type CoverImageUploadProps = {
  control: Control<PostFormValuesType>;
  setImagePreviewUrl: (url: string) => void;
  setImageToUpload: (file: File) => void;
};

export interface FromFieldProps {
  control: Control<PostFormValuesType>;
  form: UseFormReturn<PostFormValuesType>;
}

export type CreatePostTitleProps = {
  control: Control<PostFormValuesType>;
};

interface PostSelectionOptions {
  option: string;
  icon: React.ReactNode;
}

export interface GroupsType {
  label: string;
  value: number;
}

export type SelectControllerProps = {
  control: Control<PostFormValuesType>;
  name: keyof PostFormValuesType;
  placeholder: string;
  options: GroupsType[] | PostSelectionOptions[];
};

export type PostPreviewProps = {
  htmlString: string;
  onSubmitPreview: () => void;
};

export type IconBlockProps = {
  label: string;
  count?: number;
  IconComponent: React.ElementType;
};

export type PostIconsProps = {
  children: ReactNode;
};

export type MoreInformationItemProps = {
  item: { title: string; tags: string };
};

export type ColumnWrapperType = {
  children: React.ReactNode;
};

export type PostImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type TagsListProps = {
  tags: string[];
};

export type CommentIconButtonProps = {
  Icon: ComponentType;
  isActive?: boolean;
  color?: string;
  children?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type DevInfoItem = {
  title: string;
  tags: string;
};

export type DevelopmentInfoProps = {
  devInfo: DevInfoItem[];
};

export interface CommentFormProps {
  id?: string;
  className?: string;
  placeholder?: string;
  parentId?: string;
  value?: string;
  isEditing?: boolean;
  isReplying?: boolean;
  commentId?: string;
  setIsEditing: (isEditing: boolean) => void;
  setIsReplying: (isReplying: boolean) => void;
  content?: string;
  postId: number;
}

export interface CommentActionsProps {
  onReplyClick: () => void;
  onDeleteClick: () => void;
  onEditClick: () => void;
  onShowChildrenClick: () => void;
  isReplying: boolean;
}

export interface CommentHeaderProps {
  username: string;
  createdAt: Date;
  isEdited: boolean;
}

// TYPES FOR post.action

export interface AuthorProps {
  id?: number;
  picture: string;
  username: string;
}

export interface CommentAuthorProps extends Comment {
  author: AuthorProps;
}

export interface CommentListProps {
  comments: CommentAuthorProps[];
}

export interface RenderRootCommentsProps {
  comments: CommentAuthorProps[];
  postId: number;
}

export interface ExtendedComment extends CommentAuthorProps {
  parent?: Comment | null;
  path?: string;
}

export type ExtendedPrismaPost = {
  id: Post["id"];
  image: Post["image"];
  content: Post["content"];
  viewCount: Post["viewCount"];
  author: Pick<User, "username" | "picture">;
  likesCount: number;
  commentsCount: number;
  tags: Tag["name"][];
  createdAt: Post["createdAt"];
  heading: Post["heading"];
};

export type ExtendedPostById = ExtendedPrismaPost & {
  // shares: Pick<Share, "id">[];
};

export type createPostFormType = {
  heading: string;
  content: string;
  image?: string;
  group: string;
  contentType: string;
  tags: string[];
};

export type PostDataType = {
  heading: string;
  content: string;
  image: string;
  authorId: number;
  groupId: number;
};

export type CardFooterDesktopProps = {
  authorPicture: string;
  username: string;
  createdAt: Date;
  socialCounts: SocialCountTuple[];
};
