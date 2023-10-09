import { CustomButtonProps } from '@/types';

const CustomButton = ({
  label,
  onClick,
  className,
  disabled = false,
  type = 'button',
}: CustomButtonProps) => {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default CustomButton;
