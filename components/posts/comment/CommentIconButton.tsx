import { CommentIconButtonProps } from "@/types/posts";
import { cn } from "@/lib/utils";

const CommentIconButton = ({
  Icon,
  isActive,
  color,
  children,
  ...props
}: CommentIconButtonProps) => {
  return (
    <div className={cn(isActive && "bg-red-60", color)} {...props}>
      <span className={`${children ? "mr-1" : ""} size-[20px] `}>
        <Icon />
      </span>
      {children}
    </div>
  );
};

export default CommentIconButton;
