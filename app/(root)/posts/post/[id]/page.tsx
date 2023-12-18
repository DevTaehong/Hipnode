import Image from "next/image";

import { LeftActionBar } from "@/components/posts/post-by-id";
import { TagsList } from "@/components/posts/post-by-id/main-content";
import {
  getPostsByUserClerkId,
  getPostContentById,
} from "@/lib/actions/post.action";
import {
  formatDatePostFormat,
  getActionBarData,
  howManyMonthsAgo,
} from "@/utils";
import CommentForm from "@/components/posts/comment/CommentForm";
import SanatizedHtml from "@/components/posts/post-by-id/main-content/SanatizedHtml";
import DevelopmentInformation from "@/components/posts/post-by-id/right-column/DevelopmentInformation";
import CommentList from "@/components/posts/post-by-id/main-content/CommentList";
import CustomButton from "@/components/CustomButton";
import RightColumnWrapper from "@/components/posts/post-by-id/right-column/RightColumnWrapper";
import PostActionPopover from "@/components/posts/action-popover/PostActionPopover";
import Spinner from "@/components/Spinner";

const PostPage = async ({ params }: { params: { id: number } }) => {
  const { id } = params;
  const postData = await getPostContentById(+id);

  const {
    author: { username, picture, id: postAuthorId },
    createdAt,
  } = postData;

  const formattedDate = formatDatePostFormat(createdAt || new Date());
  const { tags, image, heading, content } = postData;
  const actionBarData = getActionBarData(postData);
  if (!postData.clerkId)
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  const devInfo = await getPostsByUserClerkId(postData.clerkId);
  const calculatedDate = howManyMonthsAgo(createdAt);

  return (
    <main className="flex h-fit min-h-screen justify-center bg-light-2 px-[1.25rem] pt-[1.25rem] dark:bg-dark-2">
      <div className="mx-auto flex h-full w-full max-w-[85rem] flex-col lg:flex-row">
        <div className="order-2 flex flex-col gap-[1.25rem] lg:order-1">
          <LeftActionBar actionBarData={actionBarData} />
          <aside className="mb-[1.25rem] flex min-w-[13rem] flex-col justify-start rounded-2xl bg-light p-[1.25rem] dark:bg-dark-3">
            <p className="text-[1rem] font-semibold leading-[1.5rem] text-sc-3">
              <span className="pr-[0.5rem] text-[1rem] font-semibold leading-[1.5rem] text-blue-80">
                {username}
              </span>
              Posted on <span>{formattedDate}</span>
            </p>
          </aside>
        </div>
        <div className="order-1 flex h-fit w-full pb-[1.25rem] lg:order-2 lg:mx-[1.25rem]">
          <section className="w-full rounded-2xl bg-light dark:bg-dark-3">
            <div className="flex max-h-[273px] w-full justify-center rounded-t-2xl pb-[1.25rem]">
              <Image
                src={image || ""}
                alt="post-image"
                width={335}
                height={117}
                className="w-full rounded-t-2xl object-cover"
              />
            </div>
            <div className="flex items-center justify-between">
              <h1 className="pb-[0.875rem] pl-[4.8rem] font-[1.625rem] leading-[2.375rem] text-sc-2 dark:text-light-2 lg:pb-[1.25rem]">
                {heading}
              </h1>
              <div className="pb-[0.875rem] pr-[2.8rem] font-[1.625rem] leading-[2.375rem] text-sc-2 dark:text-light-2 lg:pb-[1.25rem]">
                {postAuthorId === postData.loggedInUserId && (
                  <PostActionPopover postId={postData.id} label="Post" />
                )}
              </div>
            </div>

            <TagsList tags={tags} />
            <div className="pb-[1.875rem] pl-[4.8rem] pr-[1.25rem] text-[1rem] leading-[1.625rem]  text-sc-3 lg:pb-[2.5rem]">
              <SanatizedHtml content={content} />
            </div>
            <div className="flex items-center justify-center pb-[1.25rem] pr-[1.25rem]">
              <div className="flex items-center justify-center px-[1.25rem]">
                <Image
                  src="/images/emoji_2.png"
                  alt="emoji"
                  width={40}
                  height={40}
                />
              </div>
              <div className="flex h-fit grow rounded-[1.4rem] border border-solid border-sc-5 pr-[1.25rem]">
                <CommentForm postId={postData.id} postHeading={heading} />
              </div>
            </div>
            <CommentList postId={+id} postHeading={heading} />
          </section>
        </div>
        <div className="order-3 flex flex-col gap-[1.25rem] lg:order-3">
          <RightColumnWrapper>
            <div className="mb-[1.25rem] flex  h-[6.25rem] w-[6.25rem] items-center justify-center rounded-full bg-purple-20">
              <Image
                src={picture ?? "/images/emoji_2.png"}
                alt="profile-image"
                height={100}
                width={100}
                className="flex-center h-[5rem] w-[5rem] rounded-full"
              />
            </div>
            <h2 className="flex justify-center text-[1.625rem] leading-[2.375rem] text-sc-2 dark:text-light-2">
              {username}
            </h2>
            <p className="mb-[1.25rem] flex justify-center text-[1rem] leading-[1.5rem] text-sc-3">
              Web Developer
            </p>
            <CustomButton
              label="Follow"
              className="mb-[1.25rem] flex w-full items-center rounded-md bg-blue p-[0.625rem] text-[1.125rem] leading-[1.625rem] text-light"
            />
            <p className="flex justify-center text-[1rem] leading-[1.5rem] text-sc-3">
              {+calculatedDate > 0
                ? `joined ${calculatedDate} months ago`
                : "joined this month"}
            </p>
          </RightColumnWrapper>
          <aside className="flex min-w-[20.3rem] flex-col items-center justify-center rounded-2xl bg-light p-[1.875rem] dark:bg-dark-3">
            <h2 className="text-[1.125rem] leading-[1.625rem] text-sc-2 dark:text-light-2">
              More from {username}
            </h2>

            <div className="flex flex-col items-start">
              <DevelopmentInformation devInfo={devInfo} />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default PostPage;
