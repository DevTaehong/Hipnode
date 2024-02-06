"use client";
import Image from "next/image";
import { SignOutButton } from "@clerk/nextjs";

import FillIcons from "@/components/icons/fill-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Theme from "@/components/navbar/Theme";
import UserButtonLink from "./UserButtonLink";
import { BaseUserInfo } from "@/types/profile.index";

const UserButton = ({ userInfo }: { userInfo: BaseUserInfo }) => {
  return (
    <Popover>
      <PopoverTrigger className="flex items-center justify-center gap-4 rounded-lg transition-colors hover:bg-sc-6 dark:hover:bg-dark-4">
        <div className="shrink-0 rounded-[0.5rem] border-[1px] border-yellow">
          {userInfo?.image && (
            <Image
              src={userInfo?.image}
              alt="User Image"
              width={30}
              height={30}
              className="m-[2px] rounded-[0.375rem] bg-yellow-30"
            />
          )}
        </div>

        <div className="line-clamp-1 hidden items-center gap-2.5 xl:flex xl:w-[7.9375rem]">
          <p className="max-w-[4.4375rem] flex-1 truncate text-base font-bold leading-6 text-sc-1 dark:text-light-2">
            {userInfo?.username}
          </p>

          <FillIcons.Triangle />
        </div>
      </PopoverTrigger>
      <PopoverContent className="relative right-[20px] top-[23px] h-[233px] w-[182px] bg-[url('/USERBUTTON_POPOVER_LIGHT.svg')] bg-center p-0 shadow-xl dark:bg-[url('/USERBUTTON_POPOVER_DARK.svg')] lg:right-[40px] xl:right-[64px] xl:bg-[url('/navbar/user_modal_light_desktop.svg')] xl:dark:bg-[url('/navbar/user_modal_dark_desktop.svg')]">
        <section className="relative top-[8px] flex flex-col gap-5 p-4">
          <UserButtonLink
            link={`/profile/${userInfo?.username}`}
            text="Profile"
          />

          <UserButtonLink link="/settings" text="Settings" />

          <SignOutButton>
            <div className="hover-effect flex cursor-pointer items-center gap-3.5 rounded text-base font-semibold leading-6 text-red-80">
              <FillIcons.Leave className="fill-red-80" />
              Logout
            </div>
          </SignOutButton>

          <div className="h-px w-full bg-light-2 dark:bg-sc-3" />

          <article className="flex w-full items-center justify-between gap-[17px]">
            <p className="text-base font-semibold leading-6 text-sc-2 dark:text-light-2">
              Interface
            </p>
            <Theme />
          </article>
        </section>
      </PopoverContent>
    </Popover>
  );
};

export default UserButton;
