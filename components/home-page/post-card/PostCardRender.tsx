import { PostCard } from ".";
import { PostCardRenderProps } from "@/types/posts";

const PostCardRender = ({
  postData,
  setTagged,
  authorId,
}: PostCardRenderProps) => {
  return (
    <>
      {postData.map((post) => {
        return (
          <PostCard
            key={post.id}
            post={post}
            setTagged={setTagged}
            userIdFromParams={authorId}
          />
        );
      })}
    </>
  );
};

export default PostCardRender;
