import Image from "next/image";

import { SetCoverIcon } from "../icons/outline-icons/Icon";
import OutlineIcon from "../icons/outline-icons";
import CustomButton from "../CustomButton";

const SetProfilePhotoComponent = () => {
  const profilePhotoURL = "";
  return (
    <div className="flex items-center gap-2.5">
      {profilePhotoURL ? (
        <Image
          src={profilePhotoURL}
          width={60}
          height={60}
          className="rounded-full"
          alt="Profile Photo"
        />
      ) : (
        <div className="flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-full bg-light-2 dark:bg-dark-4">
          <OutlineIcon.ImageIcon className="stroke-sc-4" />
        </div>
      )}

      <CustomButton
        icon={SetCoverIcon}
        label="Set Profile Photo"
        className="semibold-10 flex h-7 items-center gap-2.5 rounded-[0.25rem] bg-light-2 px-2.5 py-1 text-sc-2 dark:bg-dark-4 dark:text-light-2"
      />
    </div>
  );
};

export default SetProfilePhotoComponent;
