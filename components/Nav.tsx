'use client';

import React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { useTheme } from '@/context/ThemeProvider';
import { HipnodeIcon } from './icons/outline-icons';
import ActionButtons from './action-buttons/ActionButtons';
import CustomButton from './CustomButton';

const Nav = () => {
  const { mode, setMode } = useTheme();
  const pathname = usePathname();

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('theme', newMode);
  };

  return (
    <>
      <div className="flex  h-14 w-full items-center justify-between bg-light px-10 dark:bg-dark-2">
        <HipnodeIcon />
        <button
          className="mr-6 flex h-6 w-6 items-center justify-center"
          onClick={toggleTheme}
          aria-label="Toggle Theme"
        >
          {mode === 'light' ? (
            <Image
              src="/assets/icons/sun.svg"
              alt="sun"
              width={20}
              height={20}
            />
          ) : (
            <Image
              src="/assets/icons/moon.svg"
              alt="moon"
              width={20}
              height={20}
            />
          )}
        </button>
      </div>
      <ActionButtons currentPath={pathname} />
      <div className="flex justify-center gap-4">
        <CustomButton
          className="bg-sc-6 text-sc-2 dark:bg-dark-4 dark:text-sc-6"
          label="Advertising"
        />
        <CustomButton
          className="bg-dark-4 text-sc-6 dark:bg-sc-6 dark:text-sc-2"
          label="Advertising"
        />
        <CustomButton label="Advertising" />
      </div>
    </>
  );
};

export default Nav;
