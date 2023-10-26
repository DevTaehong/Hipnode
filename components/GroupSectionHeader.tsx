import { FC } from "react";

type ColorVariantsType = {
  [key: string]: string;
  bgYellow: string;
  bgRed: string;
  bgBlue: string;
};

export const colorVariants: ColorVariantsType = {
  bgYellow: "bg-yellow-10",
  bgRed: "bg-red-10",
  bgBlue: "bg-blue-10",
};

type ColorVariantKeys = keyof typeof colorVariants;

export interface GroupSectionHeaderProps {
  title: string;
  bgColor: ColorVariantKeys;
  icon: FC;
}

const GroupSectionHeader = ({
  title,
  bgColor,
  icon,
}: GroupSectionHeaderProps) => {
  const IconComponent = icon;
  return (
    <header
      className={`flex w-full flex-col rounded-[0.625rem] p-2.5 ${colorVariants[bgColor]}`}
    >
      <figure className="flex gap-1.5">
        <IconComponent />
        <figcaption className="semibold-18 text-sc-2">{title}</figcaption>
      </figure>
      <h5 className="base-10 text-sc-3">List updated daily at midnight PST.</h5>
    </header>
  );
};

export default GroupSectionHeader;
