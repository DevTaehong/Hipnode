import ActionPopover from "./ActionPopover";

interface CommentActionPopoverProps {
  onEditClick: () => void;
  onDeleteClick: () => void;
  label: string;
}

const CommentActionPopover = ({
  onEditClick,
  onDeleteClick,
  label,
}: CommentActionPopoverProps) => {
  return (
    <ActionPopover
      onEditClick={onEditClick}
      deletePost={onDeleteClick}
      label={label}
    />
  );
};

export default CommentActionPopover;
