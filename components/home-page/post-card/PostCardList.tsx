"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { getAllPosts } from "@/lib/actions/post.action";
import { ExtendedPost } from "@/types/posts";
import { PostCard } from ".";
import OutlineIcon from "@/components/icons/outline-icons";
import { PostCardListProps } from "@/types/homepage";
import CustomButton from "@/components/CustomButton";

const PostCardList = ({ posts }: PostCardListProps) => {
  const [postData, setPostData] = useState<ExtendedPost[]>(posts);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [amountToSkip, setAmountAmountToSkip] = useState<number>(10);
  const { ref, inView } = useInView();

  const loadMoreData = async () => {
    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const posts = await getAllPosts({ numberToSkip: amountToSkip });
      if (posts?.length) {
        setAmountAmountToSkip((previous) => previous + 10);
        setPage(nextPage);
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
      <CustomButton
        className="dark:text-light-2 lg:hidden"
        type="button"
        onClick={() => setLoadMore(true)}
        label={
          <div className="flex items-center justify-center">
            <span className="pr-4">See more podcasts</span>{" "}
            <OutlineIcon.ArrowRight />
          </div>
        }
      />
    </main>
  );
};

export default PostCardList;
