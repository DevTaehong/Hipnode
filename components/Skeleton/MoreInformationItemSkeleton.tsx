import React from "react";
import RightColumnWrapper from "../posts/post-by-id/right-column/RightColumnWrapper";

const MoreInformationItemSkeleton = () => {
  return (
    <RightColumnWrapper>
      <div className="mb-[1.25rem] h-2 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      <div className="mb-[1.25rem] h-2 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
    </RightColumnWrapper>
  );
};

export default MoreInformationItemSkeleton;
