import { CommentAuthorProps } from "@/types/posts";
import Comment from "@/components/posts/comment/Comment";
import { getPostCommentsByParentId } from "@/lib/actions/post.action";

type CommentListProps = {
  postId: number;
};

const CommentList = async ({ postId }: CommentListProps) => {
  const postComments = await getPostCommentsByParentId(+postId);

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
