import Image from "next/image";

import Tag from "@/components/profile/Tag";
import FillIcon from "@/components/icons/fill-icons";
import Dot from "@/components/profile/Dot";
import StatsDescription from "@/components/profile/StatsDescription";
import SanatizedHtml from "@/components/posts/post-by-id/main-content/SanatizedHtml";

import { ContentCardProps } from "@/types";
import { cn } from "@/lib/utils";

const ContentCard = ({
  contentImg,
  userImg,
  description,
  tags,
  views,
  likes,
  comments,
  isHeart,
  name,
  createdAt,
}: ContentCardProps) => {
  return (
    <div className="flex gap-3.5 rounded-[0.875rem] bg-light p-3.5 dark:bg-dark-3 md:rounded-[1rem] lg:p-5">
      <section className="w-[20%]">
        <Image
          src={contentImg}
          alt={`${name} post image`}
          width={100}
          height={100}
          className="w-full rounded-[0.25rem] border border-contentCard object-contain object-left-top shadow-contentCard md:rounded-[1rem]"
        />
      </section>

      <section className="flex w-full flex-1 flex-col justify-between gap-5 lg:gap-7">
        <article className="flex justify-between gap-2.5 sm:gap-5">
          <div className="flex flex-col gap-2.5">
            <p className="line-clamp-3 text-[0.75rem] font-semibold leading-[1.125rem] text-sc-2 dark:text-light-2 md:line-clamp-2 md:text-[1.125rem] md:leading-[1.625rem]">
              {<SanatizedHtml content={description} />}
            </p>

            <div className="flex gap-2.5">
              {tags.map((tag) => (
                <Tag key={tag} text={tag} />
              ))}
            </div>
          </div>

          <div className="flex shrink-0">
            <Image
              src={userImg || "/images/emoji.png"}
              alt="User"
              width={30}
              height={30}
              className="h-[30px] w-[30px] rounded-full bg-light-2 object-contain object-right-top dark:bg-purple-10 md:hidden"
            />

            <div className="hidden items-start gap-2.5 md:flex">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full dark:bg-dark-4 bg-sc-6",
                  isHeart && "bg-red-10"
                )}
              >
                <FillIcon.Heart
                  className={cn(
                    "mt-[2.5px] fill-sc-5",
                    isHeart && "fill-red-80"
                  )}
                />
              </div>

              <div className="flex h-8 w-8 items-center justify-center">
                <FillIcon.MoreVertical />
              </div>
            </div>
          </div>
        </article>

        <article className="flex justify-start md:justify-between">
          <div className="flex shrink-0 gap-2.5">
            <Image
              src={userImg || "/images/emoji.png"}
              alt="User"
              width={40}
              height={40}
              className="hidden rounded-full bg-light-2 object-contain object-right-top dark:bg-purple-10 md:block"
            />

            <div className="hidden md:block">
              <h4 className="flex items-center gap-1 text-[0.875rem] font-semibold leading-[1.375rem] text-sc-2 dark:text-sc-6">
                {name}
                {/* TODO: figure out how to change this status dot based on if the user is online */}
                <Dot />
              </h4>

              <p className="text-[0.625rem] leading-[1rem] text-sc-3 dark:text-sc-5">
                {createdAt}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <StatsDescription>{views} Views</StatsDescription>

            <StatsDescription>{likes} Likes</StatsDescription>

            <StatsDescription>{comments} Comments</StatsDescription>
          </div>
        </article>
      </section>
    </div>
  );
};

export default ContentCard;
