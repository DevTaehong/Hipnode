"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

import {
  StraightLine,
  CurveLine,
} from "@/components/icons/outline-icons/LineIcons";
import {
  deleteCommentOrReply,
  toggleLikeComment,
} from "@/lib/actions/post.action";
import { CommentActions, CommentHeader } from ".";
import CommentForm from "./CommentForm";
import { getRepliesToComments as getReplies } from "@/utils/index";
import { CommentAuthorProps } from "@/types/posts";

import { Record } from "@prisma/client/runtime/library";

const Comment = ({
  content,
  createdAt,
  isEdited,
  author,
  id,
  postId,
  likedByCurrentUser,
  likeCount,
  userId,
  depth = 0,
  isLastComment,
  postComments,
  postHeading,
}: CommentAuthorProps & {
  postComments: Record<string, CommentAuthorProps[]>;
}) => {
  const [showChildren, setShowChildren] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [isLiked, setIsLiked] = useState<boolean>(likedByCurrentUser);
  const [totalLikes, setTotalLikes] = useState<number>(likeCount);
  const path = usePathname();
  const canReply = depth < 1;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteCommentOrReply(id, path);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
    setIsDeleting(false);
  };

  const toggleLikeHandler = async () => {
    if (!userId) return;
    setIsLiked((previous) => !previous);
    setTotalLikes((previous) => (isLiked ? previous - 1 : previous + 1));
    try {
      await toggleLikeComment(id, author?.id, postHeading, path);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const getRepliesToComments = (parentId: string) =>
    getReplies(postComments, parentId);

  const childComments = getRepliesToComments(String(id)) ?? [];

  return (
    <>
      <section className="flex py-[1.25rem] pr-[1.25rem]">
        <div className="flex flex-col">
          <div className="flex items-start justify-center px-[1.25rem]">
            <div className="h-10 w-10">
              <Image
                src={author?.picture ?? "/images/default-avatar.png"}
                alt="comment author image"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
          </div>
          {childComments.length > 0 && !showChildren && <AvatarJoinLine />}
        </div>
        <div className="grow">
          {depth > 0 && !isLastComment && <AvatarJoinStraight />}
        </div>
        <div className="flex w-full flex-col gap-[1rem]">
          <div className="flex grow flex-col rounded-2xl border border-solid border-sc-5 p-[0.938rem]">
            <CommentHeader
              username={author?.username ?? "The Unknown Soldier"}
              createdAt={createdAt}
              isEdited={isEdited}
              totalLikes={totalLikes}
            />
            <div className="flex flex-wrap text-[1rem] leading-[1.5rem] text-sc-3">
              {content}
            </div>

            {isReplying && (
              <CommentForm
                parentId={String(id)}
                isReplying={true}
                setIsReplying={setIsReplying}
                setIsEditing={setIsEditing}
                postId={postId}
                postHeading={postHeading}
              />
            )}
            {isEditing && (
              <CommentForm
                parentId={String(id)}
                value={content}
                isEditing={true}
                commentId={String(id)}
                setIsReplying={setIsReplying}
                setIsEditing={setIsEditing}
                postId={postId}
                postHeading={postHeading}
              />
            )}
          </div>

          {isDeleting || isEditing ? (
            <div className="flex justify-between text-sc-3 dark:text-white">
              {isDeleting ? "Deleting..." : "Editing..."}
              <p
                className="cursor-pointer pr-[0.5rem]"
                onClick={() => setIsEditing(!isEditing)}
              >
                Cancel edit
              </p>
            </div>
          ) : (
            <CommentActions
              userId={userId}
              authorId={author?.id}
              canReply={canReply}
              isReplying={isReplying}
              hasChildComments={childComments.length > 0}
              onReplyClick={() => setIsReplying((previous) => !previous)}
              onDeleteClick={handleDelete}
              onEditClick={() => setIsEditing((previous) => !previous)}
              onShowChildrenClick={() =>
                setShowChildren((previous) => !previous)
              }
              showChildren={showChildren}
              onToggleLike={toggleLikeHandler}
              isLiked={isLiked}
            />
          )}
        </div>
      </section>

      {childComments.length > 0 && !showChildren && (
        <div className="flex grow flex-col pl-[2.25rem]">
          {childComments.map((comment, index) => (
            <div key={comment.id} className="mt-2 flex flex-col">
              <Comment
                {...comment}
                depth={depth + 1}
                isLastComment={index === childComments.length - 1}
                postComments={postComments}
                postHeading={postHeading}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Comment;

const AvatarJoinLine = () => (
  <div className="relative flex h-full flex-col items-center">
    <StraightLine className="h-full w-10 grow basis-0" />
    <StraightLine className="absolute h-full w-10 grow basis-0 translate-y-[3.2rem]" />
    <div className="flex translate-y-[4.45rem]">
      <div className="w-10">
        <CurveLine />
      </div>
    </div>
  </div>
);

const AvatarJoinStraight = () => (
  <div className="relative z-20 flex h-full flex-col items-center">
    <StraightLine className="absolute h-full w-10 translate-x-[-2.55rem] translate-y-[2.5rem]" />
    <StraightLine className="absolute h-full w-10 translate-x-[-2.55rem] translate-y-[3rem]" />
  </div>
);
