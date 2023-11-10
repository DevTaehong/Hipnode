"use client";

import React, { createContext, useState, useEffect, useMemo } from "react";
import { useAuth } from "@clerk/nextjs";

import { useParams } from "next/navigation";
import { getPostById } from "@/lib/actions/post.action";
import { ExtendedPost, User } from "@/types/models";
import { getUserByClerkId } from "@/lib/actions/user.actions";
import {
  CommentProps,
  PostContextType,
  PostProviderProps,
} from "@/types/posts";
import {
  groupCommentsByParentId,
  getRepliesToComments as getReplies,
} from "./PostContext.utils";

export const PostContext = createContext<PostContextType | null>(null);

export const PostProvider = ({ children }: PostProviderProps) => {
  const [currentPost, setCurrentPost] = useState<ExtendedPost | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isReplying, setIsReplying] = useState<boolean>(false);

  const { id } = useParams();
  const { isLoaded, userId } = useAuth();

  const commentsByParentId = useMemo(
    () => groupCommentsByParentId(comments),
    [comments]
  );

  const getRepliesToComments = (parentId: string | null) =>
    getReplies(commentsByParentId, parentId);

  useEffect(() => {
    if (currentPost?.comments == null) return;
    setComments(currentPost.comments as CommentProps[]);
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

  const value = {
    currentPost,
    setCurrentPost,
    currentUser,
    commentsByParentId,
    getRepliesToComments,
    setComments,
    comments,
    rootComments: commentsByParentId.null,
    isEditing,
    setIsEditing,
    isReplying,
    setIsReplying,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
