"use client";

import Link from "next/link";

import { Card, CardFooter } from "@/components/ui/card";
import { ExtendedPost } from "@/types/models";
import { Post } from "@prisma/client";
import { formatPostDate } from "@/utils";
import GroupPostHeader from "@/components/group-page/group-post/GroupPostHeader";
import GroupPostContent from "@/components/group-page/group-post/GroupPostContent";

const GroupPost = (post: Post) => {
  const { id, author, group, image, content, createdAt, heading } =
    post as ExtendedPost;

  const date = formatPostDate(createdAt);

  return (
    <Link
      href={`/posts/${id}`}
      className="hover:opacity-80 hover:transition-opacity"
    >
      <Card className="bg-light_dark-3 mb-5 break-inside-avoid text-sc-2 dark:text-light-2 2xl:max-w-[15.5rem]">
        <GroupPostHeader
          authorName={author.name}
          groupName={group.name}
          authorPicture={author.picture}
        />
        <GroupPostContent
          {...{ image, groupName: group.name, heading, content }}
        />
        <CardFooter>
          <p className="regular-12 text-sc-3">{date}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default GroupPost;
