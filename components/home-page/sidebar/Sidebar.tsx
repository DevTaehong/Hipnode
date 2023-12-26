import Image from "next/image";
import Link from "next/link";

import { sidebarItems } from "@/constants";

const Sidebar = () => (
  <aside className="flex h-fit w-full flex-row justify-between gap-[0.625rem] rounded-2xl bg-light p-[1.25rem] dark:bg-dark-3 lg:flex-col lg:justify-center lg:p-[0.625rem]">
    {sidebarItems.map((item) => (
      <Link
        key={item.title}
        className="flex w-fit cursor-pointer flex-row items-center justify-between hover:translate-x-1 hover:scale-[101%]"
        href={`?filter=${item.title.toLowerCase()}`}
      >
        <div className={item.imgContainerClass}>
          <Image src={item.imgSrc} height={28} width={28} alt={item.imgAlt} />
        </div>
        <div className="flex flex-col justify-between pl-[0.375rem]">
          <p className="flex flex-row text-[0.75rem] font-semibold leading-[1.125rem] text-sc-2 dark:text-light">
            {item.title}
            {item.subTitle && (
              <span className="hidden  pl-0.5 md:flex">{item.subTitle}</span>
            )}
            {item.notification && (
              <span className="ml-[0.25rem] flex h-[1.25rem] w-[1.375rem] items-center justify-center rounded-md bg-red-80 text-[0.563rem] font-semibold leading-[0.875rem] text-light">
                {item.notification}
              </span>
            )}
          </p>
          <p className="line-clamp-1 hidden text-[0.563rem] dark:text-sc-3 lg:block">
            {item.description}
          </p>
        </div>
      </Link>
    ))}
  </aside>
);

export default Sidebar;
