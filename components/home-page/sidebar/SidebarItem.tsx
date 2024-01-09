import { SidebarItemProps } from "@/types/posts";
import Image from "next/image";
import Link from "next/link";

const SidebarItem = ({ item, peopleFollowed }: SidebarItemProps) => {
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
      href={`/?filter=${title.toLowerCase()}`}
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
};

export default SidebarItem;
