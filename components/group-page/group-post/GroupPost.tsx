"use client";

import Link from "next/link";
import { redirect } from "next/navigation";

import { Card, CardFooter } from "@/components/ui/card";
import { ExtendedPost } from "@/types/models";
import { Post } from "@prisma/client";
import { formatPostDate } from "@/utils";
import GroupPostHeader from "@/components/group-page/group-post/GroupPostHeader";
import GroupPostContent from "@/components/group-page/group-post/GroupPostContent";
import { toast } from "@/components/ui/use-toast";

const GroupPost = (post: Post) => {
  const { id, author, group, image, content, createdAt, heading } =
    post as ExtendedPost;

  if (!group?.id) {
    toast({
      title: "Group does not exist",
      variant: "destructive",
      duration: 9000,
    });
    redirect("/group");
  }

  const date = formatPostDate(createdAt);

  return (
    <article className="relative">
      <Link
        className="absolute left-0 top-0 h-full w-full rounded-2xl border-none hover:shadow-lg hover:transition-shadow"
        href={`/posts/post/${id}`}
      ></Link>
      <Card className="bg-light_dark-3 mb-5 break-inside-avoid text-sc-2 dark:text-light-2 2xl:max-w-[15.5rem]">
        <GroupPostHeader
          author={author}
          groupName={group?.name as string}
          groupId={group?.id}
        />
        <GroupPostContent
          {...{ image, groupName: group?.name as string, heading, content, id }}
        />
        <CardFooter>
          <p className="regular-12 text-sc-3">{date}</p>
        </CardFooter>
      </Card>
    </article>
  );
};

export default GroupPost;
