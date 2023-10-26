"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { getAllPosts } from "@/lib/actions/post.action";
import { ExtendedPost } from "@/types/models";
import { PostCard } from ".";
import { ArrowIcon } from "@/components/icons/outline-icons";

type PostCardListProps = {
  posts: ExtendedPost[];
};

const PostCardList = ({ posts }: PostCardListProps) => {
  const [postData, setPostData] = useState<ExtendedPost[]>(posts);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
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
    if (inView || loadMore) {
      loadMoreData();
    }
    setLoadMore(false);
  }, [inView, loadMore]);

  return (
    <main className="flex h-fit flex-col">
      {postData.map((post) => (
        <section className="pb-[1.25rem]" key={post.id}>
          <PostCard post={post} />
        </section>
      ))}
      <div
        className=" hidden items-center justify-center p-4 lg:flex"
        ref={ref}
      >
        {isLoading && (
          <div className="animate-pulse text-dark-3 dark:text-white">
            Loading...
          </div>
        )}
      </div>
      <button
        className="dark:text-light-2 lg:hidden"
        type="button"
        onClick={() => setLoadMore(true)}
      >
        See more...
      </button>
    </main>
  );
};

export default PostCardList;
