import { FC } from "react";
import Link from "next/link";

import { ArrowIcon } from "@/components/icons/outline-icons";

const GroupHeader = ({
  color,
  title,
  icon,
}: {
  color: string;
  title: string;
  icon: FC;
}) => {
  const Icon = icon;
  return (
    <div className="mt-2.5">
      <Link href="/group">
        <ArrowIcon.Left className="stroke-sc-2 dark:stroke-sc-3" />
        <span className="sr-only">Back</span>
      </Link>
      <div
        className={`flex flex-row justify-between rounded-[0.625rem] ${color} mt-2.5 p-2.5`}
      >
        <div className="flex flex-col">
          <div className="flex flex-row gap-[0.38rem]">
            <Icon />
            <h6 className="semibold-16 text-sc-2">{title}</h6>
          </div>
          <p className="regular-10 text-sc-3">
            List updated daily at midnight PST.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GroupHeader;
