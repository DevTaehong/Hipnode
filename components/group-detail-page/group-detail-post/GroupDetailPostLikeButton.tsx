"use client";

import { useState } from "react";

import Heart from "@/components/icons/fill-icons/Heart";
import { toast } from "@/components/ui/use-toast";
import { togglePostLike } from "@/lib/actions/post.action";

const GroupDetailPostLikeButton = ({
  hasUserLiked,
  postId,
  authorId,
  postHeading,
}: {
  hasUserLiked: boolean;
  postId: number;
  authorId: number;
  postHeading: string;
}) => {
  const [like, setLike] = useState(hasUserLiked);

  const handleLike = async () => {
    setLike((prev) => !prev);
    try {
      await togglePostLike(postId, authorId, postHeading);
    } catch (error) {
      toast({
        title: "Failed to like post. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <button
      onClick={handleLike}
      className="relative hidden transition-opacity hover:opacity-80 xl:block"
    >
      <Heart isLiked={like} />
    </button>
  );
};

export default GroupDetailPostLikeButton;
