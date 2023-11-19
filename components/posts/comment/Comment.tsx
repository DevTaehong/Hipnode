"use client";

import { useState } from "react";
import { usePathname, useParams } from "next/navigation";
import Image from "next/image";

import { CommentProps } from "@/types/posts";
import CommentList from "./CommentList";
import { useCreatePostStore } from "@/app/lexicalStore";
import {
  StraightLine,
  CurveLine,
} from "@/components/icons/outline-icons/LineIcons";
import { deleteCommentOrReply } from "@/lib/actions/post.action";
import { CommentHeader, CommentActions } from ".";
import CommentForm from "./CommentForm";
import { getRepliesToComments as getReplies } from "@/utils/index";

const Comment = ({
  content,
  createdAt,
  isEdited,
  author: { picture, username },
  id,
}: CommentProps) => {
  const [showChildren, setShowChildren] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const { commentsByParentId } = useCreatePostStore();

  const path = usePathname();
  const params = useParams();
  const postId = +params.id;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteCommentOrReply(id, path);
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
          <div className="flex items-start justify-center px-[1.25rem]">
            <div className="h-10 w-10">
              <Image
                src={picture}
                alt="comment author image"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
          </div>
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
                isReplying={true}
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
              isReplying={isReplying}
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
