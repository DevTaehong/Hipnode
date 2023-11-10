import { formatDateShort } from "@/utils";
import { CommentHeaderProps } from "@/types/posts";

const CommentHeader = ({
  username,
  createdAt,
  isEdited,
}: CommentHeaderProps) => (
  <div className="mb-[1.25rem] flex flex-row">
    <p className="pr-[0.625rem] text-[1rem] leading-[1.375rem] text-light">
      {username}
    </p>
    <span className="flex flex-row text-[0.875rem] leading-[1.375rem] text-light">
      <span className="px-2">•</span>
      {formatDateShort(createdAt)}
      <span className="px-2">•</span>
    </span>
    {isEdited && (
      <p className="text-[1rem] leading-[1.5rem] text-sc-3">Edited</p>
    )}
  </div>
);

export default CommentHeader;
