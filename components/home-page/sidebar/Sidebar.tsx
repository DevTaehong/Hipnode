import Image from "next/image";
import Link from "next/link";

import { sidebarItems } from "@/constants";
import { SidebarProps } from "@/types/posts";

const Sidebar = ({ isLoggedIn, peopleFollowed }: SidebarProps) => {
  const itemsToRender = isLoggedIn ? sidebarItems : sidebarItems.slice(0, 2);

  return (
    <aside className="flex h-fit w-full flex-row justify-between gap-[0.625rem] rounded-2xl bg-light p-[1.25rem] lg:flex-col lg:justify-center lg:p-[0.625rem] dark:bg-dark-3">
      {itemsToRender.map((item) => {
        const {
          title,
          imgContainerClass,
          imgSrc,
          imgAlt,
          subTitle,
          loggedInFollowerFilter,
          description,
        } = item;
        return (
          <Link
            key={title}
            className="flex w-fit cursor-pointer flex-row items-center justify-between hover:translate-x-1 hover:scale-[101%]"
            href={`?filter=${title.toLowerCase()}`}
          >
            <div className={imgContainerClass}>
              <Image src={imgSrc} height={28} width={28} alt={imgAlt} />
            </div>
            <div className="flex flex-col justify-between pl-[0.375rem]">
              <p className="flex flex-row text-[0.75rem] font-semibold leading-[1.125rem] text-sc-2 dark:text-light">
                {title}
                {subTitle && (
                  <span className="hidden  pl-0.5 md:flex">{subTitle}</span>
                )}
                {loggedInFollowerFilter && (
                  <span className="ml-[0.25rem] flex h-[1.25rem] w-[1.375rem] items-center justify-center rounded-md bg-red-80 text-[0.563rem] font-semibold leading-[0.875rem] text-light">
                    {peopleFollowed}
                  </span>
                )}
              </p>
              <p className="line-clamp-1 hidden text-[0.563rem] lg:block dark:text-sc-3">
                {description}
              </p>
            </div>
          </Link>
        );
      })}
    </aside>
  );
};

export default Sidebar;
