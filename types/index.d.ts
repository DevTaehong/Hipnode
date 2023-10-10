import { ChangeEvent } from 'react';

export interface ThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
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
}

export interface UseImageUploadReturn {
  file: File | null;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => Promise<void>;
}

export type InputChangeEvent<T = HTMLInputElement> = ChangeEvent<T>;
