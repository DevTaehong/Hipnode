import Image from "next/image";

import CustomButton from "../CustomButton";
import { SetCoverIcon } from "../icons/outline-icons/Icon";
import OutlineIcon from "../icons/outline-icons";

const SetCoverComponent = () => {
  const coverImageURL = "";
  return (
    <div className="flex flex-col items-start gap-5">
      <CustomButton
        icon={SetCoverIcon}
        label="Set Cover"
        className="semibold-10 flex h-7 items-center gap-2.5 rounded-[0.25rem] bg-light-2 px-2.5 py-1 text-sc-2 dark:bg-dark-4 dark:text-light-2"
      />
      {coverImageURL ? (
        <Image
          className="w-full rounded-lg brightness-0"
          src="/images/hipnode.svg"
          width={295}
          height={132}
          alt="cover image"
        />
      ) : (
        <div className="flex h-[8.25rem] w-full items-center justify-center rounded-lg bg-light-2 dark:bg-dark-4 sm:h-[10.4375rem]">
          <OutlineIcon.ImageIcon className="stroke-sc-4 sm:h-10 sm:w-10" />
        </div>
      )}
    </div>
  );
};

export default SetCoverComponent;
