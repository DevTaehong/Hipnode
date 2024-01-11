"use client";

import { useState } from "react";
import SocialIcon from "./SocialIcon";
import Link from "next/link";
import OutlineIcon from "../icons/outline-icons";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { EditSocialsProps, SocialLinkProps } from "@/types/profile.index";

export const socialNames = [
  { field: "website", icon: <OutlineIcon.Website /> },
  { field: "twitter", icon: <OutlineIcon.Twitter /> },
  { field: "instagram", icon: <OutlineIcon.Instagram /> },
  { field: "facebook", icon: <OutlineIcon.Facebook /> },
];

const EditSocials = ({
  website,
  twitter,
  instagram,
  facebook,
  isLoggedInUser,
}: EditSocialsProps) => {
  const [links, setLinks] = useState<SocialLinkProps>({
    website: website || "",
    twitter: twitter || "",
    instagram: instagram || "",
    facebook: facebook || "",
  });

  const handleSubmit = () => {
    console.log("submit");
  };

  return (
    <>
      <div className="mt-5 flex flex-wrap justify-center gap-5 md:flex-col">
        {links.website && (
          <div className="flex items-center gap-2">
            <OutlineIcon.Web className="fill-sc-2 dark:fill-light-2" />

            <Link
              href={String(links.website)}
              className={`line-clamp-1 w-full cursor-pointer text-center text-base font-semibold leading-6 text-sc-2 dark:text-sc-6`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {links.website}
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
        <Dialog>
          <DialogTrigger className="mt-5">
            <button className="rounded-lg bg-blue px-2 py-1 text-sm font-semibold leading-6 text-white hover:bg-blue/80">
              Edit Socials
            </button>
          </DialogTrigger>
          <DialogContent className="rounded-lg text-sc-2 dark:border-dark-4 dark:bg-dark-4">
            <h1 className="text-lg font-semibold text-sc-2 dark:text-sc-6">
              Social Links
            </h1>

            {socialNames.map(({ field, icon }) => (
              <div key={field} className="flex items-center gap-2">
                {icon}

                <input
                  type="text"
                  placeholder={`${field} link`}
                  value={links[field as keyof SocialLinkProps]}
                  onChange={(e) =>
                    setLinks({ ...links, [field]: e.target.value })
                  }
                  className="rounded-lg border border-white p-1 text-sc-2 outline-none focus:border-sc-5 focus:bg-sc-6 dark:border-dark-4 dark:bg-dark-4 dark:text-sc-6 focus:dark:border-white focus:dark:bg-dark-3"
                />
              </div>
            ))}

            <DialogClose className="mt-5" onClick={handleSubmit}>
              <button
                className="w-full rounded-lg bg-blue px-2 py-1 text-sm font-semibold leading-6 text-white hover:bg-blue/80"
                onClick={handleSubmit}
              >
                Save Changes
              </button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default EditSocials;
