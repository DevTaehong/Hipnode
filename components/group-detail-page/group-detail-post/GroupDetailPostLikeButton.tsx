"use client";

import { useState } from "react";

import Heart from "@/components/icons/fill-icons/Heart";
import { toast } from "@/components/ui/use-toast";
import { togglePostLike } from "@/lib/actions/post.action";
import Spinner from "@/components/Spinner";

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
  const [isPending, setIsPending] = useState(false);

  const handleLike = async () => {
    setIsPending(true);
    setLike((prev) => !prev);
    try {
      await togglePostLike(postId, authorId, postHeading);
    } catch (error) {
      toast({
        title: "Failed to like post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div
      onClick={handleLike}
      className="relative hidden transition-opacity hover:opacity-80 xl:block"
    >
      {isPending ? (
        <Spinner classNames="low-root w-[1.875rem] h-[1.875rem]" />
      ) : (
        <Heart isLiked={like} />
      )}
    </div>
  );
};

export default GroupDetailPostLikeButton;
