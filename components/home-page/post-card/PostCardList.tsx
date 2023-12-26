"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSearchParams, usePathname } from "next/navigation";

import {
  getAllPosts,
  getAllPostsByUserId,
  getAllPostsByTagName,
  getAllPostsByTagNameByUserId,
  getMostPopularPosts,
  getPostsByFollowing,
} from "@/lib/actions/post.action";
import { ExtendedPrismaPost } from "@/types/posts";
import { PostCard } from ".";
import OutlineIcon from "@/components/icons/outline-icons";
import { PostCardListProps } from "@/types/homepage";
import CustomButton from "@/components/CustomButton";
import Spinner from "@/components/Spinner";
import LoaderComponent from "@/components/onboarding-components/LoaderComponent";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const PostCardList = ({ posts, authorId }: PostCardListProps) => {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");
  const filter = searchParams.get("filter");

  const [postData, setPostData] = useState<ExtendedPrismaPost[]>(posts);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [amountToSkip, setAmountToSkip] = useState<number>(10);
  const [tagged, setTagged] = useState("");
  const [tagChanged, setTagChanged] = useState<boolean>(false);
  const [filterChanged, setFilterChanged] = useState<boolean>(false);
  const { ref, inView } = useInView();

  const path = usePathname();

  useEffect(() => {
    (async () => {
      if (tag && path === "/") {
        if (tagChanged) {
          setPostData([]);
        }
        const posts = await getAllPostsByTagName({ tagName: tag });
        setPostData(posts);
        setTagChanged(false);
      }
    })();
  }, [tag, authorId]);

  useEffect(() => {
    (async () => {
      let posts;
      if (filter && path === "/") {
        if (filterChanged) {
          setPostData([]);
          setAmountToSkip(10);
        }

        switch (filter) {
          case "popular":
            posts = await getMostPopularPosts({});
            break;
          case "newest":
            posts = await getAllPosts({});
            break;
          case "following":
            posts = await getPostsByFollowing({});
            break;
          default:
            posts = await getAllPosts({});
            break;
        }

        setPostData(posts);
        setFilterChanged(false);
      }
    })();
  }, [filter, path]);

  useEffect(() => {
    (async () => {
      if (tagged && authorId) {
        setPostData([]);
        const posts = await getAllPostsByTagNameByUserId({
          tagName: tagged,
          authorId,
        });
        setPostData(posts);
        setTagChanged(false);
      }
    })();
  }, [tagged]);

  const loadMoreData = async () => {
    setIsLoading(true);
    let posts: ExtendedPrismaPost[] = [];
    try {
      if (!tag && !filter) {
        posts = authorId
          ? await getAllPostsByUserId({
              numberToSkip: amountToSkip,
              authorId,
            })
          : await getAllPosts({ numberToSkip: amountToSkip });
      }

      if (tag) {
        posts = await getAllPostsByTagName({ tagName: tag });
        setTagChanged(true);
      }

      if (filter) {
        switch (filter) {
          case "popular":
            posts = await getMostPopularPosts({ numberToSkip: amountToSkip });
            setFilterChanged(true);
            break;
          case "newest":
            posts = await getAllPosts({ numberToSkip: amountToSkip });
            setFilterChanged(true);
            break;
          case "following":
            posts = await getPostsByFollowing({ numberToSkip: amountToSkip });
            setFilterChanged(true);
            break;
          default:
            posts = await getAllPosts({ numberToSkip: amountToSkip });
            break;
        }
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
      {postData.length === 0 && (
        <div className="flex h-full justify-center pt-40">
          <LoaderComponent />
        </div>
      )}
      {postData.map((post, index) => {
        const adjustedIndex = index % 10;
        return (
          <motion.div
            key={post.id}
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{
              delay: adjustedIndex * 0.1,
              ease: "easeInOut",
              duration: 0.5,
            }}
            viewport={{ amount: 0 }}
          >
            <PostCard
              post={post}
              setTagged={setTagged}
              userIdFromParams={authorId}
            />
          </motion.div>
        );
      })}
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
      {hasSeenAllPosts && postData.length > 0 && (
        <div className="text-center text-dark-3 dark:text-white">
          You have seen all the available posts.
        </div>
      )}
    </main>
  );
};

export default PostCardList;
