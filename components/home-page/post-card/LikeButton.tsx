"use client";

import { useState } from "react";

import { LikeButtonProps } from "@/types/posts";
import Heart from "@/components/icons/fill-icons/Heart";

const LikeButton = ({ toggleLike, hasUserLiked }: LikeButtonProps) => {
  const [like, setLike] = useState(hasUserLiked);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    toggleLike();
    setLike((prev) => !prev);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="mr-2.5 flex transition-opacity hover:opacity-80"
    >
      <Heart
        isLiked={like}
        classNames={`${isAnimating && "animate-heartBeat"} hidden md:flex`}
      />
    </button>
  );
};

export default LikeButton;
