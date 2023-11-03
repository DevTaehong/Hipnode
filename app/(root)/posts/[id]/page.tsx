"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getPostById } from "@/lib/actions/post.action";

import {
  LeftActionBar,
  AuthorDetails,
  PostMainContent,
  Profile,
  MoreInformation,
} from "@/components/posts/open-post-page";
import { ExtendedPost } from "@/types/models";

const PostPage = () => {
  const [currentPost, setCurrentPost] = useState<ExtendedPost | null>(null);
  const { id } = useParams();

  const fetchCurrentPost = async () => {
    const currentPost = await getPostById(Number(id));

    setCurrentPost(currentPost);
  };

  useEffect(() => {
    fetchCurrentPost();
  }, [id]);

  if (!currentPost) return null;

  const { author, createdAt, heading, content, image, tags } = currentPost;

  return (
    <main className="flex h-screen justify-center bg-light-2 px-[1.25rem]  pt-[1.25rem] dark:bg-dark-2">
      <div className="mx-auto flex h-full max-w-[85rem] flex-col lg:flex-row">
        <div className="order-2 flex flex-col gap-[1.25rem] lg:order-1">
          <LeftActionBar />
          <AuthorDetails username={author.username} createdAt={createdAt} />
        </div>
        <div className="order-1 pb-[1.25rem] lg:order-2 lg:mx-[1.25rem]">
          <PostMainContent
            imageSrc={image}
            heading={heading}
            content={content}
            tags={tags}
          />
        </div>
        <div className="order-3 flex flex-col gap-[1.25rem] lg:order-3">
          <Profile username={author.username} image={image} />
          <MoreInformation username={author.username} />
        </div>
      </div>
    </main>
  );
};

export default PostPage;
