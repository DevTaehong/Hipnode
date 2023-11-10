import Image from "next/image";

import { AuthorAvatarProps } from "@/types/posts";

const AuthorAvatar = ({ picture }: AuthorAvatarProps) => {
  return (
    <div className="flex items-start justify-center px-[1.25rem]">
      <Image
        src={picture}
        alt="comment author image"
        width={40}
        height={40}
        className="rounded-full"
      />
    </div>
  );
};

export default AuthorAvatar;
