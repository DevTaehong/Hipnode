"use client";

import { useState, useEffect } from "react";

import { CommentAuthorProps, PostCommentLogicProps } from "@/types/posts";
import { groupCommentsByParentId } from "@/utils";
import CommentDataHandler from "./CommentsDataHandler";
import { CommentList } from "@/components/posts/comment";

const PostCommentLogic = ({ comments, postId }: PostCommentLogicProps) => {
  const [rootComments, setRootComments] = useState<CommentAuthorProps[]>([]);

  useEffect(() => {
    const groupedComments = groupCommentsByParentId(comments);
    setRootComments(groupedComments?.null || []);
  }, [comments]);

  return (
    <section>
      <CommentDataHandler postId={postId} comments={comments} />
      {rootComments && rootComments.length > 0 && (
        <CommentList comments={rootComments} />
      )}
      
    </section>
  );
};

export default PostCommentLogic;
