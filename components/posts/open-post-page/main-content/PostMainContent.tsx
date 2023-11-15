import { useEffect, useMemo } from "react";
import Image from "next/image";
import CommentForm from "./CommentForm";
import CommentList from "@/components/posts/comment/CommentList";
import { TagsList } from "./index";
import { groupCommentsByParentId } from "@/utils";
import { useCreatePostStore } from "@/app/lexicalStore";

const PostMainContent = ({ postData }: any) => {
  const { tags, image, heading, content, id } = postData;
  const { setPostId, setCommentsByParentId } = useCreatePostStore(
    (state) => state
  );

  useEffect(() => {
    setPostId(id);
  }, [id]);

  const tagNames = tags?.map((tagRelation: any) => tagRelation.tag.name) ?? [];
  const rootComments = groupCommentsByParentId(postData.comments)?.null;

  const commentsId = useMemo(
    () => groupCommentsByParentId(postData.comments),
    [postData]
  );

  useEffect(() => {
    setCommentsByParentId(commentsId);
  }, [commentsId]);

  if (!postData) {
    return <PostMainContentSkeleton />;
  }

  return (
    <main className="rounded-2xl bg-light dark:bg-dark-3">
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
            <CommentForm />
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
        {rootComments && rootComments?.length > 0 && (
          <CommentList comments={rootComments} />
        )}
      </section>
    </main>
  );
};

export default PostMainContent;

const PostMainContentSkeleton = () => (
  <section className="flex w-full flex-col items-center justify-center rounded-2xl bg-light dark:bg-dark-3">
    <div className="mb-[2rem] mt-[1.25rem] h-[8rem] w-[90%] animate-pulse rounded-t-2xl bg-gray-200 dark:bg-gray-700" />
    <div className="mb-[2rem] h-6 w-3/4 animate-pulse rounded-sm bg-gray-200 pb-[0.875rem] pl-[4.8rem] dark:bg-gray-700" />
    <div className="h-[6rem] w-3/4 animate-pulse rounded-sm bg-gray-200 pb-[1.875rem] pl-[4.8rem] dark:bg-gray-700" />
    <div className="flex w-full flex-row items-center justify-between p-[1.25rem]">
      <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200 px-[1.25rem] dark:bg-gray-700" />
      <div className=" mx-[1.25rem] flex h-10 w-full grow animate-pulse rounded-2xl bg-gray-200 pb-[0.875rem] dark:bg-gray-700 " />
    </div>
  </section>
);
