import { usePost } from "@/context/PostContext";
import CommentBox from "./CommentBox";
import PostDescription from "./PostDescription";
import PostImage from "./PostImage";
import PostTitle from "./PostTitle";
import TagsList from "./TagsList";

const PostMainContent = () => {
  const { currentPost, currentUser } = usePost();

  if (!currentPost) return null;
  const { heading, content, image, tags } = currentPost;
  if (!currentUser) return null;
  const tagNames = tags?.map((tagRelation) => tagRelation.tag.name) || [];

  return (
    <main className="rounded-2xl bg-light dark:bg-dark-3">
      <PostImage src={image || ""} alt="post-image" width={335} height={117} />
      <PostTitle title={heading || ""} />
      <TagsList tags={tagNames} />
      <PostDescription description={content || ""} />
      <CommentBox placeholder="Say something nice ....." value="" />
    </main>
  );
};

export default PostMainContent;
