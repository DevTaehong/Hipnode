"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import DOMPurify from "isomorphic-dompurify";

import {
  PostImage,
  PostText,
  SocialMediaIcon,
  PostLabels,
  CardFooterDesktop,
  SocialStatistics,
} from ".";
import FillIcon from "@/components/icons/fill-icons";
import { PostCardProps, SocialCountTuple } from "@/types/homepage";

import { userHasLikedComment } from "@/utils";

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
          <CardFooterDesktop
            authorPicture={picture ?? "/public/emoji.png"}
            username={username}
            createdAt={createdAt}
            socialCounts={socialCounts}
          />
          <div className="flex">
            <SocialStatistics socialCounts={socialCounts} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
