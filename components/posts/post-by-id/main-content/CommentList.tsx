import { CommentAuthorProps } from "@/types/posts";
import Comment from "@/components/posts/comment/Comment";
import useCommentGrouping from "@/components/posts/comment/useCommentGrouping";
import { getPostCommentsById } from "@/lib/actions/post.action";

type CommentListProps = {
  postId: number;
  userId: number;
};

type CommentsByParentId = {
  [key: string]: CommentAuthorProps[];
  null: CommentAuthorProps[];
};

const CommentList = async ({ postId }: CommentListProps) => {
  const postComments = await getPostCommentsById(+postId);
  const rootComments = postComments.null;
  return (
    <section>
      {rootComments && rootComments.length > 0 && (
        <>
          {rootComments?.map((comment: CommentAuthorProps) => (
            <div key={comment.id} className="mt-2 flex flex-col">
              <Comment {...comment} postComments={postComments} />
            </div>
          ))}
        </>
      )}
    </section>
  );
};

export default CommentList;
