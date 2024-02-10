"use client";

import { useState } from "react";

import { followUser } from "@/lib/actions/post.action";
import ProfileLiveChat from "./ProfileLiveChat";
import { BaseUserInfo } from "@/types/profile.index";

const ProfileBtns = ({
  userInfo,
  isFollowing,
}: {
  userInfo: BaseUserInfo;
  isFollowing: boolean;
}) => {
  const [following, setFollowing] = useState(isFollowing);

  const handleFollow = async () => {
    const followStatus = await followUser(userInfo.id);
    setFollowing(followStatus);
  };

  return (
    <div className="mt-5 flex h-10 w-full items-center justify-center gap-2.5">
      <button
        className={`${following ? "border border-blue-20 bg-transparent text-sc-3" : "bg-blue text-light"} hover-effect flex size-full items-center justify-center rounded-lg text-base font-semibold leading-6`}
        type="button"
        onClick={handleFollow}
      >
        {following ? "Following" : "Follow"}
      </button>

      <ProfileLiveChat userInfo={userInfo} />
    </div>
  );
};

export default ProfileBtns;
