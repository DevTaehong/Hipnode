"use client";

import { useUser } from "@clerk/nextjs";

import { devInfo } from "@/constants";
import RightColumnWrapper from "./RightColumnWrapper";
import DevelopmentInformation from "./DevelopmentInformation";
import MoreInformationItemSkeleton from "@/components/Skeleton/MoreInformationItemSkeleton";

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
        <DevelopmentInformation devInfo={devInfo} />
      </div>
    </RightColumnWrapper>
  );
};

export default MoreInformation;
