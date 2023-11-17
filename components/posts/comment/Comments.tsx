import { getPostCommentsById } from "@/lib/actions/post.action";
import { CommentAuthorProps } from "@/types/posts";
import CommentDataHandler from "../post-by-id/main-content/CommentsDataHandler";
import PostCommentLogic from "../post-by-id/main-content/PostCommentLogic";

const Comments = async ({ postId }: { postId: number }) => {
  const postComments = await getPostCommentsById(+postId);
  return (
    <>
      <CommentDataHandler
        comments={postComments as CommentAuthorProps[]}
        postId={postId}
      />
      <PostCommentLogic
        comments={postComments as CommentAuthorProps[]}
        postId={postId}
      />
    </>
  );
};
export default Comments;
