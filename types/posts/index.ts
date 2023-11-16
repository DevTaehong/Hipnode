import { z } from "zod";
import React, { ButtonHTMLAttributes, ComponentType, ReactNode } from "react";

import { postFormValidationSchema } from "@/lib/validations";
import { Control, UseFormReturn } from "react-hook-form";
import { ExtendedPost } from "@/types/models";

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

export type SelectControllerProps = {
  control: Control<PostFormValuesType>;
  name: keyof PostFormValuesType;
  placeholder: string;
  options: string[];
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

export interface AuthorProps {
  picture: string;
  username: string;
}

export interface CommentProps {
  id: number;
  content: string;
  authorId: number;
  postId: number;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
  isEdited: boolean;
  author: AuthorProps;
}

export interface CommentAuthorProps {
  id: number;
  content: string;
  authorId: number;
  postId: number;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
  isEdited: boolean;
  author: {
    id?: number;
    picture: string;
    username: string;
  };
}

export interface CommentListProps {
  comments: CommentAuthorProps[];
}

export interface PostContextType {
  currentPost: ExtendedPost | null;
  setCurrentPost: React.Dispatch<React.SetStateAction<ExtendedPost | null>>;

  comments: CommentProps[];
  setComments: React.Dispatch<React.SetStateAction<CommentProps[]>>;

  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;

  isReplying: boolean;
  setIsReplying: React.Dispatch<React.SetStateAction<boolean>>;

  currentUser: {
    id?: number;
    picture: string;
    username: string;
  } | null;

  commentsByParentId: {
    [key: string]: CommentProps[];
  };
  getRepliesToComments: (parentId: string) => CommentProps[] | undefined;
  rootComments: CommentProps[];
}

export interface PostProviderProps {
  children: ReactNode;
}

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
  commentId?: string;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setIsReplying: React.Dispatch<React.SetStateAction<boolean>>;
  content?: string;
}

export interface AuthorAvatarProps {
  picture: string;
}

export interface CommentActionsProps {
  onReplyClick: () => void;
  onDeleteClick: () => void;
  onEditClick: () => void;
  onShowChildrenClick: () => void;
}

export interface CommentHeaderProps {
  username: string;
  createdAt: Date;
  isEdited: boolean;
}

export interface CommentDataHandlerProps {
  postId: number;
  comments: CommentProps[];
}

export interface PostCommentLogicProps {
  comments: CommentAuthorProps[];
  postId: number;
}
