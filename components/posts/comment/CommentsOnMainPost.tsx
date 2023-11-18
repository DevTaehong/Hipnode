import { getPostCommentsById } from "@/lib/actions/post.action";
import SetCommentsByParentIdHandler from "@/components/posts/comment/SetCommentsByParentIdHandler";
import RenderRootComments from "@/components/posts/post-by-id/main-content/RenderRootComments";

const CommentsOnMainPost = async ({ postId }: { postId: number }) => {
  const postComments = await getPostCommentsById(+postId);

  return (
    <>
      <SetCommentsByParentIdHandler comments={postComments} />
      <RenderRootComments />
    </>
  );
};
export default CommentsOnMainPost;
