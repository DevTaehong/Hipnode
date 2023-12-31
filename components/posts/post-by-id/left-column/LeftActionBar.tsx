import { useMemo } from "react";

import {
  OrangeHeartIcon,
  CommentIcon,
  ShareIcon,
  ReportIcon,
} from "@/components/icons/open-post-icons/PostIcons";
import { IconBlockProps, LeftActionBarProps } from "@/types/posts";

// implement-share-functionality

const LeftActionBar = ({ actionBarData }: LeftActionBarProps) => {
  const iconData = useMemo(
    () => [
      {
        label: "Heart",
        count: actionBarData.likesCount,
        IconComponent: OrangeHeartIcon,
      },
      {
        label: "Comments",
        count: actionBarData.commentsCount,
        IconComponent: CommentIcon,
      },
      {
        label: "Share",
        count: actionBarData.sharesCount,
        IconComponent: ShareIcon,
      },
      { label: "Report", IconComponent: ReportIcon },
    ],
    [actionBarData]
  );

  return (
    <aside className="flex min-w-[13rem] flex-col justify-start space-y-[1.25rem] rounded-2xl bg-light p-[1.25rem] dark:bg-dark-3">
      {iconData.map((iconBlock, index) => (
        <IconBlock key={index} {...iconBlock} />
      ))}
    </aside>
  );
};

export default LeftActionBar;

const IconBlock = ({ label, count, IconComponent }: IconBlockProps) => (
  <div className="flex items-center gap-[0.875rem]">
    <div className="flex-center h-[1.75rem] w-[1.75rem] rounded-md">
      <IconComponent />
    </div>
    {count && (
      <p className="text-[1rem] font-semibold leading-[1.5rem] text-sc-3">
        {count.toLocaleString()} {label}
      </p>
    )}
    {!count && (
      <p className="text-[1rem] font-semibold leading-[1.5rem] text-sc-3">
        {label}
      </p>
    )}
  </div>
);
