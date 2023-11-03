import Image from "next/image";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Theme from "@/components/navbar/Theme";
import FillIcon from "@/components/icons/fill-icons";
import Link from "next/link";

import { UserButtonProps } from "@/types";

const UserButton = async ({ userImg }: UserButtonProps) => {
  return (
    <Popover>
      <PopoverTrigger className="shrink-0 rounded-[0.5rem] border-[1px] border-yellow">
        <Image
          src={userImg || "/christopher.png"}
          alt="User Image"
          width={30}
          height={30}
          className="m-[2px] rounded-[0.375rem] bg-yellow-30"
        />
      </PopoverTrigger>
      <PopoverContent className="relative right-[20px] top-[15px] flex h-[187px] w-[182px] flex-col justify-center gap-5 bg-[url('/USERBUTTON_POPOVER_LIGHT.svg')] bg-center dark:bg-[url('/USERBUTTON_POPOVER_DARK.svg')]">
        <Link
          href="/profile"
          className="flex items-center gap-3.5 text-[1rem] font-semibold leading-[1.5rem] text-sc-2 dark:text-light-2"
        >
          <FillIcon.Profile className="fill-sc-2 dark:fill-light-2" />
          Profile
        </Link>

        <Link
          href="/settings"
          className="flex items-center gap-3.5 text-[1rem] font-semibold leading-[1.5rem] text-sc-2 dark:text-light-2"
        >
          <FillIcon.Settings className="fill-sc-2 dark:fill-light-2" />
          Settings
        </Link>

        <div className="h-[1px] w-full bg-light-2 dark:bg-sc-3" />

        <div className="flex items-center justify-between">
          <p className="text-[1rem] font-semibold leading-[1.5rem] text-sc-2 dark:text-light-2">
            Interface
          </p>
          <Theme />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserButton;
