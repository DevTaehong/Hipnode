"use client";

import { Post } from "@prisma/client";
import { useSearchParams } from "next/navigation";

import InfiniteScroll from "@/components/InfiniteScroll";
import GroupDetailPost from "@/components/group-detail-page/group-detail-post/GroupDetailPost";

const FetchGroupDetailPosts = ({
  initialNewPost,
  initialPopularPost,
  fetchNewPost,
  fetchPopularPost,
  groupId,
}: {
  initialNewPost: Post[];
  initialPopularPost: Post[];
  fetchNewPost: (myCursorId?: number, groupId?: number) => Promise<Post[]>;
  fetchPopularPost: (myCursorId?: number, groupId?: number) => Promise<Post[]>;
  groupId: number;
}) => {
  const searchParams = useSearchParams();
  const explore = searchParams.get("posts");

  const fetchData = explore === "Popular" ? fetchPopularPost : fetchNewPost;
  const initialData =
    explore === "Popular" ? initialPopularPost : initialNewPost;

  return (
    <InfiniteScroll
      initialData={initialData}
      fetchData={fetchData}
      renderItem={GroupDetailPost}
      className="flex flex-col gap-5"
      groupId={groupId}
    />
  );
};

export default FetchGroupDetailPosts;
