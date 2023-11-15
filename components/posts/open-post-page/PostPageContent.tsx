"use client";

import {
  LeftActionBar,
  PostMainContent,
  Profile,
  MoreInformation,
} from "@/components/posts/open-post-page";
import { formatDatePostFormat } from "@/utils";

const PostPageContent = ({ postData }: { postData: any }) => {
  const {
    author: { username },
    createdAt,
  } = postData;

  const formattedDate = formatDatePostFormat(createdAt || new Date());

  return (
    <main className="flex h-fit min-h-screen justify-center bg-light-2 px-[1.25rem] pt-[1.25rem] dark:bg-dark-2">
      <div className="mx-auto flex h-full max-w-[85rem] flex-col lg:flex-row">
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
        <div className="order-1 pb-[1.25rem] lg:order-2 lg:mx-[1.25rem]">
          <PostMainContent postData={postData} />
        </div>
        <div className="order-3 flex flex-col gap-[1.25rem] lg:order-3">
          <Profile />
          <MoreInformation />
        </div>
      </div>
    </main>
  );
};

export default PostPageContent;
