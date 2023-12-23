"use client";

import React, { useState } from "react";

import CustomButton from "@/components/CustomButton";
import { followUser } from "@/lib/actions/post.action";

const Following = ({ authorId }: { authorId: number }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = async () => {
    const followStatus = await followUser(authorId);
    setIsFollowing(followStatus);
  };

  const followingStatus = isFollowing ? "Following" : "Follow";

  return (
    <CustomButton
      label={followingStatus}
      className="mb-[1.25rem] flex w-full items-center rounded-md bg-blue p-[0.625rem] text-[1.125rem] leading-[1.625rem] text-light"
      onClick={handleFollow}
    />
  );
};

export default Following;
