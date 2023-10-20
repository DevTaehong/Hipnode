"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { getAllPosts } from "@/lib/actions/post.action";
import { ExtendedPost } from "@/types/models";
import { PostCard } from ".";

type PostCardListProps = {
  posts: ExtendedPost[];
};

const PostCardList = ({ posts }: PostCardListProps) => {
  const [postData, setPostData] = useState<ExtendedPost[]>(posts);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const { ref, inView } = useInView();

  const loadMoreData = async () => {
    setIsLoading(true);

    try {
      const next = page + 1;
      const posts = await getAllPosts({ page: next });
      if (posts?.length) {
        setPage(next);
        setPostData((prev: ExtendedPost[]) => [...prev, ...posts]);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (inView) {
      loadMoreData();
    }
  }, [inView]);

  return (
    <main className="">
      {postData.map((post) => (
        <section className="pb-[1.25rem]" key={post.id}>
          <PostCard post={post} />
        </section>
      ))}
      <div className="flex items-center justify-center p-4" ref={ref}>
        {isLoading && (
          <div className="animate-pulse text-dark-3 dark:text-white">
            Loading...
          </div>
        )}
      </div>
    </main>
  );
};

export default PostCardList;
