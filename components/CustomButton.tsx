import { CustomButtonProps } from '@/types';

const CustomButton = ({
  label,
  onClick,
  className = '',
  disabled = false,
  type = 'button',
}: CustomButtonProps) => {
  const baseStyles =
    'flex rounded-[8px] bg-red-80 p-4 text-[1.125rem] font-semibold leading-[1.625rem] text-sc-6';

  return (
    <button
      type={type}
      className={className || baseStyles}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default CustomButton;
