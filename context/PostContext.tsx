"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { useAuth } from "@clerk/nextjs";

import { useParams } from "next/navigation";
import { getPostById } from "@/lib/actions/post.action";
import { ExtendedPost, User } from "@/types/models";
import { getUserByClerkId } from "@/lib/actions/user.actions";

interface PostContextType {
  currentPost: ExtendedPost | null;
  setCurrentPost: React.Dispatch<React.SetStateAction<ExtendedPost | null>>;
  currentUser: User;
}

const PostContext = createContext<PostContextType | null>(null);

interface PostProviderProps {
  children: ReactNode;
}

export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
  const [currentPost, setCurrentPost] = useState<ExtendedPost | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const { id } = useParams();
  const { isLoaded, userId } = useAuth();

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

  const value = { currentPost, setCurrentPost, currentUser };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export const usePost = (): PostContextType => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePost must be used within a PostProvider");
  }
  return context;
};
