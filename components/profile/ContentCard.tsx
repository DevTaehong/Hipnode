import React from "react";
import Image from "next/image";
import Tag from "./Tag";

const ContentCard = () => {
  return (
    <div className="flex gap-3.5 rounded-[0.875rem] bg-light p-3.5 dark:bg-dark-3 md:rounded-[1rem] md:p-5">
      <section className="w-[20%] md:w-[25%]">
        <Image
          src="/postCardPlacholder.png"
          alt="content"
          width={100}
          height={100}
          className="w-full rounded-[0.25rem] border border-contentCard object-contain object-left-top shadow-contentCard md:rounded-[1rem]"
        />
      </section>

      <section className="flex w-full flex-1 flex-col gap-5 md:gap-7">
        <article className="flex gap-2.5 sm:gap-5">
          <div className="flex flex-col gap-2.5">
            <p className="line-clamp-3 text-[0.75rem] font-semibold leading-[1.125rem] text-sc-2 dark:text-light-2 md:line-clamp-2 md:text-[1.125rem] md:leading-[1.625rem]">
              Bitcoin has tumbled from its record high of $58,000 after words
              from three wise men and women...
            </p>

            <div className="flex gap-2.5">
              <Tag text="payment" />
              <Tag text="seo" />
              <Tag text="crypto" />
            </div>
          </div>

          <div className="shrink-0">
            <Image
              src="/images/emoji_2.png"
              alt="User"
              width={30}
              height={30}
              className="rounded-full bg-light-2 object-contain object-right-top dark:bg-purple-10"
            />
          </div>
        </article>

        <article className="flex items-end justify-between">
          {/* account name goes here on bigger screen */}

          <div className="flex items-center justify-between gap-4">
            <p className="text-[0.5625rem] leading-[0.875rem] text-sc-3 dark:text-sc-5 md:text-[0.875rem] md:leading-[1.375rem]">
              601,066 Views
            </p>
            <p className="text-[0.5625rem] leading-[0.875rem] text-sc-3 dark:text-sc-5 md:text-[0.875rem] md:leading-[1.375rem]">
              24,753 Likes
            </p>
            <p className="text-[0.5625rem] leading-[0.875rem] text-sc-3 dark:text-sc-5 md:text-[0.875rem] md:leading-[1.375rem]">
              209 Comments
            </p>
          </div>
        </article>
      </section>
    </div>
  );
};

export default ContentCard;
