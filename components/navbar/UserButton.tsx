"use client";

import Image from "next/image";

import { useUser } from "@clerk/nextjs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Theme from "@/components/navbar/Theme";

import UserButtonLink from "./UserButtonLink";

const UserButton = () => {
  const { user } = useUser();
  const userImg = user?.imageUrl;
  console.log(user);
  return (
    <Popover>
      <PopoverTrigger className="flex items-center justify-center gap-4">
        <div className="shrink-0 rounded-[0.5rem] border-[1px] border-yellow">
          <Image
            src={userImg ?? "/christopher.png"}
            alt="User Image"
            width={30}
            height={30}
            className="m-[2px] rounded-[0.375rem] bg-yellow-30"
          />
        </div>

        <p className="hidden items-center justify-center gap-2.5 text-[1rem] font-bold leading-[1.5rem] text-sc-1 dark:text-light-2 xl:flex">
          {user?.username}

          <Image
            src="/navbar/triangle_down.svg"
            alt="User Image"
            width={20}
            height={20}
            className="shrink-0"
          />
        </p>
      </PopoverTrigger>
      <PopoverContent className="relative right-[20px] top-[17px] flex h-[187px] w-[182px] flex-col justify-center gap-5 bg-[url('/USERBUTTON_POPOVER_LIGHT.svg')] bg-center dark:bg-[url('/USERBUTTON_POPOVER_DARK.svg')] xl:right-[50px] xl:bg-[url('/navbar/user_modal_light_desktop.svg')] xl:dark:bg-[url('/navbar/user_modal_dark_desktop.svg')]">
        <div className="relative top-[5px] flex flex-col gap-5">
          <UserButtonLink link="/profile" text="Profile" />

          <UserButtonLink link="/settings" text="Settings" />

          <div className="h-[1px] w-full bg-light-2 dark:bg-sc-3" />

          <div className="flex items-center justify-between">
            <p className="text-[1rem] font-semibold leading-[1.5rem] text-sc-2 dark:text-light-2">
              Interface
            </p>
            <Theme />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserButton;
