import Image from "next/image";

import { newest, followers, popular } from "@/public/images/index";

const Sidebar = () => (
  <aside className="flex w-full flex-row justify-center gap-[0.625rem]  rounded-2xl bg-light p-[0.625rem] dark:bg-dark-3 md:flex-col">
    <div className="flex flex-row items-center">
      <div className="h-[1.75rem] w-[1.75rem] rounded-md bg-light-3 p-[0.25rem]  dark:bg-dark-4">
        <Image src={newest} height={28} width={28} alt="newest and recent" />
      </div>
      <div className="flex  flex-col justify-between pl-[0.375rem]">
        <p className="flex flex-row text-[0.75rem] font-semibold leading-[1.125rem] text-sc-2 dark:text-light">
          Newest<p className="hidden pl-0.5 md:flex">and recent</p>
        </p>
        <p className="hidden text-[0.563rem] dark:text-sc-3 md:block">
          Find the latest update
        </p>
      </div>
    </div>
    <div className="flex flex-row items-center">
      <div className="flex h-[1.75rem] w-[1.75rem] items-center justify-center rounded-md bg-light-3 dark:bg-dark-4">
        <Image src={popular} height={14} width={20} alt="popular of the day " />
      </div>
      <div className="flex  flex-col justify-between pl-[0.375rem]">
        <p className="flex flex-row text-[0.75rem] font-semibold leading-[1.125rem] text-sc-2 dark:text-light">
          Popular <p className="hidden pl-0.5 md:flex">of the day</p>
        </p>
        <p className="hidden text-[0.563rem] dark:text-sc-3 md:block">
          Shots featured today by curators
        </p>
      </div>
    </div>
    <div className="flex flex-row items-center">
      <div className="h-[1.75rem] w-[1.75rem] rounded-md bg-light-3 p-[0.25rem] dark:bg-dark-4">
        <Image src={followers} height={28} width={28} alt="followers" />
      </div>
      <div className="flex  flex-col justify-between pl-[0.375rem]">
        <div className="flex flex-row">
          <p className="pr-[0.25rem] text-[0.75rem] font-semibold leading-[1.125rem] text-sc-2 dark:text-light">
            Following
          </p>
          <p className="flex h-[1.25rem] w-[1.375rem] items-center justify-center rounded-sm bg-red-80 text-[0.563rem] font-semibold leading-[0.875rem] text-light">
            24
          </p>
        </div>
        <p className="hidden text-[0.563rem] dark:text-sc-3 md:block">
          Explore from your favorite person
        </p>
      </div>
    </div>
  </aside>
);

export default Sidebar;
