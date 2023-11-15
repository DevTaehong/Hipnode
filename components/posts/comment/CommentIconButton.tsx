import { ButtonHTMLAttributes, ComponentType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CommentIconButtonProps = {
  Icon: ComponentType;
  isActive?: boolean;
  color?: string;
  children?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const CommentIconButton = ({
  Icon,
  isActive,
  color,
  children,
  ...props
}: CommentIconButtonProps) => {
  return (
    <button className={cn(isActive && "bg-red-60", color)} {...props}>
      <span className={`${children ? "mr-1" : ""}`}>
        <Icon />
      </span>
      {children}
    </button>
  );
};

export default CommentIconButton;
