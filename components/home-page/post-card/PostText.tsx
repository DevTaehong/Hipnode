import { PostCardTextProps } from "@/types/homepage";

const PostText = ({ postContent }: PostCardTextProps) => (
  <h2 className="line-clamp-2 pr-[1.25rem] text-[0.75rem] font-semibold leading-[1.125rem] text-sc-2 dark:text-light-2">
    {postContent.slice(0, 100)}
  </h2>
);

export default PostText;
