import Comment from "./Comment";

import { CommentListProps } from "@/types/posts";

const CommentList = ({ comments }: CommentListProps) => {
  return (
    <>
      {comments.map((comment) => (
        <div key={comment.id} className="mt-2 flex flex-col">
          <Comment {...comment} />
        </div>
      ))}
    </>
  );
};

export default CommentList;
