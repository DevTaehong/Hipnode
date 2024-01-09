"use client";

import { useState } from "react";

import { followUser } from "@/lib/actions/post.action";
import FillIcon from "@/components/icons/fill-icons";

const ProfileBtns = ({
  userId,
  isFollowing,
}: {
  userId: number;
  isFollowing: boolean;
}) => {
  const [following, setFollowing] = useState(isFollowing);

  const handleFollow = async () => {
    const followStatus = await followUser(userId);
    setFollowing(followStatus);
  };

  return (
    <div className="mt-5 flex h-10 w-full items-center justify-center gap-2.5">
      <button
        className="flex h-full w-full items-center justify-center rounded-lg bg-blue text-base font-semibold leading-6 text-white"
        type="button"
        onClick={handleFollow}
      >
        {following ? "Following" : "Follow"}
      </button>

      <div
        className="flex h-full cursor-pointer items-center justify-center rounded-lg bg-blue-10 px-2.5 dark:bg-dark-4"
        onClick={() => {}}
      >
        <FillIcon.Message className="fill-blue" />
      </div>
    </div>
  );
};

export default ProfileBtns;
