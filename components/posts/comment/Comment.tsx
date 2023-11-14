"use client";

import { useState } from "react";

import { CommentProps } from "@/types/posts";
import CommentForm from "../open-post-page/main-content/CommentForm";
import {
  CommentHeader,
  CommentActions,
  CommentContent,
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
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const { commentsByParentId } = useCreatePostStore();

  const path = usePathname();

  const handleDelete = async () => {
    try {
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
        <AuthorAvatar picture={picture} />
        <div className="flex grow flex-col rounded-2xl border border-solid border-sc-5 p-[0.938rem]">
          <CommentHeader
            username={username}
            createdAt={createdAt}
            isEdited={isEdited}
          />
          <CommentContent content={content} />
          <CommentActions
            onReplyClick={() => setIsReplying((previous) => !previous)}
            onDeleteClick={handleDelete}
            onEditClick={() => setIsEditing((previous) => !previous)}
            onShowChildrenClick={() => setShowChildren((previous) => !previous)}
          />
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
