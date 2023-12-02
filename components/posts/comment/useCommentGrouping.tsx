"use client";

import { useEffect, useState } from "react";

import { groupCommentsByParentId } from "@/utils";
import { getPostCommentsById } from "@/lib/actions/post.action";

interface SetCommentsByParentIdHandlerProps {
  postId: number;
  userId: number;
}

const useCommentGrouping = ({
  postId,
  userId,
}: SetCommentsByParentIdHandlerProps) => {
  const [commentsByParentId, setCommentsByParentId] = useState({});

  useEffect(() => {
    (async () => {
      const postComments = await getPostCommentsById(+postId, userId);
      const postCommentsWithUser = postComments?.map((comment) => {
        return {
          ...comment,
          userId,
        };
      });
      setCommentsByParentId(groupCommentsByParentId(postCommentsWithUser));
    })();
  }, [postId, userId]);

  return [commentsByParentId, setCommentsByParentId];
};

export default useCommentGrouping;
