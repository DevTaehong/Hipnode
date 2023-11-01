"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import GroupPostIcons from "@/components/group-page/group-post/GroupPostIcons";
import { ExtendedPost } from "@/types/models";
import { Post } from "@prisma/client";

const GroupPost = (post: Post) => {
  const { id, author, group, image, content, createdAt } = post as ExtendedPost;
  const date = new Date(createdAt).toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Link
      href={`/posts/${id}`}
      className="hover:opacity-80 hover:transition-opacity"
    >
      <Card className="bg-light_dark-3 mb-5 break-inside-avoid text-sc-2 dark:text-light-2 2xl:max-w-[15.5rem]">
        <CardHeader className="flex flex-row items-center gap-[0.62rem]">
          <Avatar className="h-[2.125rem] w-[2.125rem]">
            <AvatarImage src={author.picture} alt="avatar" />
            <AvatarFallback>H</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="semibold-12">{group.name}</p>
            <p className="regular-10">{author.name}</p>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-[0.62rem]">
          <Image
            className="w-full rounded-[0.65rem]"
            src={image}
            width={315}
            height={146}
            alt={`Post image from a ${group.name} group`}
          />
          <GroupPostIcons />
          <h6 className="semibold-14 font-feature line-clamp-2">
            {/* // TODO - Change post schema to have title */}
            {content}
          </h6>
          <p className="regular-12">{content}</p>
        </CardContent>
        <CardFooter>
          <p className="regular-12 text-sc-3">{date}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default GroupPost;
