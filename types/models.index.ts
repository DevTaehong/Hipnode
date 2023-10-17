interface Onboarding {
  id: number;
  userId: number;
  businessStage: string;
  codeAbility: string;
  interests: string[];
  isOnboarded: boolean;
}

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
