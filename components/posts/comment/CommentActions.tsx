import { Reply, Heart, Trash, Edit, MoreHorizontal } from "lucide-react";
import React from "react";
import CommentIconButton from "./CommentIconButton";
import { CommentActionsProps } from "@/types/posts";

const CommentActions = ({
  onReplyClick,
  onDeleteClick,
  onEditClick,
  onShowChildrenClick,
}: CommentActionsProps) => (
  <div className="flex flex-row justify-start gap-4">
    <CommentIconButton Icon={Reply} color="text-blue" onClick={onReplyClick} />
    <CommentIconButton Icon={Heart} color="text-red" />
    <CommentIconButton
      Icon={Trash}
      color="text-red-80"
      onClick={onDeleteClick}
    />
    <CommentIconButton Icon={Edit} color="text-red-80" onClick={onEditClick} />
    <CommentIconButton
      Icon={MoreHorizontal}
      color="text-red-80"
      onClick={onShowChildrenClick}
    />
  </div>
);

export default CommentActions;
