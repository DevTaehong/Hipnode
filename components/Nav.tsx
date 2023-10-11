'use client';

import { HipnodeIcon } from './icons/outline-icons';
import ThemeToggle from '@/context/ThemeToggle';

const Nav = () => {
  return (
    <div className="bg-light dark:bg-dark-2 flex h-14 w-full items-center justify-between px-10">
      <HipnodeIcon />
      <ThemeToggle />
    </div>
  );
};

export default Nav;
