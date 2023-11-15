"use client";

import Image from "next/image";
import { useUser } from "@clerk/nextjs";

import CustomButton from "@/components/CustomButton";
import RightColumnWrapper from "./RightColumnWrapper";
import { howManyMonthsAgo } from "@/utils";

const Profile = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return <ProfileSkeleton />;
  }

  const { username, imageUrl: picture } = user;
  const calculatedDate = howManyMonthsAgo(user?.createdAt);

  return (
    <RightColumnWrapper>
      <div className="mb-[1.25rem] flex  h-[6.25rem] w-[6.25rem] items-center justify-center rounded-full bg-purple-20">
        <Image
          src={picture ?? "/images/emoji_2.png"}
          alt="profile-image"
          height={100}
          width={100}
          className="flex-center h-[5rem] w-[5rem] rounded-full"
        />
      </div>
      <h2 className="flex justify-center text-[1.625rem] leading-[2.375rem] text-sc-2 dark:text-light-2">
        {username}
      </h2>
      <p className="mb-[1.25rem] flex justify-center text-[1rem] leading-[1.5rem] text-sc-3">
        Web Developer
      </p>
      <CustomButton
        label="Follow"
        className="mb-[1.25rem] flex w-full items-center rounded-md bg-blue p-[0.625rem] text-[1.125rem] leading-[1.625rem] text-light"
      />
      <p className="flex justify-center text-[1rem] leading-[1.5rem] text-sc-3">
        {+calculatedDate > 0
          ? `joined ${calculatedDate} months ago`
          : "joined this month"}
      </p>
    </RightColumnWrapper>
  );
};

export default Profile;

const ProfileSkeleton = () => {
  return (
    <RightColumnWrapper>
      <div className="mb-[1.25rem] flex h-[6.25rem] w-[6.25rem] animate-pulse items-center justify-center rounded-full bg-gray-200" />
      <div className="mb-[1.25rem] h-6 w-3/4 animate-pulse rounded bg-gray-200" />
      <div className="mb-[1.25rem] h-4 w-1/2 animate-pulse rounded bg-gray-200" />
      <div className="mb-[1.25rem] h-10 w-full animate-pulse rounded bg-gray-200" />
      <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200" />
    </RightColumnWrapper>
  );
};
