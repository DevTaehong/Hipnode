import CommentList from "@/components/posts/comment/CommentList";
import { usePost } from "@/hooks/context/usePost";
import {
  TagsList,
  PostTitle,
  PostImage,
  PostDescription,
  CommentBox,
} from "./index";
const PostMainContent = () => {
  const { currentPost, currentUser, rootComments } = usePost();

  if (!currentPost || !currentUser) return <p>Loading...</p>;

  const { heading, content, image, tags } = currentPost;

  const tagNames = tags?.map((tagRelation: any) => tagRelation.tag.name) ?? [];

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
        <CommentBox />
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
