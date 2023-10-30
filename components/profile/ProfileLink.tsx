import Image from "next/image";
import Link from "next/link";

import { ProfileLinkProps } from "@/types";

const ProfileLink = ({ id, name, src, link }: ProfileLinkProps) => {
  return (
    <Link key={id} href={link}>
      <Image
        src={src}
        alt="profile"
        width={30}
        height={30}
        className="rounded-full bg-sc-6 dark:border-dark-3"
      />
    </Link>
  );
};

export default ProfileLink;
