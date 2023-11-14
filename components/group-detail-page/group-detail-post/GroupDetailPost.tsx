"use client";

import Image from "next/image";
import { Post } from "@prisma/client";
import Link from "next/link";

import Tag from "@/components/profile/Tag";
import StatsDescription from "@/components/profile/StatsDescription";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Heart from "@/components/icons/fill-icons/Heart";
import { ExtendedPost } from "@/types/models";
import { formatGroupDetailPostDate } from "@/utils";

const GroupDetailPost = (post: Post) => {
  const { id, author, image, createdAt, heading } = post as ExtendedPost;
  const date = formatGroupDetailPostDate(new Date(createdAt));

  return (
    <Link
      href={`/posts/${id}`}
      className="bg-light_dark-3 flex min-h-[9.25rem] flex-row gap-3.5 rounded-[0.625rem] 
        p-3.5 hover:opacity-80 hover:transition-opacity lg:gap-5 lg:rounded-2xl lg:p-5"
    >
      <Image
        src={image}
        alt={`${heading} image`}
        width={56}
        height={56}
        className="h-14 w-14 rounded-[0.25rem] object-cover sm:h-[9.75rem] sm:w-[9.75rem] sm:rounded-2xl 
          lg:h-14 lg:w-14 lg:border lg:border-contentCard lg:shadow-contentCard xl:h-[9.75rem] xl:w-[9.75rem]"
      />
      <div className="flex grow flex-col justify-between gap-5">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-2.5">
            <h3
              className={`semibold-12 lg:semibold-12 xl:semibold-18 md:semibold-18 line-clamp-3 text-sc-2 dark:text-light-2 lg:line-clamp-2`}
            >
              {heading}
            </h3>
            <div className="flex flex-row gap-2.5">
              <Tag text={"Bitcoin"} />
              <Tag text={"Bitcoin"} />
              <Tag text={"Bitcoin"} />
            </div>
          </div>
          <Avatar className="flex h-[1.875rem] w-[1.875rem] shrink-0 md:h-10 md:w-10 xl:hidden">
            <AvatarImage
              src={author.picture}
              alt={`${author.username}'s avatar`}
            />
            <AvatarFallback>{author.username.charAt(0)}</AvatarFallback>
          </Avatar>
          <Heart className={"hidden xl:block"} />
        </div>
        <div className="flex flex-row gap-[1.875rem] lg:items-center lg:justify-between lg:gap-10">
          <div className="hidden xl:flex xl:flex-row xl:gap-2.5">
            <Avatar className="h-10 w-10 shrink-0">
              <AvatarImage
                src={author.picture}
                alt={`${author.username}'s avatar`}
              />
              <AvatarFallback>{author.username.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="flex flex-row items-center gap-1">
                <p className="semibold-14 text-sc-2">{author.username}</p>
                <p className="text-sc-5">{`•`}</p>
              </div>
              <p className="regular-10 text-sc-3">{date}</p>
            </div>
          </div>
          <div className="flex flex-row gap-[1.875rem] xl:items-center xl:gap-10">
            <StatsDescription
              className={`md:text-[0.875rem] md:leading-[1.375rem] lg:text-[0.5625rem] lg:leading-[0.875rem] xl:text-[0.875rem] xl:leading-[1.375rem]`}
            >
              {"651,324"} Views
            </StatsDescription>
            <StatsDescription
              className={`md:text-[0.875rem] md:leading-[1.375rem] lg:text-[0.5625rem] lg:leading-[0.875rem] xl:text-[0.875rem] xl:leading-[1.375rem]`}
            >
              {"36,6545"} Likes
            </StatsDescription>
            <StatsDescription
              className={`md:text-[0.875rem] md:leading-[1.375rem] lg:text-[0.5625rem] lg:leading-[0.875rem] xl:text-[0.875rem] xl:leading-[1.375rem]`}
            >
              {56} Comments
            </StatsDescription>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GroupDetailPost;
