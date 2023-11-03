import { PostDescriptionProps } from "@/types/posts";

const PostDescription = ({ description }: PostDescriptionProps) => (
  <p className="pb-[1.875rem] pl-[4.8rem] pr-[1.25rem] text-[1rem] leading-[1.625rem]  text-sc-3 lg:pb-[2.5rem]">
    {description}
  </p>
);

export default PostDescription;
