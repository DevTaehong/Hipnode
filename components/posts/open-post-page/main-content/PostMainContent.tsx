import { usePost } from "@/context/posts-context/PostContext";
import CommentBox from "./CommentBox";
import PostDescription from "./PostDescription";
import PostImage from "./PostImage";
import PostTitle from "./PostTitle";
import TagsList from "./TagsList";
import CommentList from "../../comment/CommentList";

const PostMainContent = () => {
  const { currentPost, currentUser, rootComments } = usePost();

  if (!currentPost || !currentUser) return null;

  const { heading, content, image, tags } = currentPost;

  const tagNames = tags?.map((tagRelation) => tagRelation.tag.name) || [];

  return (
    <main className="rounded-2xl bg-light dark:bg-dark-3">
      <section>
        <PostImage
          src={image || ""}
          alt="post-image"
          width={335}
          height={117}
        />
        <PostTitle title={heading || ""} />
        <TagsList tags={tagNames} />
        <PostDescription description={content || ""} />
        <CommentBox placeholder="Say something nice ....." value="" />
      </section>
      <section>
        {rootComments && rootComments?.length > 0 && (
          <CommentList comments={rootComments} />
        )}
      </section>
    </main>
  );
};

export default PostMainContent;
