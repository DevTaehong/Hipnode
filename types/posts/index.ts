import React, { ButtonHTMLAttributes, ComponentType, ReactNode } from "react";

import { Control, UseFormReturn } from "react-hook-form";
import { Comment, Group, Post, Share, Tag, User } from "@prisma/client";

import { PostFormValuesType } from "@/constants/posts";
import { GroupPromiseProps } from "..";
import { MeetUpExtended } from "../meetups.index";
import { Suggestion } from "use-places-autocomplete";

export type CoverImageUploadProps = {
  control: Control<PostFormValuesType>;
  setImagePreviewUrl: (url: string) => void;
  setImageToUpload: (file: File) => void;
};

export interface FromFieldProps {
  control: Control<PostFormValuesType>;
  form: UseFormReturn<PostFormValuesType>;
  contentType?: string;
}

export type CreatePostTitleProps = {
  control: Control<PostFormValuesType>;
};

export interface SelectionOption {
  label: string;
  icon: {};
}

export type SelectionOptionsType = SelectionOption[];

export type SelectControllerProps = {
  control: Control<PostFormValuesType>;
  name: keyof PostFormValuesType;
  placeholder: string;
  options: SelectionOption[];
  currentSelection?: string;
};

export type CreatePostProps = {
  shows: { label: string; value: number; __isNew__?: undefined }[];
  groups: { label: string; value: number }[];
  fastestGrowingGroups: GroupPromiseProps;
  mostPopularGroups: Group[];
  newlyLaunchedGroups: Group[];
};

export interface GroupsType {
  label: string;
  value: number;
  icon?: React.ReactNode;
}

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
  postHeading?: string;
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
  postHeading?: string;
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
  comments: {
    id: number;
    authorId: number;
  }[];
  userCanEditMedia?: boolean;
  numberOfAvailablePosts?: number;
  blurImage: string;
  imageHeight: number;
  imageWidth: number;
  userProfileId?: number;
  loggedInUserHasLikedPost: boolean;
};

export type PostToEditByIdType = {
  heading: string;
  content: string;
  image: string;
  group: Group | null;
  tags: string[];
  contentType: string;
};

export type ExtendedPostById = ExtendedPrismaPost & {
  shares: Pick<Share, "id">[];
  id: Post["id"];
  loggedInUserId: number;
};

export type PostDataType = {
  heading: string;
  content: string;
  image: string;
  groupId: number;
  contentType: string;
  blurImage: string;
  imageWidth: number;
  imageHeight: number;
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

export type MeetUpDataType = {
  id?: number;
  contactEmail: string;
  contactNumber: string;
  image: string;
  contentType: string;
  location: string;
  summary: string;
  title: string;
};

export type MeetupTagType = {
  id: number;
  name: string;
};

export type FullMeetUpType = MeetUpDataType & {
  responsiblePerson: {
    name: string;
    picture: string;
  };
  tags: MeetupTagType[];
};

export type FilteredMeetupsResult = {
  meetups: MeetUpExtended[];
  page: number;
  hasMore: boolean;
};

export type InterviewDataType = {
  title: string;
  contentType: string;
  bannerImage: string;
  details: string;
  websiteLink: string;
  salary: number;
  salaryPeriod: string;
  updates: number;
};

export type InterviewTagType = {
  id: number;
  name: string;
};

export type ResponsiveCreatePostInputProps = {
  userImage?: string;
};

export type createUserType = {
  clerkId: string;
  name: string;
  username: string;
  picture: string;
  email: string;
};

export interface GetPostByIdType
  extends Omit<ExtendedPrismaPost, "numberOfAvailablePosts"> {}

export type LocationProps = {
  setValueHookForm: (name: "location", value: string) => void;
};

export type SuggestionsListProps = {
  suggestions: Suggestion[];
  onSuggestionSelect: (suggestion: Suggestion) => () => void;
};
