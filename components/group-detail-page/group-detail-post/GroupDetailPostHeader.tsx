import Link from "next/link";

import Tag from "@/components/profile/Tag";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import GroupDetailPostLikeButton from "./GroupDetailPostLikeButton";

const GroupDetailPostHeader = ({
  heading,
  author,
  tags,
  hasUserLiked,
  postId,
}: {
  heading: string;
  author: {
    id: number;
    username: string;
    picture?: string;
  };
  tags: string[];
  hasUserLiked: boolean;
  postId: number;
}) => (
  <div className="flex flex-row items-start justify-between">
    <div className="flex flex-col gap-2.5">
      <Link
        href={`/posts/post/${postId}`}
        className={`semibold-12 lg:semibold-12 xl:semibold-18 md:semibold-18 relative line-clamp-3 text-sc-2 hover:underline dark:text-light-2 lg:line-clamp-2`}
      >
        {heading}
      </Link>
      <div className="flex flex-row gap-2.5">
        {tags?.slice(0, 3).map((tag) => <Tag text={tag} key={tag} />)}
      </div>
    </div>
    <Avatar className="relative flex size-[1.875rem] shrink-0 transition-opacity hover:opacity-80 md:size-10 xl:hidden">
      <Link href={`/profile/${author.username}`}>
        <AvatarImage src={author.picture} alt={`${author.username}'s avatar`} />
        <AvatarFallback>{author.username.charAt(0)}</AvatarFallback>
      </Link>
    </Avatar>
    <GroupDetailPostLikeButton
      authorId={author.id}
      hasUserLiked={hasUserLiked}
      postId={postId}
      postHeading={heading}
    />
  </div>
);
export default GroupDetailPostHeader;
