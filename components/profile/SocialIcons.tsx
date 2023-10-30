import Link from "next/link";

import OutlineIcon from "../icons/outline-icons";
import { SocialIconsProps } from "@/types";

const SocialIcons = ({ socials }: SocialIconsProps) => {
  return (
    <div className="mt-5 flex justify-center gap-5">
      {socials.map((social) => {
        const SocialIcon = OutlineIcon[social.name as keyof typeof OutlineIcon];

        return (
          <Link key={social.name} href={social.link}>
            <SocialIcon className="fill-sc-4 dark:fill-sc-6" />
          </Link>
        );
      })}
    </div>
  );
};

export default SocialIcons;
