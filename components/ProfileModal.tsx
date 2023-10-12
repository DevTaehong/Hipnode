import React from 'react';
import Image from 'next/image';

const ProfileModal = () => {
  return (
    <div className="flex flex-col items-center bg-red-800">
      <div className="h-[6.625rem] w-[22.188rem] ">
        <Image
          src="/profile-modal-header-bg.png"
          alt="header-bg"
          width={355}
          height={106}
        />
      </div>
      <div className="flex h-[8.125rem] w-[8.125rem] items-center justify-center rounded-full border-[0.19rem] border-dark-3 bg-yellow-30">
        <Image src="/emoji_2.png" alt="emoji" width={100} height={100} />
      </div>
    </div>
  );
};

export default ProfileModal;
