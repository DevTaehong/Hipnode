import { Edit, MoreHorizontal } from "lucide-react";

import Heart from "@/components/icons/fill-icons/Heart";
import Reply from "@/components/icons/fill-icons/Reply";
import OutlineIcon from "@/components/icons/outline-icons";
import CommentIconButton from "./CommentIconButton";
import { CommentActionsProps } from "@/types/posts";

const CommentActions = ({
  onToggleLike,
  onToggleReply,
  onDelete,
  onEdit,
  onToggleChildren,
  isLiked,
  isReplying,
}: CommentActionsProps) => {
  return (
    <div className="flex flex-row justify-start gap-4">
      <div onClick={onToggleLike}>
        <Heart className="" isLiked={isLiked} />
      </div>
      <div className="flex items-center justify-center" onClick={onToggleReply}>
        <Reply className="text-red-80" isReplying={isReplying} />
      </div>
      <div className="flex items-center justify-center" onClick={onDelete}>
        <OutlineIcon.Trash className="h-6 w-6" />
      </div>
      <CommentIconButton Icon={Edit} color="text-red-80" onClick={onEdit} />
      <CommentIconButton
        Icon={MoreHorizontal}
        color="text-red-80"
        onClick={onToggleChildren}
      />
    </div>
  );
};

export default CommentActions;
