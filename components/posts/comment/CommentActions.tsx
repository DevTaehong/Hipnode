import { Edit, MoreHorizontal } from "lucide-react";
import React from "react";
import CommentIconButton from "./CommentIconButton";
import { CommentActionsProps } from "@/types/posts";
import Heart from "@/components/icons/fill-icons/Heart";
import Reply from "@/components/icons/fill-icons/Reply";
import OutlineIcon from "@/components/icons/outline-icons";

const CommentActions = ({
  onReplyClick,
  onDeleteClick,
  onEditClick,
  onShowChildrenClick,
  isReplying,
}: CommentActionsProps) => (
  <div className="flex flex-row justify-start gap-4">
    <Heart className="" />
    <div className="flex items-center justify-center" onClick={onReplyClick}>
      <Reply className="text-red-80" isReplying={isReplying} />
    </div>
    <div className="flex items-center justify-center" onClick={onDeleteClick}>
      <OutlineIcon.Trash className="h-6 w-6" />
    </div>
    <CommentIconButton Icon={Edit} color="text-red-80" onClick={onEditClick} />
    <CommentIconButton
      Icon={MoreHorizontal}
      color="text-red-80"
      onClick={onShowChildrenClick}
    />
  </div>
);

export default CommentActions;
