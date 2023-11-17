"use client";

import { useEffect, useMemo } from "react";
import { groupCommentsByParentId } from "@/utils";
import { useCreatePostStore } from "@/app/lexicalStore";
import { CommentDataHandlerProps } from "@/types/posts";

const CommentDataHandler = ({ comments }: CommentDataHandlerProps) => {
  const { setCommentsByParentId } = useCreatePostStore((state) => state);

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
