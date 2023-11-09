import { CommentIconButtonProps } from "@/types/posts";

const CommentIconButton = ({
  Icon,
  isActive,
  color,
  children,
  ...props
}: CommentIconButtonProps) => {
  return (
    <button
      className={`${isActive ? "bg-red-60" : ""} ${color || ""}`}
      {...props}
    >
      <span className={`${children ? "mr-1" : ""}`}>
        <Icon />
      </span>
      {children}
    </button>
  );
};

export default CommentIconButton;
