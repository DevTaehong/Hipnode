import { usePost } from "@/context/PostContext";
import CommentBox from "./CommentBox";
import PostDescription from "./PostDescription";
import PostImage from "./PostImage";
import PostTitle from "./PostTitle";
import TagsList from "./TagsList";

interface NestedTag {
  tag: {
    id: string;
    name: string;
  };
}

interface PostMainContentProps {
  imageSrc: string | null;
  heading: string | null;
  content: string | null;
  tags: NestedTag[] | null;
}

const PostMainContent = ({
  imageSrc,
  heading,
  content,
  tags,
}: PostMainContentProps) => {
  const tagNames = tags?.map((tagRelation) => tagRelation.tag.name) || [];

  return (
    <main className="rounded-2xl bg-light dark:bg-dark-3">
      <PostImage
        src={imageSrc || ""}
        alt="post-image"
        width={335}
        height={117}
      />
      <PostTitle title={heading || ""} />
      <TagsList tags={tagNames} />
      <PostDescription description={content || ""} />
      <CommentBox placeholder="Say something nice ....." value="" />
    </main>
  );
};

export default PostMainContent;
