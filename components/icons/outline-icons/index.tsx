import { ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "./ArrowIcon";
// import ArrowLargeIcon from "./ArrowLargeIcon";
// import FrameNumber from "./FrameNumber";
// export { default as FrameIcon } from "./FrameIcon";
// export { default as DevIcon } from "./DevIcon";
// export { default as SearchIcon } from "./SearchIcon";
// export { default as IconAlt } from "./IconAlt";
// export { default as ArrowIcon } from "./ArrowIcon";
// export { default as ArrowLargeIcon } from "./ArrowLargeIcon";
// export { default as FormatIcon } from "./FormatIcon";
// export { default as SocialIcon } from "./SocialIcon";
// export { default as Icon } from "./Icon";
// export { default as BloggingIcon } from "./BloggingIcon";
// export { default as VoiceIcon } from "./VoiceIcon";
// export { default as HeartIcon } from "./HeartIcon";
// export { default as PopularIcon } from "./PopularIcon";
// export { default as FollowingIcon } from "./FollowingIcon";
// export { default as CheckboxIcon } from "./CheckboxIcon";
// export { default as NewIcon } from "./NewIcon";
// export { default as Share2Icon } from "./Share2Icon";
// export { default as CheckmarkIcon } from "./CheckmarkIcon";

export { default as HipnodeIcon } from "./HipnodeIcon";

interface OutlineIconProps {
  children?: ReactNode;
  className?: string;
}

const OutlineIcon = ({ children, className }: OutlineIconProps) => {
  const styles = className || "fill-[#C5D0E6] dark:fill-[#F4F6F8]";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      className={styles}
    >
      {children}
    </svg>
  );
};

OutlineIcon.ArrowLeft = function ArrowLeftIcon({
  className,
}: OutlineIconProps) {
  return (
    <OutlineIcon
      className={className || "stroke-[#3F4354] dark:stroke-[#F7F7F7]"}
    >
      <ArrowLeft />
    </OutlineIcon>
  );
};

OutlineIcon.ArrowRight = function ArrowRightIcon({
  className,
}: OutlineIconProps) {
  return (
    <OutlineIcon
      className={className || "stroke-[#3F4354] dark:stroke-[#F7F7F7]"}
    >
      <ArrowRight />
    </OutlineIcon>
  );
};
