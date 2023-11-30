"use client";

import { CommentAuthorProps } from "@/types/posts";
import Comment from "@/components/posts/comment/Comment";
import useCommentGrouping from "@/components/posts/comment/useCommentGrouping";

type CommentListProps = {
  postId: number;
  userId: number;
};

type CommentsByParentId = {
  [key: string]: CommentAuthorProps[];
  null: CommentAuthorProps[];
};

const CommentList = ({ postId, userId }: CommentListProps) => {
  const [commentsByParentId] = useCommentGrouping({
    postId,
    userId,
  }) as [CommentsByParentId];

  const rootComments = commentsByParentId.null;
  return (
    <section>
      {rootComments && rootComments.length > 0 && (
        <>
          {rootComments?.map((comment: CommentAuthorProps) => (
            <div key={comment.id} className="mt-2 flex flex-col">
              <Comment {...comment} />
            </div>
          ))}
        </>
      )}
    </section>
  );
};

export default CommentList;
