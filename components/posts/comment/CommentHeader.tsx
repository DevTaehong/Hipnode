import { formatDateShort } from "@/utils";
import { CommentHeaderProps } from "@/types/posts";

const CommentHeader = ({
  username,
  createdAt,
  isEdited,
}: CommentHeaderProps) => (
  <div className="mb-[1.25rem] flex flex-col sm:flex-row">
    <div className="overflow-hidden">
      <p className="truncate pr-2 text-base font-bold leading-5 text-sc-2 dark:text-light-2">
        {username}
      </p>
    </div>
    <div className="flex flex-row">
      <span className="mt-1 flex flex-row text-[0.875rem] leading-[1.375rem] text-sc-2 dark:text-light-2 sm:mt-0">
        <span className="hidden px-2 sm:flex">•</span>
        {formatDateShort(createdAt)}
        <div className="px-2">•</div>
      </span>
      {isEdited && (
        <p className="mt-1 text-[1rem] leading-[1.5rem] text-sc-2 dark:text-light-2 sm:mt-0">
          Edited
        </p>
      )}
    </div>
  </div>
);

export default CommentHeader;
