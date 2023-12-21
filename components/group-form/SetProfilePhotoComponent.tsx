"use client";

import Image from "next/image";
import { ChangeEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { SetCoverIcon } from "../icons/outline-icons/Icon";
import OutlineIcon from "../icons/outline-icons";
import { uploadImageToSupabase } from "@/utils";
import { Input } from "../ui/input";

const SetProfilePhotoComponent = () => {
  const router = useRouter();
  const search = useSearchParams();
  const profilePhotoURL = search.get("profilePhotoURL");
  const coverUrl = search.get("coverUrl");

  const handleSetProfilePhoto = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const uploadedURL = await uploadImageToSupabase(
        file,
        "group-profile-photo",
        "photos"
      );
      router.push(
        `/group/create-group?coverUrl=${
          coverUrl ?? ""
        }&profilePhotoURL=${uploadedURL?.mainImageURL}`
      );
    }
  };

  return (
    <div className="flex items-center gap-2.5">
      {profilePhotoURL ? (
        <Image
          src={profilePhotoURL}
          width={60}
          height={60}
          className="h-[3.75rem] w-[3.75rem] rounded-full object-cover"
          alt="Profile Photo"
        />
      ) : (
        <div className="flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-full bg-light-2 dark:bg-dark-4">
          <OutlineIcon.ImageIcon className="stroke-sc-4" />
        </div>
      )}

      <div className="flex gap-2.5">
        <label
          htmlFor="profile"
          className="semibold-10 flex h-7 cursor-pointer items-center gap-2.5 rounded-[0.25rem] bg-light-2 px-2.5 py-1 
            text-sc-2 hover:opacity-80 hover:transition-opacity dark:bg-dark-4 dark:text-light-2"
        >
          <SetCoverIcon />
          {profilePhotoURL ? "Change Profile Photo" : "Set Profile Photo"}
        </label>
        <Input
          id="profile"
          type="file"
          name="profile"
          accept="image/*"
          onChange={handleSetProfilePhoto}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default SetProfilePhotoComponent;
