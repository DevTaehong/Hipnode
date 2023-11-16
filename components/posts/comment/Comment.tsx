"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
// import Image from "next/image";

import { CommentProps } from "@/types/posts";
import {
  CommentHeader,
  CommentActions,
  CommentList,
  AuthorAvatar,
} from "./index";
import { deleteCommentOrReply } from "@/lib/actions/post.action";

import { useCreatePostStore } from "@/app/lexicalStore";
import { getRepliesToComments as getReplies } from "@/utils";
import {
  StraightLine,
  CurveLine,
} from "@/components/icons/outline-icons/LineIcons";
import { CommentForm } from "../post-by-id/main-content";

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

  const extractPostId = (str: string) => {
    const parts = str.split("/");
    const number = parts[3];
    return +number;
  };

  const postId = extractPostId(path);

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
                postId={postId}
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
    <StraightLine className="h-full w-10 grow basis-0" />
    <StraightLine className="absolute h-full w-10 grow basis-0 translate-y-[3.2rem]" />
    <div className="flex translate-y-[4.45rem]">
      <div className="w-10">
        <CurveLine />
      </div>
    </div>
  </div>
);
