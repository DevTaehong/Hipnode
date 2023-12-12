import { PostCardTextProps } from "@/types/homepage";

const PostText = ({ postContent }: PostCardTextProps) => {
  return (
    <h2
      className="semibold-12 md:semibold-18 line-clamp-3 pr-[1.25rem] text-sc-2 dark:text-light-2 md:line-clamp-2"
      dangerouslySetInnerHTML={{ __html: postContent.slice(1, -1) }}
    ></h2>
  );
};

export default PostText;
