import Image from "next/image";

import { SocialMediaIconProps } from "@/types/homepage";

const SocialMediaIcon = ({ authorPicture }: SocialMediaIconProps) => (
  <figure className="flex h-[1.874rem] w-[1.875rem] items-center justify-center rounded-full bg-purple-10 p-2">
    <div className="flex h-[1.75rem] w-[1.75rem] items-center justify-center">
      <Image
        src={authorPicture || "/images/emoji_2.png"}
        alt="authors avatar"
        width={50}
        height={50}
        className="rounded-full"
      />
    </div>
    <figcaption className="sr-only">Social media profile image</figcaption>
  </figure>
);

export default SocialMediaIcon;
