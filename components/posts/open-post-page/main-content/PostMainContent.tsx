import CommentBox from "./CommentBox";
import PostDescription from "./PostDescription";
import PostImage from "./PostImage";
import PostTitle from "./PostTitle";
import TagsList from "./TagsList";

import { postTags } from "@/constants/posts";

const PostMainContent = () => (
  <main className="rounded-2xl bg-light dark:bg-dark-3">
    <PostImage
      src="/images/get-shit-done.png"
      alt="post-image"
      width={335}
      height={117}
    />
    <PostTitle title="OnePay - Online Payment Processing Web App" />
    <TagsList tags={postTags} />
    <PostDescription description="OnePay is a modern, easy-to-use Online Payment Processing..." />
    <CommentBox placeholder="Say something nice ....." value="" />
  </main>
);

export default PostMainContent;
