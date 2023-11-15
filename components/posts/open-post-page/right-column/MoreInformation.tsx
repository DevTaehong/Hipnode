"use client";

import { useUser } from "@clerk/nextjs";

import { devInfo } from "@/constants";
import RightColumnWrapper from "./RightColumnWrapper";
import DevelopmentInfo from "./DevelopmentInformation";

const MoreInformation = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return <MoreInformationItemSkeleton />;
  }

  const { username } = user;

  return (
    <RightColumnWrapper>
      <h2 className="text-[1.125rem] leading-[1.625rem] text-sc-2 dark:text-light-2">
        More from {username}
      </h2>

      <div className="flex flex-col items-start">
        <DevelopmentInfo devInfo={devInfo} />
      </div>
    </RightColumnWrapper>
  );
};

export default MoreInformation;

const MoreInformationItemSkeleton = () => {
  return (
    <RightColumnWrapper>
      <div className="mb-[1.25rem] h-2 w-full animate-pulse rounded bg-gray-200" />
      <div className="mb-[1.25rem] h-2 w-full animate-pulse rounded bg-gray-200" />
      <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
    </RightColumnWrapper>
  );
};
