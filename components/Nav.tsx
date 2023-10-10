'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { useTheme } from '@/context/ThemeProvider';
import { HipnodeIcon } from './icons/outline-icons';
import ImageUpload from './image-upload/ImageUpload';
import { getBucketUrls } from '@/utils/getBucketURLs';

const Nav = () => {
  const { mode, setMode } = useTheme();
  const [urls, setUrls] = useState<string[]>([]);

  useEffect(() => {
    const fetchBucketUrls = async () => {
      const urlsArray = await getBucketUrls('avatars');
      setUrls(urlsArray);
    };

    fetchBucketUrls();
  }, []);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('theme', newMode);
  };

  return (
    <>
      <div className="flex h-14 w-full items-center justify-between bg-light px-10 dark:bg-dark-2">
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
      <div className="flex justify-center">
        <ImageUpload bucketName="avatars" />
      </div>
      <div className="flex justify-center gap-12 pt-12">
        {urls.slice(1).map((url) => (
          <Image key={url} src={url} alt="avatar" width={100} height={100} />
        ))}
      </div>
    </>
  );
};

export default Nav;
