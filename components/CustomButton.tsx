import { CustomButtonProps } from "@/types";
import { cn } from "@/lib/utils";

const baseStyles =
  "flex rounded-[8px] p-4 text-[1.125rem] font-semibold leading-[1.625rem]";

const CustomButton = ({
  label,
  onClick,
  className = "bg-red-80 text-sc-6",
  disabled = false,
  type = "button",
}: CustomButtonProps) => {
  return (
    <button
      type={type}
      className={cn(baseStyles, className)}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default CustomButton;
