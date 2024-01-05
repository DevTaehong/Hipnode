"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

import {
  deleteCommentOrReply,
  toggleLikeComment,
} from "@/lib/actions/post.action";
import {
  AvatarJoinLine,
  AvatarJoinStraight,
  CommentActions,
  CommentHeader,
} from ".";
import CommentForm from "./CommentForm";
import { getRepliesToComments as getReplies } from "@/utils/index";
import { CommentAuthorProps } from "@/types/posts";

import { Record } from "@prisma/client/runtime/library";
import ChildComments from "./ChildComments";

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
  const [isLiked, setIsLiked] = useState(likedByCurrentUser);
  const [totalLikes, setTotalLikes] = useState(likeCount);
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

  const renderCommentForm = (isReplying: boolean, isEditing: boolean) => {
    return (
      <CommentForm
        parentId={String(id)}
        isReplying={isReplying}
        isEditing={isEditing}
        commentId={String(id)}
        value={isEditing ? content : ""}
        setIsReplying={setIsReplying}
        setIsEditing={setIsEditing}
        postId={postId}
        postHeading={postHeading}
      />
    );
  };

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
            <div className="flex flex-wrap text-base leading-6 text-sc-3">
              {content}
            </div>
            {isReplying && renderCommentForm(true, false)}
            {isEditing && renderCommentForm(false, true)}
          </div>

          {isDeleting || isEditing ? (
            <div className="flex justify-between text-sc-3 dark:text-white">
              <p>{isDeleting ? "Deleting..." : "Editing..."}</p>
              <p
                className="cursor-pointer pr-[0.5rem]"
                onClick={() => setIsEditing(false)}
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
        <ChildComments
          childComments={childComments}
          depth={depth}
          isLastComment={isLastComment}
          postComments={postComments}
          postHeading={postHeading}
        />
      )}
    </>
  );
};

export default Comment;
