"use client";

import { useState } from "react";

import CustomButton from "@/components/CustomButton";
import { followUser } from "@/lib/actions/post.action";
import { FollowingProps } from "@/types/posts";

const Following = ({ authorId, isFollowing, postId }: FollowingProps) => {
  const [following, setFollowing] = useState(isFollowing);

  const handleFollow = async () => {
    const followStatus = await followUser(authorId, `/posts/post/${postId}`);
    setFollowing(followStatus);
  };

  const followingStatus = following ? "Following" : "Follow";

  return (
    <CustomButton
      label={followingStatus}
      className={`hover-effect mb-[1.25rem] flex w-full items-center rounded-md ${followingStatus === "Following" ? "border border-blue-20 bg-transparent text-sc-3" : "bg-blue text-light"} p-[0.625rem] text-[1.125rem] leading-[1.625rem]`}
      onClick={handleFollow}
    />
  );
};

export default Following;
