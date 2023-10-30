import Image from "next/image";

import { SidebarSectionProps } from "@/types/homepage";

const SidebarSection = ({
  imgSrc,
  imgAlt,
  imgContainerClass,
  title,
  subTitle,
  description,
  notification,
}: SidebarSectionProps) => (
  <div className="flex w-full flex-row items-center">
    <div className={imgContainerClass}>
      <Image src={imgSrc} height={28} width={28} alt={imgAlt} />
    </div>
    <div className="flex flex-col justify-between pl-[0.375rem]">
      <p className="flex flex-row text-[0.75rem] font-semibold leading-[1.125rem] text-sc-2 dark:text-light">
        {title}
        {subTitle && <span className="hidden pl-0.5 md:flex">{subTitle}</span>}
        {notification && (
          <span className="ml-[0.25rem] flex h-[1.25rem] w-[1.375rem] items-center justify-center rounded-md bg-red-80 text-[0.563rem] font-semibold leading-[0.875rem] text-light">
            {notification}
          </span>
        )}
      </p>
      <p className="hidden text-[0.563rem] dark:text-sc-3 lg:block">
        {description}
      </p>
    </div>
  </div>
);

export default SidebarSection;
