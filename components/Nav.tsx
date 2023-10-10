'use client';

import { HipnodeIcon } from './icons/outline-icons';
import ThemeToggle from '@/context/ThemeToggle';

const Nav = () => {
  return (
    <div className="flex h-14 w-full items-center justify-between bg-light px-10 dark:bg-dark-2">
      <HipnodeIcon />
      <ThemeToggle />
    </div>
  );
};

export default Nav;
