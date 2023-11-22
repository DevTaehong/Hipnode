"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import DOMPurify from "isomorphic-dompurify";
import { useAuth } from "@clerk/nextjs";

import {
  PostImage,
  PostText,
  SocialMediaIcon,
  PostLabels,
  CardFooterDesktop,
  SocialStatistics,
} from ".";
import FillIcon from "../../icons/fill-icons";
import { PostCardProps, SocialCountTuple } from "@/types/homepage";

import { getUserByClerkId } from "@/lib/actions/user.actions";

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
    likes,
  },
}: PostCardProps) => {
  const [htmlString, setHtmlString] = useState("");
  const [currentUserId, setCurrentUserId] = useState<number>(0);
  const { isLoaded, userId: clerkId } = useAuth();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!clerkId) return;
      const user = await getUserByClerkId(clerkId);
      if (user) setCurrentUserId(user?.id);
    };
    if (clerkId && isLoaded) {
      fetchCurrentUser();
    }
  }, [clerkId]);

  const userHasLikedPost = (
    userId: number,
    postLikes: { userId: number }[]
  ): boolean => {
    return postLikes.some((like) => like.userId === userId);
  };

  const hasLiked = userHasLikedPost(currentUserId, likes);
  const heartIconClass = hasLiked ? "fill-red" : "fill-sc-5";

  const socialCounts: SocialCountTuple[] = [
    ["views", viewCount],
    ["likes", likesCount],
    ["comments", commentsCount],
  ];

  useEffect(() => {
    const sanitizedHtml = DOMPurify.sanitize(content);
    setHtmlString(sanitizedHtml);
  }, [content]);

  return (
    <article className="px-[1.25rem] lg:px-[0]">
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
                <FillIcon.Heart
                  className={`hidden md:flex ${heartIconClass}`}
                />
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
    </article>
  );
};

export default PostCard;
