import { CustomButtonProps } from '@/types';

const CustomButton = ({
  label,
  onClick,
  className = 'bg-red-80 text-sc-6',
  disabled = false,
  type = 'button',
}: CustomButtonProps) => {
  const baseStyles =
    'flex rounded-[8px] p-4 text-[1.125rem] font-semibold leading-[1.625rem]';

  return (
    <button
      type={type}
      className={`${baseStyles} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default CustomButton;
