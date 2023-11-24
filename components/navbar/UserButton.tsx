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
  return (
    <Popover>
      <PopoverTrigger className="shrink-0 rounded-[0.5rem] border-[1px] border-yellow">
        <Image
          src={userImg ?? "/christopher.png"}
          alt="User Image"
          width={30}
          height={30}
          className="m-[2px] rounded-[0.375rem] bg-yellow-30"
        />
      </PopoverTrigger>
      <PopoverContent className="relative right-[20px] top-[15px] flex h-[187px] w-[182px] flex-col justify-center gap-5 bg-[url('/USERBUTTON_POPOVER_LIGHT.svg')] bg-center dark:bg-[url('/USERBUTTON_POPOVER_DARK.svg')]">
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
