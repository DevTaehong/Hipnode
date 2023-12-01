"use client ";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontal } from "lucide-react";

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
  canReply,
  hasChildComments,
  showChildren,
  onToggleLike,
  isLiked,
}: CommentActionsProps) => {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const handleDeleteClick = () => {
    if (isConfirmingDelete) {
      onDeleteClick();
    } else {
      setIsConfirmingDelete(true);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmingDelete(false);
  };

  return (
    <div className="flex flex-row justify-between">
      <div className="flex items-center justify-start gap-4">
        <div onClick={onToggleLike}>
          <Heart className="" isLiked={isLiked} />
        </div>
        {canReply && (
          <div
            className="flex items-center justify-center"
            onClick={onReplyClick}
          >
            <Reply className="text-sc-3" isReplying={isReplying} />
          </div>
        )}
        <Popover>
          <PopoverTrigger>
            <CommentIconButton Icon={MoreHorizontal} color="text-sc-3" />
          </PopoverTrigger>
          <PopoverContent>
            <section className="flex w-fit translate-x-[6rem] translate-y-[-0.8rem] flex-col rounded-xl border border-solid border-sc-5 bg-light-2 p-[1.25rem] dark:border-dark-3 dark:bg-dark-4 ">
              <div
                onClick={onEditClick}
                className="mb-[0.625rem] flex cursor-pointer flex-row items-center justify-start"
              >
                <div className="fill-light-2">
                  <OutlineIcon.Edit />
                </div>
                <p className="pl-[0.625rem] text-[0.875rem] font-semibold leading-[1.375rem] text-sc-2 dark:text-light-2">
                  Edit Comment
                </p>
              </div>

              <div
                onClick={handleDeleteClick}
                className="flex cursor-pointer items-center justify-start"
              >
                <div className="fill-light-2 dark:fill-dark-4">
                  <OutlineIcon.Trash />
                </div>
                <p
                  className={`pl-[0.625rem] text-[0.875rem] font-semibold leading-[1.375rem] ${
                    isConfirmingDelete ? "text-red" : "text-red-60"
                  } dark:${isConfirmingDelete ? "text-red" : "text-red-60"}`}
                >
                  {isConfirmingDelete ? "Confirm Delete" : "Delete Comment"}
                </p>
              </div>

              {isConfirmingDelete && (
                <div
                  onClick={handleCancelDelete}
                  className="flex cursor-pointer items-center justify-start"
                >
                  <p className="pl-[1.9rem] pt-1 text-[0.875rem] font-semibold leading-[1.375rem] text-blue dark:text-blue">
                    Cancel Delete
                  </p>
                </div>
              )}
            </section>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex pr-[0.5rem]">
        {hasChildComments && (
          <div onClick={onShowChildrenClick}>
            <p className="cursor-pointer text-sc-3">
              {showChildren ? <p>See replies</p> : <p>Hide replies</p>}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default CommentActions;
