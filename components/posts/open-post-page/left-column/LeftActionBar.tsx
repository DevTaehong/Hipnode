import {
  CommentIcon,
  ShareIcon,
  ReportIcon,
} from "@/components/icons/open-post-icons/PostIcons";
import OrangeHeartIcon from "@/components/icons/open-post-icons/OrangeHeartIcon";
import IconBlock from "./LeftActionIconBlock";

const iconData = [
  { label: "Heart", count: 20000, IconComponent: OrangeHeartIcon },
  { label: "Comments", count: 20000, IconComponent: CommentIcon },
  { label: "Share", count: 20000, IconComponent: ShareIcon },
  { label: "Report", IconComponent: ReportIcon },
];

const LeftActionBar = () => (
  <div className="flex min-w-[13rem] flex-col justify-start gap-[1.25rem] rounded-2xl  bg-light p-[1.25rem] dark:bg-dark-3">
    {iconData.map((iconBlock, index) => (
      <IconBlock key={index} {...iconBlock} />
    ))}
  </div>
);

export default LeftActionBar;
