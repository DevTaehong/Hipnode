import { Post } from "@prisma/client";
import CommentBox from "./CommentBox";
import PostDescription from "./PostDescription";
import PostImage from "./PostImage";
import PostTitle from "./PostTitle";
import TagsList from "./TagsList";

interface Tag {
  id: number;
  postId: number;
  tagId: number;
  tag: {
    id: number;
    name: string;
  };
}

interface PostWithTags extends Post {
  tags: Tag[];
}

interface PostMainContentProps {
  post: PostWithTags | null;
}

const PostMainContent = ({ post }: PostMainContentProps) => {
  const tagNames = post?.tags?.map((tagRelation) => tagRelation.tag.name) || [];

  return (
    <main className="rounded-2xl bg-light dark:bg-dark-3">
      <PostImage
        src={post?.image || ""}
        alt="post-image"
        width={335}
        height={117}
      />
      <PostTitle title={post?.heading || ""} />
      <TagsList tags={tagNames} />
      <PostDescription description={post?.content || ""} />
      <CommentBox placeholder="Say something nice ....." value="" />
    </main>
  );
};

export default PostMainContent;
