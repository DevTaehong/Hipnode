import { PostTitleProps } from "@/types/posts";

const PostTitle = ({ title }: PostTitleProps) => (
  <h1 className="pb-[0.875rem] pl-[4.8rem] font-[1.625rem] leading-[2.375rem] text-sc-2 dark:text-light-2 lg:pb-[1.25rem]">
    {title}
  </h1>
);

export default PostTitle;
