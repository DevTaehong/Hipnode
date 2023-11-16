"use client";

import { useEffect, useMemo } from "react";
import { groupCommentsByParentId } from "@/utils";
import { useCreatePostStore } from "@/app/lexicalStore";
import { CommentDataHandlerProps } from "@/types/posts";

const CommentDataHandler = ({ postId, comments }: CommentDataHandlerProps) => {
  const { setPostId, setCommentsByParentId } = useCreatePostStore(
    (state) => state
  );

  useEffect(() => {
    setPostId(postId);
  }, [postId, setPostId]);

  const commentsId = useMemo(
    () => groupCommentsByParentId(comments),
    [comments]
  );

  useEffect(() => {
    setCommentsByParentId(commentsId);
  }, [commentsId, setCommentsByParentId]);

  return null;
};

export default CommentDataHandler;
