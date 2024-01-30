import Image from "next/image";

import { SocialMediaIconProps } from "@/types/homepage";

const SocialMediaIcon = ({ authorPicture }: SocialMediaIconProps) => (
  <figure className="flex size-[1.875rem] items-center justify-center rounded-full transition-opacity hover:opacity-80 lg:size-[2.5rem]">
    <Image
      src={authorPicture || "/images/emoji_2.png"}
      alt="authors avatar"
      width={50}
      height={50}
      className="rounded-full"
    />
    <figcaption className="sr-only">Social media profile image</figcaption>
  </figure>
);

export default SocialMediaIcon;
