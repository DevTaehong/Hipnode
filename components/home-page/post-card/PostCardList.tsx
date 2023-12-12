"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { getAllPosts } from "@/lib/actions/post.action";
import { ExtendedPrismaPost } from "@/types/posts";
import { PostCard } from ".";
import OutlineIcon from "@/components/icons/outline-icons";
import { PostCardListProps } from "@/types/homepage";
import CustomButton from "@/components/CustomButton";

const PostCardList = ({ posts, userId }: PostCardListProps) => {
  const [postData, setPostData] = useState<ExtendedPrismaPost[]>(posts);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [amountToSkip, setAmountAmountToSkip] = useState<number>(10);
  const { ref, inView } = useInView();

  const loadMoreData = async () => {
    setIsLoading(true);
    try {
      const posts = await getAllPosts({ numberToSkip: amountToSkip });
      if (posts?.length) {
        setAmountAmountToSkip((previous) => previous + 10);
        setPage(page + 1);
        setPostData((prev) => [...prev, ...posts]);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (
      (inView || loadMore) &&
      postData.length < postData[postData.length - 1]?.numberOfAvailablePosts &&
      !isLoading
    ) {
      loadMoreData();
    }
    setLoadMore(false);
  }, [inView, loadMore, postData, isLoading]);

  const hasSeenAllPosts =
    postData.length >= postData[postData.length - 1]?.numberOfAvailablePosts;

  return (
    <main className="flex h-full max-h-screen flex-col gap-[1.25rem] overflow-y-auto">
      {postData.map((post) => (
        <PostCard post={post} userId={userId} key={post.id} />
      ))}
      <div ref={ref} className="hidden items-center justify-center p-4 lg:flex">
        {isLoading && (
          <div className="animate-pulse text-dark-3 dark:text-white">
            Loading...
          </div>
        )}
      </div>
      {!hasSeenAllPosts && (
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
      )}
      {hasSeenAllPosts && (
        <div className="text-center text-dark-3 dark:text-white">
          You have seen all the available posts.
        </div>
      )}
    </main>
  );
};

export default PostCardList;
