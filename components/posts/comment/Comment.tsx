"use client";

import { useState } from "react";

import { CommentProps } from "@/types/posts";
import CommentForm from "../open-post-page/main-content/CommentForm";
import {
  CommentHeader,
  CommentActions,
  CommentList,
  AuthorAvatar,
} from "./index";
import { deleteCommentOrReply } from "@/lib/actions/post.action";
import { usePathname } from "next/navigation";
import { useCreatePostStore } from "@/app/lexicalStore";
import { getRepliesToComments as getReplies } from "@/utils";

const Comment = ({
  content,
  createdAt,
  isEdited,
  author: { picture, username },
  id,
}: CommentProps) => {
  const [showChildren, setShowChildren] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const { commentsByParentId } = useCreatePostStore();

  const path = usePathname();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteCommentOrReply(id, path);
      setIsDeleting(false);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const getRepliesToComments = (parentId: string | null) =>
    getReplies(commentsByParentId, parentId);

  const childComments = getRepliesToComments(String(id)) ?? [];

  return (
    <>
      <section className="flex py-[1.25rem] pr-[1.25rem]">
        <div className="flex flex-col">
          <AuthorAvatar picture={picture} />
          {childComments.length > 0 && !showChildren && <AvatarJoinLine />}
        </div>
        <div className="flex w-full flex-col gap-[1rem]">
          <div className="flex  grow flex-col rounded-2xl border border-solid border-sc-5 p-[0.938rem]">
            <CommentHeader
              username={username}
              createdAt={createdAt}
              isEdited={isEdited}
            />
            <div className="flex flex-wrap text-[1rem] leading-[1.5rem] text-sc-3">
              {content}
            </div>

            {isReplying && (
              <CommentForm
                parentId={String(id)}
                setIsReplying={setIsReplying}
                setIsEditing={setIsEditing}
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
              />
            )}
          </div>

          {isDeleting || isEditing ? (
            <div className="text-white">
              {isDeleting ? "Deleting..." : "Editing..."}
            </div>
          ) : (
            <CommentActions
              onReplyClick={() => setIsReplying((previous) => !previous)}
              onDeleteClick={handleDelete}
              onEditClick={() => setIsEditing((previous) => !previous)}
              onShowChildrenClick={() =>
                setShowChildren((previous) => !previous)
              }
            />
          )}
        </div>
      </section>

      {childComments.length > 0 && !showChildren && (
        <div className="flex grow flex-col pl-[2.25rem]">
          <CommentList comments={childComments} />
        </div>
      )}
    </>
  );
};

export default Comment;

const AvatarJoinLine = () => (
  <div className="relative flex h-full flex-col items-center">
    <svg className="h-full w-10 grow basis-0">
      <line
        x1="50%"
        y1="0%"
        x2="50%"
        y2="100%"
        strokeWidth="1"
        className="dark:stroke-sc-3"
      />
    </svg>
    <svg className="absolute h-full w-10 grow basis-0 translate-y-[3.2rem]">
      <line
        x1="50%"
        y1="0%"
        x2="50%"
        y2="100%"
        strokeWidth="1"
        className="dark:stroke-sc-3"
      />
    </svg>
    <div className="flex translate-y-[4.45rem]">
      <div className="w-10">
        <svg height="100%" width="100%" viewBox="0 0 100 51">
          <path
            d="M 50 0 Q 50 50, 100 50"
            fill="none"
            strokeWidth="2"
            className="dark:stroke-sc-3"
          />
        </svg>
      </div>
    </div>
  </div>
);
