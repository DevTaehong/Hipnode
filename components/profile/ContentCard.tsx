import Image from "next/image";
import Tag from "./Tag";
import FillIcon from "../icons/fill-icons";

const ContentCard = () => {
  return (
    <div className="flex gap-3.5 rounded-[0.875rem] bg-light p-3.5 dark:bg-dark-3 md:rounded-[1rem] lg:p-5">
      <section className="w-[20%] ">
        <Image
          src="/postCardPlacholder.png"
          alt="content"
          width={100}
          height={100}
          className="w-full rounded-[0.25rem] border border-contentCard object-contain object-left-top shadow-contentCard md:rounded-[1rem]"
        />
      </section>

      <section className="flex w-full flex-1 flex-col justify-between gap-5 lg:gap-7">
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

          <div className="flex shrink-0">
            <Image
              src="/images/emoji_2.png"
              alt="User"
              width={30}
              height={30}
              className="h-[30px] w-[30px] rounded-full bg-light-2 object-contain object-right-top dark:bg-purple-10 md:hidden"
            />

            <div className="hidden items-start gap-2.5 md:flex">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sc-6 dark:bg-dark-4">
                <FillIcon.Heart className="fill-sc-5" />
              </div>

              <div className="flex h-8 w-8 items-center justify-center">
                <FillIcon.MoreVertical />
              </div>
            </div>
          </div>
        </article>

        <article className="flex justify-start md:justify-between">
          {/* account name goes here on bigger screen */}
          <div className="shrink-0">
            <Image
              src="/images/emoji_2.png"
              alt="User"
              width={40}
              height={40}
              className="hidden rounded-full bg-light-2 object-contain object-right-top dark:bg-purple-10 md:block"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <p className="text-[0.5625rem] leading-[0.875rem] text-sc-3 dark:text-sc-5 lg:text-[0.875rem] lg:leading-[1.375rem]">
              601,066 Views
            </p>
            <p className="text-[0.5625rem] leading-[0.875rem] text-sc-3 dark:text-sc-5 lg:text-[0.875rem] lg:leading-[1.375rem]">
              24,753 Likes
            </p>
            <p className="text-[0.5625rem] leading-[0.875rem] text-sc-3 dark:text-sc-5 lg:text-[0.875rem] lg:leading-[1.375rem]">
              209 Comments
            </p>
          </div>
        </article>
      </section>
    </div>
  );
};

export default ContentCard;
