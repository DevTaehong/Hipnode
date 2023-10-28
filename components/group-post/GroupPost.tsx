"use client";

import Image from "next/image";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import GroupPostIcons from "@/components/group-post/GroupPostIcons";

const GroupPost = () => {
  return (
    <Card className="bg-light_dark-3 mx-5 text-sc-2 dark:text-light-2">
      <CardHeader className="flex flex-row items-center gap-[0.62rem]">
        <Avatar className="h-[2.125rem] w-[2.125rem]">
          <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
          <AvatarFallback>H</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="semibold-12">Looking to Partner Up</p>
          <p className="regular-10">Sayem Ahmed</p>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-[0.62rem]">
        <Image
          className="rounded-[0.65rem]"
          src="/images/group-post.svg"
          width={315}
          height={146}
          alt="Post Image"
        />
        <GroupPostIcons />
        <h6 className="semibold-14 font-feature">
          Meeting Cofounders: 27 places to find them - James Fleischmann
        </h6>
        <p className="regular-12">
          Hoping to meet your cofounder? As a followup to my post about getting
          a techni...
        </p>
      </CardContent>
      <CardFooter>
        <p className="regular-12 text-sc-3">wed, 15 February 2022</p>
      </CardFooter>
    </Card>
  );
};

export default GroupPost;
