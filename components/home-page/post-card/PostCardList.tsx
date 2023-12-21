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
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [amountToSkip, setAmountToSkip] = useState<number>(10);
  const { ref, inView } = useInView();

  const loadMoreData = async () => {
    setIsLoading(true);
    try {
      const posts = await getAllPosts({ numberToSkip: amountToSkip });
      if (posts?.length) {
        setAmountToSkip((prev) => prev + 10);
        setPostData((prevPosts) => [...prevPosts, ...posts]);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const totalPosts =
      postData[postData.length - 1]?.numberOfAvailablePosts || 0;
    const hasMorePosts = postData.length < totalPosts;
    const shouldLoadMore = (inView || loadMore) && hasMorePosts && !isLoading;

    if (shouldLoadMore) {
      loadMoreData();
      setLoadMore(false);
    }
  }, [inView, loadMore, postData, isLoading]);

  const hasSeenAllPosts =
    postData.length >=
    (postData[postData.length - 1]?.numberOfAvailablePosts || 0);

  return (
    <main className="flex h-full max-h-screen w-full flex-col gap-[1.25rem] overflow-y-scroll">
      {postData.map((post) => (
        <PostCard post={post} key={post.id} userId={userId} />
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
