import { z } from "zod";
import React, { ButtonHTMLAttributes, ComponentType, ReactNode } from "react";

import { postFormValidationSchema } from "@/lib/validations";
import { Control, UseFormReturn } from "react-hook-form";
import { Comment, Post, Tag, User } from "@prisma/client";

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
  label: string;
  icon: React.JSX.Element;
}

export interface GroupsType {
  label: string;
  value: number;
  icon?: React.ReactNode;
}

export type SelectControllerProps = {
  control: Control<PostFormValuesType>;
  name: keyof PostFormValuesType;
  placeholder: string;
  options: GroupsType[] | PostSelectionOptions[];
  currentSelection?: string;
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
  heading: string;
  tags: string[];
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
  setIsEditing?: (isEditing: boolean) => void;
  setIsReplying?: (isReplying: boolean) => void;
  content?: string;
  postId: number;
}

export interface CommentActionsProps {
  onReplyClick: () => void;
  onDeleteClick: () => void;
  onEditClick: () => void;
  onShowChildrenClick: () => void;
  onToggleLike: () => void;
  isLiked: boolean;
  isReplying: boolean;
  canReply: boolean;
  hasChildComments: boolean;
  showChildren: boolean;
  userId?: number;
  authorId?: number;
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
  author?: AuthorProps;
  likedByCurrentUser: boolean;
  userId?: number;
  depth: number;
  isLastComment: boolean;
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

export interface AddCommentOrReply
  extends Omit<
    ExtendedComment,
    "likedByCurrentUser" | "depth" | "isLastComment"
  > {}

export type UpdateCommentType = Omit<
  ExtendedComment,
  "likedByCurrentUser" | "depth" | "isLastComment"
>;

export type ExtendedPrismaPost = {
  id: Post["id"];
  image: Post["image"];
  content: Post["content"];
  viewCount: Post["viewCount"];
  author: Pick<User, "username" | "picture" | "id">;
  likesCount: number;
  commentsCount: number;
  tags: Tag["name"][];
  createdAt: Post["createdAt"];
  heading: Post["heading"];
  likes: { userId: number }[];
  clerkId: Post["clerkId"];
  comments: Comment[];
};

export type ExtendedPostById = ExtendedPrismaPost & {
  // shares: Pick<Share, "id">[];
  id: Post["id"];
  loggedInUserId: number;
};

export type createPostFormType = {
  heading: string;
  content: string;
  image?: string;
  group: string;
  contentType: string;
  tags: string[];
  postId?: number;
};

export type PostDataType = {
  heading: string;
  content: string;
  image: string;
  authorId: number;
  groupId: number;
  clerkId: string;
};

export type LeftActionBarProps = {
  actionBarData: {
    likesCount: number;
    commentsCount: number;
    sharesCount?: number;
  };
};

export type GetActionBarDataProps = {
  likesCount: number;
  commentsCount: number;
  sharesCount?: number;
};

interface CommentAuthor {
  username: string;
  picture: string;
}

interface CommentLike {
  userId: number;
}

export interface DetailedComment {
  id: number;
  content: string;
  authorId: number;
  postId: number;
  parentId: number | null;
  createdAt: Date;
  updatedAt: Date;
  isEdited: boolean;
  likes: CommentLike[];
  author: CommentAuthor;
  likedByCurrentUser: boolean;
  userId: number;
}

export type CommentsGroupedByParentId = Record<string, CommentAuthorProps[]>;

export type ResponsiveCreatePostInputProps = {
  userImage: string;
};
