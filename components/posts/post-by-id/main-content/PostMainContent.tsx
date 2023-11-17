import Image from "next/image";

import CommentForm from "./CommentForm";
import { TagsList } from "./index";
import CommentDataHandler from "./CommentsDataHandler";
import { ExtendedPost } from "@/types/models";
import { CommentAuthorProps } from "@/types/posts";

import PostCommentLogic from "./PostCommentLogic";
import PostMainContentSkeleton from "@/components/skeleton/PostMainContentSkeleton";

interface PostMainContentProps {
  postData: ExtendedPost;
}

const PostMainContent = ({ postData }: PostMainContentProps) => {
  if (!postData) {
    return <PostMainContentSkeleton />;
  }

  const { tags, image, heading, content, id, comments } = postData;
  const tagNames = tags?.map((tagRelation) => tagRelation.tag.name) ?? [];

  return (
    <main className="rounded-2xl bg-light dark:bg-dark-3">
      <CommentDataHandler
        postId={id}
        comments={comments as CommentAuthorProps[]}
      />
      <section>
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
            <Image
              src="/images/emoji_2.png"
              alt="emoji"
              width={40}
              height={40}
            />
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
      </section>

      <section>
        <PostCommentLogic
          comments={comments as CommentAuthorProps[]}
          postId={id}
        />
      </section>
    </main>
  );
};

export default PostMainContent;
