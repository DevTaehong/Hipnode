import Image from "next/image";

import CommentsOnMainPost from "@/components/posts/comment/CommentsOnMainPost";
import { LeftActionBar, Profile } from "@/components/posts/post-by-id";
import { TagsList } from "@/components/posts/post-by-id/main-content";
import { getPostContentById } from "@/lib/actions/post.action";
import { formatDatePostFormat } from "@/utils";
import CommentForm from "@/components/posts/comment/CommentForm";
import DevelopmentInformation from "@/components/posts/post-by-id/right-column/DevelopmentInformation";
import { devInfo } from "@/constants";

const PostPage = async ({ params }: { params: { id: number } }) => {
  const { id } = params;
  const postData = await getPostContentById(+id);

  const {
    author: { username },
    createdAt,
  } = postData;

  const formattedDate = formatDatePostFormat(createdAt || new Date());
  const { tags, image, heading, content } = postData;
  const tagNames = tags?.map((tagRelation) => tagRelation.tag.name) ?? [];

  return (
    <main className="flex h-fit min-h-screen justify-center bg-light-2 px-[1.25rem] pt-[1.25rem] dark:bg-dark-2">
      <div className="mx-auto flex h-full w-full max-w-[85rem] flex-col lg:flex-row">
        <div className="order-2 flex flex-col gap-[1.25rem] lg:order-1">
          <LeftActionBar />
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
            <div>
              <div className="flex justify-center pb-[1.25rem]">
                <Image
                  src={image || ""}
                  alt="post-image"
                  width={335}
                  height={117}
                />
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
                <div className="flex h-fit grow rounded-[1.4rem] border border-solid border-sc-5 pr-[1.25rem]">
                  {/* @ts-ignore */}
                  <CommentForm postId={postData.id} />
                </div>
              </div>
              <CommentsOnMainPost postId={id} />
            </div>
          </section>
        </div>
        <div className="order-3 flex flex-col gap-[1.25rem] lg:order-3">
          <Profile />
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
