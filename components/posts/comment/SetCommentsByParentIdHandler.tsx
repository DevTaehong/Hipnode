"use client";

import { useEffect, useMemo } from "react";

import { groupCommentsByParentId } from "@/utils";
import { useCreatePostStore } from "@/app/lexicalStore";
import { CommentAuthorProps } from "@/types/posts";

interface SetCommentsByParentIdHandlerProps {
  comments: CommentAuthorProps[];
}

const SetCommentsByParentIdHandler = ({
  comments,
}: SetCommentsByParentIdHandlerProps) => {
  const { setCommentsByParentId } = useCreatePostStore((state) => state);

  const commentsByParentIdMemo = useMemo(
    () => groupCommentsByParentId(comments),
    [comments]
  );

  useEffect(() => {
    setCommentsByParentId(commentsByParentIdMemo);
  }, [commentsByParentIdMemo, setCommentsByParentId]);

  return null;
};

export default SetCommentsByParentIdHandler;
