"use client";

import SocialIcon from "./SocialIcon";
import Link from "next/link";
import OutlineIcon from "../icons/outline-icons";

import { EditSocialsProps } from "@/types/profile.index";

const EditSocials = ({
  website,
  twitter,
  instagram,
  facebook,
  isLoggedInUser,
}: EditSocialsProps) => {
  return (
    <>
      <div className="mt-5 flex flex-wrap justify-center gap-5 md:flex-col">
        {website && (
          <div className="flex items-center gap-2">
            <OutlineIcon.Web className="fill-sc-2 dark:fill-light-2" />

            <Link
              href={website}
              className={`line-clamp-1 w-full cursor-pointer text-center text-base font-semibold leading-6 text-sc-2 dark:text-sc-6`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {website}
            </Link>
          </div>
        )}

        <div className="flex justify-center gap-5">
          {twitter && <SocialIcon icon="Twitter" link={twitter} />}

          {instagram && <SocialIcon icon="Instagram" link={instagram} />}

          {facebook && <SocialIcon icon="Facebook" link={facebook} />}
        </div>
      </div>

      {isLoggedInUser && (
        <button className="mt-5 rounded-lg bg-blue px-2 py-1 font-semibold leading-6 text-white hover:bg-blue/80">
          Edit Socials
        </button>
      )}
    </>
  );
};

export default EditSocials;
