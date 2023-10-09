import Link from 'next/link';

import { useTheme } from '@/context/ThemeProvider';

interface ActionButtonProps {
  label: string;
  href: string;
  currentPath?: string;
}

const ActionButton = ({ label, href, currentPath }: ActionButtonProps) => {
  const { mode } = useTheme();
  const isActive = currentPath === href;

  const variant = `${mode}-${isActive ? 'active' : 'inactive'}`;
  const baseStyles =
    'rounded-3xl px-5 py-2 text-[1.125rem] font-semibold leading-[1.625rem] text-light';

  const colorVariant = (() => {
    switch (variant) {
      case 'dark-active':
      case 'light-active':
        return 'bg-red-80';
      case 'dark-inactive':
        return 'bg-dark-3';
      case 'light-inactive':
        return 'bg-light !text-sc-3';
      default:
        return '';
    }
  })();

  return (
    <button type="button" className={`${colorVariant} ${baseStyles}`}>
      <Link href={href} passHref>
        <p className="min-w-[5.125rem]">{label}</p>
      </Link>
    </button>
  );
};

export default ActionButton;
