import Image from "next/image";

import CommentForm from "./CommentForm";
import { TagsList } from "./index";
import { PostMainContentProps } from "@/types/posts";

const PostMainContent = ({ postData }: PostMainContentProps) => {
  const { tags, image, heading, content } = postData;
  const tagNames = tags?.map((tagRelation) => tagRelation.tag.name) ?? [];

  return (
    <>
      <div className="flex justify-center pb-[1.25rem]">
        <Image src={image || ""} alt="post-image" width={335} height={117} />
      </div>
      <h1 className="pb-[0.875rem] pl-[4.8rem] font-[1.625rem] leading-[2.375rem] text-sc-2 dark:text-light-2 lg:pb-[1.25rem]">
        {heading}
      </h1>
      <TagsList tags={tagNames} />
      <p className="pb-[1.875rem] pl-[4.8rem] pr-[1.25rem] text-[1rem] leading-[1.625rem]  text-sc-3 lg:pb-[2.5rem]">
        {content}
      </p>
      <div className="flex items-center justify-center pb-[1.25rem] pr-[1.25rem]">
        <div className="flex items-center justify-center px-[1.25rem]">
          <Image src="/images/emoji_2.png" alt="emoji" width={40} height={40} />
        </div>
        <div className="flex grow justify-between rounded-[1.4rem] border border-solid border-sc-5 pr-[1.25rem]">
          {/* @ts-ignore */}
          <CommentForm postId={postData.id} />
          <Image
            src="/smiley.svg"
            alt="smiley"
            width={24}
            height={24}
            className="rounded-full"
          />
        </div>
      </div>
    </>
  );
};

export default PostMainContent;
