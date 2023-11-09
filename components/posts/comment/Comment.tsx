import Image from "next/image";

import { CommentProps } from "@/types/posts";
import { usePost } from "@/context/posts-context/PostContext";
import { Reply, Trash, Heart, MoreHorizontal } from "lucide-react";
import CommentIconButton from "./CommentIconButton";
import CommentList from "./CommentList";
import { useState } from "react";
import CommentForm from "../open-post-page/main-content/CommentForm";
import { formatDateShort } from "@/utils";

const Comment = ({
  content,
  createdAt,
  isEdited,
  author: { picture, username },
  id,
}: CommentProps) => {
  const { getRepliesToComments } = usePost();
  const childComments = getRepliesToComments(String(id)) || [];
  const [showChildren, setShowChildren] = useState<boolean>(false);
  const [isReplying, setIsReplying] = useState<boolean>(false);

  return (
    <>
      <section className="flex py-[1.25rem] pr-[1.25rem]">
        <div className="flex items-start justify-center px-[1.25rem]">
          <Image
            src={picture}
            alt="comment author image"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
        <div className="flex grow flex-col rounded-2xl border border-solid border-sc-5 p-[0.938rem]">
          <div className="mb-[1.25rem] flex flex-row">
            <p className="pr-[0.625rem] text-[1rem] leading-[1.375rem] text-light">
              {username}
            </p>
            <span className="flex flex-row text-[0.875rem] leading-[1.375rem] text-light">
              <span className="px-2">•</span>
              {formatDateShort(createdAt)}
              <span className="px-2">•</span>
            </span>
            {isEdited && (
              <p className="text-[1rem] leading-[1.5rem] text-sc-3">Edited</p>
            )}
          </div>
          <div className="flex text-[1rem] leading-[1.5rem] text-sc-3">
            {content}
          </div>
          <div className="flex flex-row justify-start gap-4">
            <CommentIconButton
              Icon={Reply}
              color="text-blue"
              onClick={() => setIsReplying((previous) => !previous)}
            />
            <CommentIconButton Icon={Heart} color="text-red" />
            <CommentIconButton Icon={Trash} color="text-red-80" />
            <CommentIconButton
              Icon={MoreHorizontal}
              color="text-red-80"
              onClick={() => setShowChildren((previous) => !previous)}
            />
          </div>
          {isReplying && <CommentForm parentId={String(id)} />}
        </div>
      </section>

      {childComments.length > 0 && (
        <>
          <div className={`${showChildren ? "hidden" : ""}`}>
            <div className="flex grow flex-col pl-[2.25rem]">
              <CommentList comments={childComments} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Comment;
