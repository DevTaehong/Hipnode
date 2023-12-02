"use client";

import Link from "next/link";
import { useState } from "react";

import FillIcon from "@/components/icons/fill-icons";

const GroupPostIcons = ({ id }: { id: number }) => {
  const [like, setLike] = useState(false);

  const handleLike = () => {
    setLike((prev) => !prev);
  };

  return (
    <div className="flex flex-row gap-5">
      {/* // TODO - Connection to DB  */}
      <div
        onClick={handleLike}
        className="relative cursor-pointer hover:opacity-80 hover:transition-opacity"
      >
        <FillIcon.Heart className={`${like ? "fill-red-80" : "fill-sc-5"}`} />
      </div>
      <Link
        href={`/posts/post/${id}`}
        className="relative cursor-pointer hover:opacity-80 hover:transition-opacity"
      >
        <FillIcon.Comment className="fill-sc-5" />
      </Link>
      {/* // TODO - add share functionality */}
      <div className="relative cursor-pointer hover:opacity-80 hover:transition-opacity">
        <FillIcon.Share className="fill-sc-5" />
      </div>
    </div>
  );
};

export default GroupPostIcons;
