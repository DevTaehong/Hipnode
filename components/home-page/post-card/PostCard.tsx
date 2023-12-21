"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import DOMPurify from "isomorphic-dompurify";

import {
  PostImage,
  PostText,
  SocialMediaIcon,
  PostLabels,
  SocialStatistics,
} from ".";
import FillIcon from "@/components/icons/fill-icons";
import { PostCardProps, SocialCountTuple } from "@/types/homepage";

import { formatDatePostFormat, userHasLikedComment } from "@/utils";
import dynamic from "next/dynamic";

const MediaEditActionPopover = dynamic(
  () => import("@/components/action-popover/MediaEditActionPopover"),
  { ssr: false }
);

const PostCard = ({
  post: {
    image,
    content,
    id,
    tags,
    likesCount = 0,
    commentsCount = 0,
    viewCount = 1,
    author: { picture, username },
    createdAt,
    comments,
    blurImage,
    imageHeight,
    imageWidth,
    userCanEditMedia,
  },
  userId,
  profileSearchParams,
}: PostCardProps) => {
  const [htmlString, setHtmlString] = useState("");
  const socialCounts: SocialCountTuple[] = [
    ["views", viewCount],
    ["likes", likesCount],
    ["comments", commentsCount],
  ];

  useEffect(() => {
    const sanitizedHtml = DOMPurify.sanitize(content);
    setHtmlString(sanitizedHtml);
  }, [content]);

  const hasLiked = userHasLikedComment(userId, comments);
  const heartIconClass = hasLiked ? "fill-red-80" : "fill-sc-5";

  return (
    <div className="flex h-full rounded-xl bg-light p-[1.25rem] dark:bg-dark-3">
      <Link href={`/posts/post/${id}`}>
        <PostImage
          postImage={image}
          blurImage={blurImage}
          imageWidth={imageWidth}
          imageHeight={imageHeight}
        />
      </Link>
      <div className="ml-[0.875rem] flex h-full grow flex-col justify-between">
        <div className="flex h-full flex-col gap-2.5">
          <div className="flex justify-between">
            <Link href={`/posts/post/${id}`}>
              <PostText postContent={htmlString} />
            </Link>
            <div className="flex flex-row">
              <Link href="/profile" className="flex cursor-pointer md:hidden">
                <SocialMediaIcon
                  authorPicture={picture ?? "/public/emoji.png"}
                />
              </Link>
              <div className="flex items-center justify-center">
                <div className="mr-2.5 flex">
                  <FillIcon.Heart
                    className={`hidden md:flex ${heartIconClass}`}
                  />
                </div>
                <div className="mt-1.5 flex">
                  {userCanEditMedia && profileSearchParams === "posts" && (
                    <MediaEditActionPopover mediaId={id} label="Post" />
                  )}
                </div>
              </div>
            </div>
          </div>
          <PostLabels tags={tags} />
        </div>

        <div className="hidden items-center justify-between md:flex">
          <Link href="/profile" className="flex items-center">
            <SocialMediaIcon authorPicture={picture ?? "/public/emoji.png"} />
            <div className="flex flex-col pl-[0.625rem]">
              <p className="text-[0.875rem] leading-[1.375rem] text-sc-2 dark:text-sc-6">
                {username}
              </p>
              <p className="text-[0.625rem] leading-[1rem] text-sc-3 dark:text-sc-5">
                {formatDatePostFormat(createdAt)}
              </p>
            </div>
          </Link>

          <div className="hidden w-[20rem] xl:flex">
            <SocialStatistics socialCounts={socialCounts} />
          </div>
        </div>
        <div className="flex xl:hidden">
          <SocialStatistics socialCounts={socialCounts} />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
