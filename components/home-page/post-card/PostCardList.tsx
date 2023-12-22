"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSearchParams, usePathname } from "next/navigation";

import {
  getAllPosts,
  getAllPostsByUserId,
  getAllPostsByTagName,
  getAllPostsByTagNameByUserId,
} from "@/lib/actions/post.action";
import { ExtendedPrismaPost } from "@/types/posts";
import { PostCard } from ".";
import OutlineIcon from "@/components/icons/outline-icons";
import { PostCardListProps } from "@/types/homepage";
import CustomButton from "@/components/CustomButton";
import Spinner from "@/components/Spinner";

const PostCardList = ({ posts, authorId }: PostCardListProps) => {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");
  const [postData, setPostData] = useState<ExtendedPrismaPost[]>(posts);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [amountToSkip, setAmountToSkip] = useState<number>(10);
  const [tagged, setTagged] = useState("");
  const { ref, inView } = useInView();

  const path = usePathname();

  useEffect(() => {
    (async () => {
      if (tagged && authorId && path === "/profile/profile") {
        setPostData([]);
        const posts = await getAllPostsByTagNameByUserId({
          tagName: tagged,
          authorId,
        });
        setPostData(posts);
      }
    })();
  }, [tagged]);

  const loadMoreData = async () => {
    setIsLoading(true);
    let posts: ExtendedPrismaPost[] = [];
    try {
      if (!tag) {
        posts = authorId
          ? await getAllPostsByUserId({
              numberToSkip: amountToSkip,
              authorId,
            })
          : await getAllPosts({ numberToSkip: amountToSkip });
      }

      if (tag) {
        posts = await getAllPostsByTagName({ tagName: tag });
      }

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
        <PostCard post={post} key={post.id} setTagged={setTagged} />
      ))}
      <div ref={ref} className="hidden items-center justify-center p-4 lg:flex">
        {isLoading && (
          <div className="flex h-full w-full flex-col items-center justify-center pt-12">
            <p className="mb-8 animate-pulse font-bold text-red-80">
              Loading your content...
            </p>
            <Spinner />
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
              <span className="pr-4">See more posts</span>{" "}
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
