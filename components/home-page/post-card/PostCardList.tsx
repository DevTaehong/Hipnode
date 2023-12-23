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
  const { ref, inView } = useInView();

  const path = usePathname();

  useEffect(() => {
    (async () => {
      if (tag && path === "/") {
        if (tagChanged) {
          console.log("we are here");
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
      if (filter && path === "/") {
        setPostData([]);
        let posts;

        switch (filter) {
          case "popular":
            posts = await getMostPopularPosts({ numberToSkip: 0 });
            break;
          case "newest":
            posts = await getAllPosts({ numberToSkip: 0 });
            break;
          case "following":
            posts = await getPostsByFollowing({ numberToSkip: 0 });
            break;
          default:
            posts = await getAllPosts({ numberToSkip: 0 });
            break;
        }

        setPostData(posts);
        setTagChanged(false);
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
      {postData.map((post) => (
        <PostCard
          post={post}
          key={post.id}
          setTagged={setTagged}
          userIdFromParams={authorId}
        />
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
      {hasSeenAllPosts && postData.length > 0 && (
        <div className="text-center text-dark-3 dark:text-white">
          You have seen all the available posts.
        </div>
      )}
    </main>
  );
};

export default PostCardList;
