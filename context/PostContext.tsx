"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  useMemo,
} from "react";
import { useAuth } from "@clerk/nextjs";

import { useParams } from "next/navigation";
import { getPostById } from "@/lib/actions/post.action";
import { ExtendedPost, User } from "@/types/models";
import { getUserByClerkId } from "@/lib/actions/user.actions";
interface Comment {
  id: number;
  content: string;
  authorId: number;
  postId: number;
  parentId: number | null;
  createdAt: Date;
  updatedAt: Date;
  isEdited: boolean;
}
interface PostContextType {
  currentPost: ExtendedPost | null;
  setCurrentPost: React.Dispatch<React.SetStateAction<ExtendedPost | null>>;
  currentUser: User | null;
  commentsByParentId: {
    [key: string]: Comment[];
  };
  getRepliesToComments: (parentId: string) => Comment[] | undefined;
  rootComments: Comment[];
}

const PostContext = createContext<PostContextType | null>(null);

interface PostProviderProps {
  children: ReactNode;
}

export const PostProvider = ({ children }: PostProviderProps) => {
  const [currentPost, setCurrentPost] = useState<ExtendedPost | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const { id } = useParams();
  const { isLoaded, userId } = useAuth();

  const commentsByParentId = useMemo(() => {
    const group: Record<string, Comment[]> = {};
    comments.forEach((comment) => {
      const key =
        comment.parentId === null ? "null" : comment.parentId.toString();
      if (!group[key]) {
        group[key] = [];
      }
      group[key].push(comment);
    });
    return group;
  }, [comments]);
  useEffect(() => {
    if (currentPost?.comments == null) return;
    setComments(currentPost.comments);
  }, [currentPost?.comments]);

  useEffect(() => {
    const fetchCurrentPost = async () => {
      const post = await getPostById(Number(id));
      setCurrentPost(post);
    };
    if (id) {
      fetchCurrentPost();
    }
    const fetchCurrentUser = async () => {
      const user = await getUserByClerkId(userId as string);
      setCurrentUser(user);
    };

    if (userId && isLoaded) {
      fetchCurrentUser();
    }
  }, [id]);

  const getRepliesToComments = (parentId: any) => {
    return commentsByParentId[parentId];
  };

  const value = {
    currentPost,
    setCurrentPost,
    currentUser,
    commentsByParentId,
    getRepliesToComments,
    rootComments: commentsByParentId.null,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export const usePost = (): PostContextType => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePost must be used within a PostProvider");
  }
  return context;
};
