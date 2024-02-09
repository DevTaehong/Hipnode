"use client";

import Link from "next/link";
import { useState } from "react";

import FillIcon from "@/components/icons/fill-icons";
import { togglePostLike } from "@/lib/actions/post.action";
import { toast } from "@/components/ui/use-toast";
import GroupPostShareButton from "./GroupPostShareButton";

const GroupPostIcons = ({
  id,
  hasUserLiked,
  authorId,
  postHeading,
}: {
  id: number;
  hasUserLiked: boolean;
  authorId: number;
  postHeading: string;
}) => {
  const [like, setLike] = useState(hasUserLiked);

  const handleLike = async () => {
    setLike((prev) => !prev);
    try {
      await togglePostLike(id, authorId, postHeading);
    } catch (error) {
      toast({
        title: "Failed to like post. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-row items-center gap-5">
      <button
        onClick={handleLike}
        className="relative cursor-pointer hover:opacity-80 hover:transition-opacity"
      >
        <FillIcon.Heart className={`${like ? "fill-red-80" : "fill-sc-5"}`} />
      </button>
      <Link
        href={`/posts/post/${id}`}
        className="relative cursor-pointer hover:opacity-80 hover:transition-opacity"
      >
        <FillIcon.Comment className="fill-sc-5" />
      </Link>
      <GroupPostShareButton id={id} />
    </div>
  );
};

export default GroupPostIcons;
