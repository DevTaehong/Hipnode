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
  },
  userId,
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

  if (!userId) return null;
  const hasLiked = userHasLikedComment(userId, comments);
  const heartIconClass = hasLiked ? "fill-red-80" : "fill-sc-5";

  return (
    <Link href={`/posts/post/${id}`}>
      <div className="flex rounded-xl bg-light p-[1.25rem] dark:bg-dark-3">
        <PostImage postImage={image} />
        <div className="ml-[0.875rem] flex grow flex-col justify-between">
          <div className="flex justify-between">
            <PostText postContent={htmlString} />
            <div className="flex flex-row">
              <div className="flex md:hidden">
                <SocialMediaIcon
                  authorPicture={picture ?? "/public/emoji.png"}
                />
              </div>
              <FillIcon.Heart className={`hidden md:flex ${heartIconClass}`} />
            </div>
          </div>
          <PostLabels tags={tags} />
          <section className="hidden items-center justify-between md:flex">
            <div className="flex items-center">
              <SocialMediaIcon authorPicture={picture ?? "/public/emoji.png"} />
              <div className="flex flex-col pl-[0.625rem]">
                <p className="text-[0.875rem] leading-[1.375rem] text-sc-2 dark:text-sc-6">
                  {username}
                </p>
                <p className="text-[0.625rem] leading-[1rem] text-sc-3 dark:text-sc-5">
                  {formatDatePostFormat(createdAt)}
                </p>
              </div>
            </div>
            <div>
              <SocialStatistics socialCounts={socialCounts} />
            </div>
          </section>
          <div className="flex">
            <SocialStatistics socialCounts={socialCounts} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
