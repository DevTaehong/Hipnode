"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSearchParams, usePathname } from "next/navigation";

import {
  getAllPosts,
  getAllPostsByTagName,
  getAllPostsByTagNameByUserId,
  getAllPostsByUserId,
  getMostPopularPosts,
  getMostPopularPostsOfDay,
  getPostsByFollowing,
} from "@/lib/actions/post.action";
import { ExtendedPrismaPost } from "@/types/posts";
import OutlineIcon from "@/components/icons/outline-icons";
import { PostCardListProps } from "@/types/homepage";
import CustomButton from "@/components/CustomButton";
import Spinner from "@/components/Spinner";
import LoaderComponent from "@/components/onboarding-components/LoaderComponent";
import PostCardRender from "./PostCardRender";

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
  const [popularPostsForToday, setPopularPostsForToday] = useState(1);
  const { ref, inView } = useInView();

  const path = usePathname();

  useEffect(() => {
    (async () => {
      try {
        if (tag && path === "/") {
          if (tagChanged) {
            setPostData([]);
          }
          const posts = await getAllPostsByTagName({ tagName: tag });
          setPostData(posts);
          setTagChanged(false);
        }
      } catch (error) {
        console.error("Error fetching posts by tag:", error);
      }
    })();
  }, [tag, authorId]);

  useEffect(() => {
    (async () => {
      try {
        let posts;
        if (filter && path === "/") {
          setPostData([]);
          setAmountToSkip(10);

          switch (filter) {
            case "popular":
              posts = await getMostPopularPostsOfDay({});
              setPopularPostsForToday(posts?.length);
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
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    })();
  }, [filter, path]);

  useEffect(() => {
    (async () => {
      try {
        if (tagged && authorId) {
          setPostData([]);
          const posts = await getAllPostsByTagNameByUserId({
            tagName: tagged,
            authorId,
          });
          setPostData(posts);
          setTagChanged(false);
        }
      } catch (error) {
        console.error("An error occurred while fetching posts:", error);
      }
    })();
  }, [tagged, authorId]);

  const loadMoreData = async () => {
    setIsLoading(true);
    let posts: ExtendedPrismaPost[] = [];
    try {
      if (!tag && !filter) {
        posts =
          authorId && path !== "/"
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
            break;
          case "newest":
            posts = await getAllPosts({ numberToSkip: amountToSkip });
            break;
          case "following":
            posts = await getPostsByFollowing({ numberToSkip: amountToSkip });
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
      setLoadMore(false);
    }
  };

  useEffect(() => {
    const totalPosts =
      postData[postData.length - 1]?.numberOfAvailablePosts || 0;
    const hasMorePosts = postData.length < totalPosts;
    const shouldLoadMore = (inView || loadMore) && hasMorePosts && !isLoading;

    if (shouldLoadMore) {
      loadMoreData();
    }
  }, [inView, loadMore, postData, isLoading]);

  const hasSeenAllPosts =
    postData.length >=
    (postData[postData.length - 1]?.numberOfAvailablePosts || 0);

  return (
    <main className="flex size-full max-h-screen flex-col gap-[1.25rem] overflow-y-scroll">
      {filter === "popular" && popularPostsForToday === 0 && (
        <div className="flex animate-pulse flex-col items-center justify-center text-red-80">
          <p>Click any other tag to view posts !</p>
          <p>Make it the most popular post for the day !</p>
        </div>
      )}
      {!postData.length && popularPostsForToday !== 0 && (
        <div className="flex h-full justify-center pt-40">
          <LoaderComponent />
        </div>
      )}
      <PostCardRender
        postData={postData}
        setTagged={setTagged}
        authorId={authorId}
      />
      <div ref={ref} className="hidden items-center justify-center p-4 lg:flex">
        {isLoading && (
          <div className="flex size-full flex-col items-center justify-center pt-5">
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
    </main>
  );
};

export default PostCardList;
