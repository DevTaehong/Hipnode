"use client";

import { useUser } from "@clerk/nextjs";

import { devInfo } from "@/constants";
import RightColumnWrapper from "./RightColumnWrapper";
import DevelopmentInformation from "./DevelopmentInformation";

const MoreInformation = () => {
  const { user } = useUser();

  return (
    <RightColumnWrapper>
      <h2 className="text-[1.125rem] leading-[1.625rem] text-sc-2 dark:text-light-2">
        More from {user?.username}
      </h2>

      <div className="flex flex-col items-start">
        <DevelopmentInformation devInfo={devInfo} />
      </div>
    </RightColumnWrapper>
  );
};

export default MoreInformation;
