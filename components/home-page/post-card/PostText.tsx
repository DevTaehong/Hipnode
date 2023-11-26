import { PostCardTextProps } from "@/types/homepage";

const PostText = ({ postContent }: PostCardTextProps) => {
  return (
    <h2
      className="line-clamp-5  pr-[1.25rem] text-[0.75rem] font-semibold leading-[1.125rem] text-sc-2 dark:text-light-2"
      dangerouslySetInnerHTML={{ __html: postContent.slice(1, -1) }}
    ></h2>
  );
};

export default PostText;
